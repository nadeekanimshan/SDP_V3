import { prisma } from "../../prisma"

const classes  = [
    {
        "id": 1,
        "name": "Vocal Training Class",
        "description": "Improve your singing with our expert vocal coaches through personalized training sessions.",
        "duration": "1 hour",
        "day": "Wensdays",
        "startTime": "6:00 PM",
        "endTime": "7:00 PM",
        "installments_count": 5,
        "installments_price": "1000",
        "full_price": "5000"
    },
    {
        "id": 2,
        "name": "Guitar Class",
        "description": "Improve your guitar skills with our expert guitar coaches through personalized training sessions.",
        "duration": "1 hour",
        "day": "Thursdays",
        "startTime": "6:00 PM",
        "endTime": "7:00 PM",
        "installments_count": 5,
        "installments_price": "1000",
        "full_price": "5000"
    },
    {
        "id": 3,
        "name": "Piano Class",
        "description": "Improve your piano skills with our expert piano coaches through personalized training sessions.",
        "duration": "1 hour",
        "day": "Fridays",
        "startTime": "6:00 PM",
        "endTime": "7:00 PM",
        "installments_count": 5,
        "installments_price": "1000",
        "full_price": "5000"
    },
]
const seed = async () => {
    try {
        for(const cls of classes){
            const existingClass = await prisma.class.findUnique({
                where: {
                    id: cls.id
                }
            })
            if (existingClass) {
                continue
            }
            await prisma.class.create({
                data: cls
            })
        }
    } catch (error) {
        console.log("Error seeding classes",error)
    }
}
seed();
