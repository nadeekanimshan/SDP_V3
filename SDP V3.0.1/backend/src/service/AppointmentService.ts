import { prisma, VocalRecordingAppointmentDetail,VocalRecordingAppointment } from "../../config/database/prisma"
import SlotAvailabilityService from "./SlotAvailabilityService"
import { AppointmentAvailability } from "../../config/constant"
import { format } from "date-fns";
import { date } from "zod";

type getAppointmentsByDateResponse={
    date: string;
    bookedTimes: string[][];
    availableSlotTimes: string[];
    isDayAvailable: boolean;
}
type getAllAppointmentsByDateResponse={
    appointment:VocalRecordingAppointment | null,
    details:VocalRecordingAppointmentDetail[]
}

type createAppointment={
    date:string,
    startTime:string,
    endTime:string,
    appointmentType:string,
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
const getAppointmentsByDate = async (date: string): Promise<getAppointmentsByDateResponse | null> => {
    const { availableSlotTimes, isDayAvailable } = await SlotAvailabilityService.getForDate(date);

    const appointments = await prisma.vocalRecordingAppointment.findFirst({
        where: { date },
    });
    if (!appointments) {
        return {
            date,
            bookedTimes: [],
            availableSlotTimes,
            isDayAvailable,
        };
    }
    const details = await prisma.vocalRecordingAppointmentDetail.findMany({
        where: { appointment_id: appointments.id, isCancel: false },
    });
    const bookedTimes = details.map((d: VocalRecordingAppointmentDetail) => [d.time_in, d.time_out]);

    return {
        date,
        bookedTimes,
        availableSlotTimes,
        isDayAvailable,
    };
};

const createAppointment=async(data:createAppointment)=>{
    const slotData = await getAppointmentsByDate(data.date);
    if (!slotData || !slotData.isDayAvailable) {
        throw new Error("Studio is closed on this date");
    }
    if (!slotData.availableSlotTimes.includes(data.startTime)) {
        throw new Error("Selected time slot is not available");
    }
    const overlaps = slotData.bookedTimes.some((slot: string[]) => {
        const bStart = slot[0];
        const bEnd = slot[1];
        if (!bStart || !bEnd) return false;
        return (
            (data.startTime >= bStart && data.startTime < bEnd) ||
            (data.endTime > bStart && data.endTime <= bEnd) ||
            (data.startTime <= bStart && data.endTime >= bEnd)
        );
    });
    if (overlaps) {
        throw new Error("This time slot is already booked");
    }

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
               appointmentType:data.appointmentType,
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
                appointmentType:data.appointmentType,
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

const updateStatus=async(id:number,status:string,rejectReason?:string|null)=>{
    const data: Record<string, unknown> = { status };
    if (status === "rejected") {
        data.isCancel = true;
        data.rejectReason = rejectReason ?? null;
    }
    const appointment=await prisma.vocalRecordingAppointmentDetail.update({
        where:{ id },
        data
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
            OR:[
                { isCancel:false },
                { status:"rejected" }
            ]
        },
        include:{
            user:true,
            appointment:true
        }
    })
    return appointment
}

type GetAllAppointmentsFilters = {
    date?: string;
    status?: string;
};

const getAllAppointments = async (filters?: GetAllAppointmentsFilters) => {
    const where: Record<string, unknown> = {
        isCancel: false,
        ...(filters?.date && { appointment: { date: filters.date } }),
    };
    if (filters?.status === "cancel_requested") {
        where.cancelRequested = true;
    } else if (filters?.status) {
        where.status = filters.status;
    }

    const details = await prisma.vocalRecordingAppointmentDetail.findMany({
        where,
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    contactNumber: true,
                    address: true,
                    city: true,
                    district: true,
                    email: true,
                    typeId: true,
                },
            },
            appointment: true,
        },
        orderBy: [{ appointment: { date: "asc" } }, { time_in: "asc" }],
    });
    return details;
};

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

const requestCancelAppointment=async(id:number,reason:string,userId:number)=>{
    const detail=await prisma.vocalRecordingAppointmentDetail.findUnique({
        where:{id}
    })
    if(!detail) throw new Error("Appointment not found")
    if(detail.user_id!==userId) throw new Error("Unauthorized")
    if(detail.isCancel) throw new Error("Already cancelled")
    const updated=await prisma.vocalRecordingAppointmentDetail.update({
        where:{id},
        data:{
            cancelRequested:true,
            cancelReason:reason
        }
    })
    return updated
}

const approveCancelRequest=async(id:number)=>{
    const updated=await prisma.vocalRecordingAppointmentDetail.update({
        where:{id},
        data:{
            isCancel:true,
            cancelApprovedAt:new Date()
        }
    })
    return updated
}

const rejectCancelRequest=async(id:number,reason:string)=>{
    const updated=await prisma.vocalRecordingAppointmentDetail.update({
        where:{id},
        data:{
            cancelRequested:false,
            cancelReason:null,
            rejectReason:reason
        }
    })
    return updated
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
    getAllAppointments,
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
    requestCancelAppointment,
    approveCancelRequest,
    rejectCancelRequest,
    getTodayAppointmentsCount,
    getUpcomingAppointmentsCount
}

export default AppointmentService
