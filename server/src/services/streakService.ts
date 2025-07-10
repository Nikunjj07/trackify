import { PrismaClient } from "@prisma/client"
import { differenceInDays } from "date-fns"

const client = new PrismaClient();

export async function updateStreak(habitId: number){
    const checkins = await client.checkIn.findMany({
        where:{
            habitId:habitId
        },
        orderBy:{
            date:'asc'
        }
    })

    if(checkins.length === 0){
        await client.streak.upsert({
            where: { habitId },
            update: {
            currentStreak: 0,
            longestStreak: 0,
            },
            create: {
            habitId,
            currentStreak: 0,
            longestStreak: 0,
            lastCheckInDate:null
            },
        });
        return
    }
    console.log("in update")
    let currentStreak = 1;
    let longestStreak = 1;

    for(let i = checkins.length-2;i>=0; i--){
        const today = new Date(checkins[i+1].date);
        const prev = new Date(checkins[i].date);

        const diff = differenceInDays(today,prev);

        if (diff == 1){
            currentStreak += 1;
            if(currentStreak>longestStreak){
                longestStreak = currentStreak
            }
        }else if(diff >1){
            break
        }
    }
     const lastCheckInDate = new Date(checkins[checkins.length - 1].date);

    await client.streak.upsert({
        where: { habitId },
        update: {
        currentStreak,
        longestStreak,
        lastCheckInDate,
        },
        create: {
        habitId,
        currentStreak,
        longestStreak,
        lastCheckInDate,
        },
    });
    console.log("updated")
}