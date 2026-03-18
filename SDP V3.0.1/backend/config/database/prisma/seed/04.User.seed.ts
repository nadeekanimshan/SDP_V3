import { UserType } from "../../../constant"
import { prisma } from "../../prisma"
const bcrypt = require('bcrypt')

const users = [
    {
        email: "john@gmail.com",
        first_name: "john",
        last_name: "doe",
        password: "admin1234",
        type: UserType.ADMIN,
        contact_number: "1234567890",
        address: "Colombo",
        city: "Colombo",
        district: "Colombo",
        created_at: new Date(),
        updated_at: new Date(),
        deleteStatus: false
    },
    {
        email: "lucy@gmail.com",
        first_name: "lucy",
        last_name: "doe",
        password: "user1234",
        type: UserType.USER,
        contact_number: "1234567890",
        address: "Colombo",
        city: "Colombo",
        district: "Colombo",
        created_at: new Date(),
        updated_at: new Date(),
        deleteStatus: false
    }

]


const seed = async () => {
    try {
        for(const user of users){
            // find user type
            const user_type = await prisma.userType.findFirst({
                where: {
                    name: user.type
                }
            })
            // if user type not found, skip
            if (!user_type) {
                continue
            }
            // check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: user.email
                }
            })
            // if user already exists, skip
            if (existingUser) {
                continue
            }
            // hash password
            const hashedPassword=await bcrypt.hash(user.password,10);
            // create user
            await prisma.user.create({
                data: {
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    password: hashedPassword,
                    typeId: user_type.id,
                    contactNumber: user.contact_number,
                    address: user.address,
                    city: user.city,
                    district: user.district,
                    createdAt: user.created_at,
                    updatedAt: user.updated_at,
                    deleteStatus: user.deleteStatus
                }
            })
        }

        console.info("\n✅ All users executed in order.");
    } catch (error) {
        console.error("Error seeding users", error)
    }
}
seed();