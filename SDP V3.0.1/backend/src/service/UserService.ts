

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

type User ={
    id:number,
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
    const newUser=await prisma.user.create({
        data:user
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
      student: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
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
    }
  });

  return students;
};


const UserService={
    getUserType,
    createUser,
    getUserByid,
    getAllUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserTypes,
    getStudentInRegisteredMonths

}

export default UserService;
