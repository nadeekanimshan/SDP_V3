import z from "zod"

const MonthSchema=z.object({
    months:z.array(z.enum(["January","February","March","April","May","June","July","August","September","October","November","December"]))
})

export type MonthType= z.infer<typeof MonthSchema>

const UserValidator={
    MonthSchema,
}

export default UserValidator
