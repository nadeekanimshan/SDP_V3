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
    },
  });
};

const updateClass = async (id: number, data: any) => {
  const existing = await prisma.class.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.class.update({
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
    },
  });
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
  date: Date
) => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const whereCondition: any = {
    installments_Due_Date: {
      gte: startDate,
      lte: endDate,
    },
  };

  if (status !== "All") {
    whereCondition.status = {
      equals: status.toLowerCase(),
    };
  }

  const existing = await prisma.class_Installment.findMany({
    where: whereCondition,
    include: {
      class_student: {
        include: {
          class: true,
          student: true,
        },
      },
    },
  });

  return existing.length > 0 ? existing : null;
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
