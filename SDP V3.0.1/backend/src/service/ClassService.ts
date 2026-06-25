import { format } from "date-fns";
import { prisma } from "../../config/database/prisma";
import { Class } from "../../config/database/prisma/generated/prisma/client";

type Class_Registration = {
  class_id: number;
  user_id: number;
  installments: {
    amount: number;
    status?: string;
    paymentDate?: string;
    paymentMethod?: string;
    installments_Due_Date: string;
  }[]
}

type Class_Installment = {
  installment_id: number,
  user_id: number,
  paymentMethod: string,
  status: string
}

// Helper: Check if two date ranges (month-based) overlap
function monthRangesOverlap(
  start1: Date, count1: number,
  start2: Date, count2: number
): boolean {
  const end1 = new Date(start1.getFullYear(), start1.getMonth() + count1 - 1, 1);
  const end2 = new Date(start2.getFullYear(), start2.getMonth() + count2 - 1, 1);
  return start1 <= end2 && start2 <= end1;
}

// Helper: Check if two time ranges overlap (times stored as "HH:MM")
function timeRangesOverlap(
  start1: string, end1: string,
  start2: string, end2: string
): boolean {
  const toMins = (t: string) => {
    const [h, m] = t.replace(".", ":").split(":").map(Number);
    return h * 60 + (m || 0);
  };
  const s1 = toMins(start1), e1 = toMins(end1);
  const s2 = toMins(start2), e2 = toMins(end2);
  return s1 < e2 && s2 < e1;
}

// Helper: Check if two day lists share any common day
function daysOverlap(days1: string, days2: string): boolean {
  const list1 = days1.split(/,\s*/).map(d => d.trim().toLowerCase());
  const list2 = days2.split(/,\s*/).map(d => d.trim().toLowerCase());
  return list1.some(d => list2.includes(d));
}

const checkTimeConflict = async (data: any, excludeId?: number) => {
  const allClasses = await prisma.class.findMany({
    where: excludeId ? { id: { not: excludeId } } : undefined,
  });

  const newStart = new Date(data.startDate);
  const newCount = Number(data.installments_count) || 1;

  for (const cls of allClasses) {
    // 1. Check day overlap
    if (!daysOverlap(data.day, cls.day)) continue;

    // 2. Check time overlap
    if (!timeRangesOverlap(data.startTime, data.endTime, cls.startTime, cls.endTime ?? "23:59")) continue;

    // 3. Check month duration overlap
    const existingStart = new Date(cls.startDate);
    const existingCount = cls.installments_count || 1;
    if (!monthRangesOverlap(newStart, newCount, existingStart, existingCount)) continue;

    // All three conditions match — conflict found
    const sharedDays = data.day.split(/,\s*/).filter((d: string) =>
      cls.day.toLowerCase().includes(d.trim().toLowerCase())
    ).join(", ");

    throw new Error(
      `Time slot conflict! "${cls.name}" is already scheduled on ${sharedDays} from ${cls.startTime} to ${cls.endTime} (${format(existingStart, "MMM yyyy")} – ${format(new Date(existingStart.getFullYear(), existingStart.getMonth() + existingCount - 1, 1), "MMM yyyy")})`
    );
  }
};

const getClasses = async (): Promise<Class[]> => {
  const classes = await prisma.class.findMany()
  return classes
}

const getClassById = async (id: number) => {
  const existing = await prisma.class.findUnique({ where: { id } });
  if (!existing) return null;
  return existing;
};

const createClass = async (data: any) => {
  await checkTimeConflict(data);

  return prisma.class.create({
    data: {
      name: data.name,
      description: data.description,
      duration: data.duration,
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
      installments_count: data.installments_count,
      installments_price: data.installments_price,
      full_price: data.full_price,
      startDate: data.startDate ? new Date(data.startDate) : new Date(),
    },
  });
};

const updateClass = async (id: number, data: any) => {
  const existing = await prisma.class.findUnique({ where: { id } });
  if (!existing) return null;

  // Check for time conflict excluding current class
  await checkTimeConflict(data, id);

  const newStartDate = data.startDate ? new Date(data.startDate) : null;

  const updated = await prisma.class.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      duration: data.duration,
      day: data.day,
      startTime: data.startTime,
      endTime: data.endTime,
      installments_count: data.installments_count,
      installments_price: data.installments_price,
      full_price: data.full_price,
      startDate: newStartDate ?? undefined,
    },
  });

  // Always update installment due dates when startDate is provided
  if (newStartDate) {
    const classStudents = await prisma.class_Student.findMany({
      where: { class_id: id },
      include: {
        class_installments: {
          orderBy: { installments_Due_Date: "asc" },
        },
      },
    });

    console.log(`Found ${classStudents.length} enrolled students for class ${id}`);

    for (const classStudent of classStudents) {
      console.log(`Updating ${classStudent.class_installments.length} installments for student ${classStudent.student_id}`);
      
      for (let i = 0; i < classStudent.class_installments.length; i++) {
        const installment = classStudent.class_installments[i];
        const newDueDate = new Date(newStartDate.getFullYear(), newStartDate.getMonth() + i, 1);

        console.log(`  Installment ${i + 1}: ${installment.installments_Due_Date} → ${newDueDate}`);

        await prisma.class_Installment.update({
          where: { id: installment.id },
          data: { installments_Due_Date: newDueDate },
        });
      }
    }
  }

  return updated;
};

const deleteClass = async (id: number) => {
  const existing = await prisma.class.findUnique({ where: { id } });
  if (!existing) return false;

  await prisma.class.delete({ where: { id } });
  return true;
};

const registerClass = async (data: Class_Registration) => {
  return prisma.$transaction(async (tx) => {
    // Create class student record
    const classStudent = await tx.class_Student.create({
      data: {
        class_id: data.class_id,
        student_id: data.user_id,
      },
    });

    // Create all installments
    const installments = await Promise.all(
      data.installments.map((installment) =>
        tx.class_Installment.create({
          data: {
            class_student_id: classStudent.id,
            amount: installment.amount,
            status: installment.status,
            paymentDate: installment.paymentDate,
            paymentMethod: installment.paymentMethod,
            installments_Due_Date: new Date(installment.installments_Due_Date),
          },
        })
      )
    );

    return { classStudent, installments };
  });
};

const getClassByUserId = async (id: number) => {
  const existing = await prisma.class_Student.findMany({
    where: { student_id: id },
    include: { 
      class_installments:true,
      class:true,
      student: true,
    }
  });
  if (!existing) return null;
  return existing;
};

const payInstallments = async (data: Class_Installment) => {
  return prisma.class_Installment.update({
    where: { id: data.installment_id },
    data: {
      status: data.status,
      paymentMethod: data.paymentMethod,
      paymentDate: new Date(new Date().toLocaleString()),
      updatedAt: new Date(new Date().toLocaleString()),
    },
  });
};

const getAllRegisteredClasses = async (user_id:number, class_id:number) => {
  const existing = await prisma.class_Student.findMany({
    where: { student_id: user_id, class_id: class_id },
    include: { 
      class_installments:true,
      class:true,
      student: true,
    }
  });
  if (!existing) return null;
  return existing;
};

const getClassStartDate = async (id: number) => {
  const existing = await prisma.class.findUnique({ where: { id } });
  if (!existing) return null;
  return existing;
};


const getPaymentInstallments = async (
  status: "All" | "Done" | "Missing",
  date: Date | null
) => {
  const whereCondition: any = {};

  // Apply date filter only if date is provided
  if (date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    whereCondition.installments_Due_Date = { gte: startDate, lte: endDate };
  }

  if (status !== "All") {
    whereCondition.status = { equals: status.toLowerCase() };
  }

  const existing = await prisma.class_Installment.findMany({
    where: whereCondition,
    orderBy: { installments_Due_Date: "desc" },
    include: {
      class_student: {
        include: { class: true, student: true },
      },
    },
  });

  return existing;
};

const getTodayClassesCount = async (): Promise<number> => {
  const today = format(new Date(), "EEEE"); // e.g., "Wednesday"

  const count = await prisma.class.count({
    where: {
      day: {
        equals: today,
      },
    },
  });

  return count;
};



const ClassService = {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  getClassById,
  registerClass,
  getClassByUserId,
  payInstallments,
  getAllRegisteredClasses,
  getClassStartDate,
  getPaymentInstallments,
  getTodayClassesCount
}

export default ClassService
