import { prisma } from "../../prisma"


const events = [
    {
        "id": 1,
        "title": "Colombo Festivel",
        "description": "colombo festivel in 2025 is a big event, it will be held in colombo. it will be a great event. we will have a lot of fun.",
        "startDate": "2025-09-22T00:00:00.000Z",
        "endDate": null,
        "location": "Clombo",
        "time": "2025-09-22T19:00:00.000Z",
        "note": null
    },
    {
        "id": 2,
        "title": "New Year's Eve",
        "description": "new year's eve in 2025 is a big event, it will be held in colombo. it will be a great event. we will have a lot of fun.",
        "startDate": "2025-09-22T00:00:00.000Z",
        "endDate": null,
        "location": "Clombo",
        "time": "2025-09-22T19:00:00.000Z",
        "note": null
    },
    {
        "id": 3,
        "title": "Children's Day",
        "description": "children's day in 2025 is a big event, it will be held in colombo. it will be a great event. we will have a lot of fun.",
        "startDate": "2025-09-04T00:00:00.000Z",
        "endDate": null,
        "location": "Clombo",
        "time": "2025-09-04T19:00:00.000Z",
        "note": null
    },
]

const seed = async () => {
    try {
        for(const event of events){
            const existingEvent = await prisma.event.findUnique({
                where: {
                    id: event.id
                }
            })
            if (existingEvent) {
                continue
            }
            await prisma.event.create({
                data: event
            })
        }
    } catch (error) {
        console.log("Error seeding events",error)
    }
}
seed();