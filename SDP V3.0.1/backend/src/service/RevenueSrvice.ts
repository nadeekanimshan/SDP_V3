import { prisma } from "../../config/database/prisma";

const getTodayRevenue = async () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const revenue = await prisma.class_Installment.aggregate({
      _sum: { amount: true },
      where: {
        status:{
          contains:"done",
        },
        paymentDate: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
    const payment = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        paymentDate: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
    return Number(revenue._sum.amount ?? 0) + Number(payment._sum.amount ?? 0);
  };
  
const getMonthlyRevenue = async () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const revenue = await prisma.class_Installment.aggregate({
      _sum: { amount: true },
      where: {
        status:{
          contains:"done",
        },
        paymentDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const payment = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        paymentDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
    return Number(revenue._sum.amount ?? 0) + Number(payment._sum.amount ?? 0);
  };

  const RevenueService={
    getTodayRevenue,
    getMonthlyRevenue
  }
  
  export default RevenueService