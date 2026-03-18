import { prisma, VocalRecordingAppointmentDetail,VocalRecordingAppointment } from "../../config/database/prisma"
import { AppointmentAvailability } from "../../config/constant"
import { format } from "date-fns";
import { date } from "zod";

type getAppointmentsByDateResponse={
    date: string;
    bookedTimes: string[][] ;
}
type getAllAppointmentsByDateResponse={
    appointment:VocalRecordingAppointment | null,
    details:VocalRecordingAppointmentDetail[]
}

type createAppointment={
    date:string,
    startTime:string,
    endTime:string,
    user_id: number
}

type makePayment={
    amount:number,
    appointment_id:number,
    note:string,
    paymentMethod:string,
    paymentType?:string,
    status?:string,
    user_id:number
}
const getAppointmentsByDate =async(date:string) :Promise<getAppointmentsByDateResponse | null>=>{
    const appointments=await prisma.vocalRecordingAppointment.findFirst({
        where:{
            date
        }
    })
    console.log("appointments >>>>>>>>>>>> ",appointments)
    if(!appointments){
        return {
            date:date,
            bookedTimes:[]
        }
    }
     const details= await prisma.vocalRecordingAppointmentDetail.findMany({
        where:{
            appointment_id:appointments?.id
        }
    })
    if(!details){
        return {
            date:date,
            bookedTimes:[]
        }
    }

    const bookedTimes=details.map((detail:VocalRecordingAppointmentDetail)=>[detail.time_in,detail.time_out])
    
    return {
        date:date,
        bookedTimes:bookedTimes
    }
}

const createAppointment=async(data:createAppointment)=>{

    let appointment = await prisma.vocalRecordingAppointment.findFirst({
        where:{
            date:data.date
        }
    })
    if(appointment){
       await prisma.vocalRecordingAppointmentDetail.create({
           data:{
               appointment_id:appointment.id,
               time_in:data.startTime,
               time_out:data.endTime,
               note:"",
               user_id:data.user_id
           }
       })
    }else{
       appointment= await prisma.vocalRecordingAppointment.create({
            data:{
                date:data.date,
                status: AppointmentAvailability.AVAILABLE,
                note:""
            }
        })

        await prisma.vocalRecordingAppointmentDetail.create({
            data:{
                appointment_id:appointment.id,
                time_in:data.startTime,
                time_out:data.endTime,
                note:"",
                user_id:data.user_id
            }
        })
    }
    
}


const getAllAppointmentsByDate =async(date:string) :Promise<getAllAppointmentsByDateResponse | null>=>{
    const appointments=await prisma.vocalRecordingAppointment.findFirst({
        where:{
            date
        }
    })
    console.log("appointments >>>>>>>>>>>> ",appointments)
    if(!appointments){
        return {
            appointment:appointments,
            details:[]
        }
    }
     const details= await prisma.vocalRecordingAppointmentDetail.findMany({
        where:{
            appointment_id:appointments?.id,
            isCancel:false
        },
        include:{
            user:{
                select:{
                    id:true,
                    firstName:true,
                    lastName:true,
                    contactNumber:true,
                    address:true,
                    city:true,
                    district:true,
                    email:true,
                    typeId:true,
                }
            }
        }
    })
    if(!details){
        return {
            appointment:appointments,
            details:details
        }
    }
    
    return {
        appointment:appointments,
        details:details
    }
}

const updateStatus=async(id:number,status:string)=>{
    const appointment=await prisma.vocalRecordingAppointmentDetail.update({
        where:{
            id
        },
        data:{
            status
        }
    })
    return appointment
}

const getAppointmentById=async(id:number)=>{
    const appointment=await prisma.vocalRecordingAppointmentDetail.findUnique({
        where:{
            id
        },
        include:{
            user:true,
            appointment:true
        }
    })
    return appointment
}

const getAppointmentByDate = async (date: string) => {
  
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
  
    const appointment = await prisma.payment.findMany({
      where: {
        paymentDate: {
          gte: startOfDay,
          lte: endOfDay,
        }
      },
      include: {
        user: true,
        appointment: true
      }
    });
  
    return appointment;
  };
  

const makeAppointmentPayment=async(data:makePayment)=>{
    const appointment=await prisma.payment.create({
        data:{
            amount:data.amount,
            appointment_id:data.appointment_id,
            note:data.note,
            paymentMethod:data.paymentMethod,
            paymentType:"Appointment",
            status:data.status?? "done",
            user_id:data.user_id,
            paymentDate:new Date()
        }
    })
    return appointment
}

const getPaymentById=async(id:number)=>{
    const payment=await prisma.vocalRecordingAppointmentDetail.findUnique({
        where:{
            id
        },
        include:{
            payments:true
        }
    })
    return payment?.payments
}

const getAppointmentByUserId=async(id:number)=>{
    const appointment=await prisma.vocalRecordingAppointmentDetail.findMany({
        where:{
            user_id:id,
            isCancel:false
        },
        include:{
            user:true,
            appointment:true
        }
    })
    return appointment
}

const cancelAppointment=async(id:number)=>{
    const appointment=await prisma.vocalRecordingAppointmentDetail.update({
        where:{
            id
        },
        data:{
            isCancel:true
        }
    })
    return appointment
}


const getTodayAppointmentsCount = async () => {
    const appointments = await prisma.vocalRecordingAppointment.findMany({
      where: {
        date: format(new Date(), "yyyy-MM-dd"),
        details: {
          some: {
            isCancel: false,
          },
        },
      },
      include: {
        details: true,
      },
    });
  
    // Flatten all details and filter non-cancelled ones
    const totalCount = appointments.reduce((acc, appointment) => {
      const validDetails = appointment.details.filter((detail) => !detail.isCancel);
      return acc + validDetails.length;
    }, 0);
  
    console.log("Appointments Count >>> ", totalCount);
    return totalCount;
  };

const getUpcomingAppointmentsCount=async()=>{
    const apoiment = await prisma.vocalRecordingAppointment.findFirst({
        where:{
            date: format(new Date(), "yyyy-MM-dd"),
            details: {
                some: {
                  isCancel: false,
                },
              },
        },
    })
    const apoimet_details = await prisma.vocalRecordingAppointmentDetail.findFirst({
        where:{
            appointment_id:apoiment?.id,
            isCancel:false,
            NOT:{
                status:"rejected"
            }

        },
        orderBy:{
            time_in:"asc"
        }
    })

    console.log("apoimet_details >>> ",apoimet_details)
    if(!apoimet_details){
        return "No upcoming appointments"
    }
    
    return `${apoimet_details?.time_in} - ${apoimet_details?.time_out}  ${apoimet_details?.status.toUpperCase()}`
}



const AppointmentService={
    getAllAppointmentsByDate,
    getAppointmentsByDate,
    createAppointment,
    updateStatus,
    getAppointmentById,
    getAppointmentByDate,
    makeAppointmentPayment,
    getPaymentById,
    getAppointmentByUserId,
    cancelAppointment,
    getTodayAppointmentsCount,
    getUpcomingAppointmentsCount
}

export default AppointmentService
