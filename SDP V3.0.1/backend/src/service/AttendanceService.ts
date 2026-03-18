import { prisma } from "../../config/database/prisma"


const getAttendanceByDate=async(date:string)=>{
    const attendance=await prisma.attendance.findMany({
        where:{
            date:new Date(date)
        },
        include:{
            user:true
        }
    })
    return attendance
}
const createAttendance=async(date:string,user_id:number)=>{
    const attendance=await prisma.attendance.create({
        data:{
            date:new Date(date),
            user_id:user_id,
            time_in:new Date(),
            time_out:null,
            note:""
        }
    })
    return attendance
}
const updateTimeOutAttendance=async(id:number)=>{
    const attendance=await prisma.attendance.update({
        where:{
            id:id
        },
        data:{
            time_out:new Date(),
        }
    })
    return attendance
}

const getAttendanceByUserIdAndDate=async(date:string,user_id:number)=>{
    const attendance=await prisma.attendance.findFirst({
        where:{
            user_id:user_id,
            date:new Date(date)
        }
    })
    return attendance
}
const AttendanceService={
   getAttendanceByDate,
   createAttendance,
   updateTimeOutAttendance,
   getAttendanceByUserIdAndDate
}

export default AttendanceService
