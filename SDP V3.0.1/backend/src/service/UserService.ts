

// id             Int       @id @default(autoincrement())
// email          String    @unique
// firstName      String?   @map("first_name")
// lastName       String?   @map("last_name")
// password       String
// typeId         Int       @map("type_id")
// contactNumber  String?   @map("contact_number")
// address        String?
// city           String?
// district       String?
// createdAt      DateTime  @default(now()) @map("created_at")
// updatedAt      DateTime  @updatedAt @map("updated_at") @default(now())

import { prisma } from "../../config/database/prisma"
import { MonthType } from "../validator/UserValidator"
const bcrypt = require('bcrypt');

type User ={
    id?:number,
    email:string,
    firstName?:string,
    lastName?:string,
    password:string,
    typeId:number,
    contactNumber?:string,
    address?:string,
    city?:string,
    district?:string,
}

type UserFilter={
    typeId?:number,
    deleteStatus?:boolean
}

const createUser=async(user:User)=>{
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser=await prisma.user.create({
        data:{
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: hashedPassword,
            typeId: user.typeId,
            contactNumber: user.contactNumber,
            address: user.address,
            city: user.city,
            district: user.district,
        }
    })
    return newUser
}

const getUserByid=async(id:number)=>{
    const user=await prisma.user.findUnique({
        where:{
            id
        }
    })
    return user
}

const getAllUser=async(filter:UserFilter)=>{
    const users=await prisma.user.findMany(
        {
            where:{
                deleteStatus:filter.deleteStatus??false,
                typeId:filter.typeId??undefined
            },
            include:{
                type:true
            }
        }
    )
    return users
}

const updateUser=async(id:number,user:User)=>{
    const updatedUser=await prisma.user.update({
        where:{
            id
        },
        data:user
    })
    return updatedUser
}

const deleteUser=async(id:number)=>{
    const deletedUser=await prisma.user.update({
        where:{
            id
        },
        data:{
            deleteStatus:true
        }
    })
    return deletedUser
}

const permanentDeleteUser = async (id: number) => {
    // Delete all related records in correct order (children before parents)
    await prisma.$transaction(async (tx) => {
        // 1. Get all class_student ids for this user
        const classStudents = await tx.class_Student.findMany({
            where: { student_id: id },
            select: { id: true }
        });
        const classStudentIds = classStudents.map(cs => cs.id);

        // 2. Delete class installments
        if (classStudentIds.length > 0) {
            await tx.class_Installment.deleteMany({
                where: { class_student_id: { in: classStudentIds } }
            });
        }

        // 3. Delete class_students
        await tx.class_Student.deleteMany({ where: { student_id: id } });

        // 4. Get all appointment detail ids for this user
        const appointmentDetails = await tx.vocalRecordingAppointmentDetail.findMany({
            where: { user_id: id },
            select: { id: true }
        });
        const appointmentDetailIds = appointmentDetails.map(a => a.id);

        // 5. Delete payments linked to those appointments
        if (appointmentDetailIds.length > 0) {
            await tx.payment.deleteMany({
                where: { appointment_id: { in: appointmentDetailIds } }
            });
        }

        // 6. Delete payments directly linked to user (not via appointment)
        await tx.payment.deleteMany({ where: { user_id: id } });

        // 7. Delete vocal recording appointment details
        await tx.vocalRecordingAppointmentDetail.deleteMany({ where: { user_id: id } });

        // 8. Delete attendance records
        await tx.attendance.deleteMany({ where: { user_id: id } });

        // 9. Finally delete the user
        await tx.user.delete({ where: { id } });
    });

    return true;
}

const getUserByEmail=async(email:string)=>{
    const user=await prisma.user.findUnique({
        where:{
            email
        }
    })
    return user
}

const getUserType=async(type:string)=>{
    const userType=await prisma.userType.findUnique({
        where:{
            name:type
        }
    })
    return userType
}


const getUserTypes=async()=>{
    const userTypes=await prisma.userType.findMany()
    return userTypes
}

// const getStudentInRegisterdThisMonth=async(months:string[])=>{
//     const students=await prisma.class_Student.findMany({
//         where:{
//             student:{
//                 createdAt:{
//                     gte:new Date(new Date().getFullYear(),new Date().getMonth(),1),
//                     lte:new Date(new Date().getFullYear(),new Date().getMonth(),31)
//                 }
//             }
//         },
//         include:{
//             class:true,
//             student:true,
//             class_installments:true
//         }
//     });
//     return students
// }



const monthMap: { [key: string]: number } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
  };


export const getStudentInRegisteredMonths = async (months: string[]) => {
  // get current year
  const year = new Date().getFullYear();

  // create OR conditions for each selected month
  const dateConditions = months.map((month) => {
    const monthIndex = monthMap[month];

    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0, 23, 59, 59); // last day of that month

    return {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    };
  });

  const students = await prisma.class_Student.findMany({
    where: {
      OR: dateConditions
    },
    include: {
      class: true,
      student: true,
      class_installments: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  console.log(`Found ${students.length} students for months:`, months);
  return students;
};


const UserService={
    getUserType,
    createUser,
    getUserByid,
    getAllUser,
    updateUser,
    deleteUser,
    permanentDeleteUser,
    getUserByEmail,
    getUserTypes,
    getStudentInRegisteredMonths

}

export default UserService;
