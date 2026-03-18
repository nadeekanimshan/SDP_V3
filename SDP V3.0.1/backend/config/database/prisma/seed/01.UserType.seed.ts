import { UserType } from "../../../constant"
import { prisma } from "../../prisma"


const seed = async () => {
    try {  
        for(const userType of Object.values(UserType)){
        const existingUserType = await prisma.userType.findUnique({
            where: {
                name: userType
            }
        })
        if (existingUserType) {
            continue
        }
        await prisma.userType.create({
            data: {
                name: userType
            }
        })
    }
    } catch (error) {
        console.log("Error seeding user types",error)
    }

}

seed()