

import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Zod Schema for Request Validation
const ClassRegistrationSchema = z.object({
  class_id: z.number(),
  user_id: z.number(),
  installments: z.array(
    z.object({
      amount: z.number(),
      status: z.string().optional(),
      paymentDate: z.string().optional(),
      paymentMethod: z.string().optional(),
      installments_Due_Date: z.string()
    })
  ),
});

const ClassInstallmentSchema = z.object({
  installment_id: z.number(),
  user_id: z.number(),
  paymentMethod: z.string(),
  status: z.string(),
});

const ClassValidator={
   ClassRegistrationSchema ,
   ClassInstallmentSchema
}

export default ClassValidator
