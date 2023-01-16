import { router, publicProcedure } from '../trpc';
import { prisma } from '../db/client'
import { boolean, string, z } from 'zod';
import { hashToken } from 'pages/api/auth/jwt';
import { User } from 'next-auth';

type UserPassword = { password: string } 

export const userSettRouter = router({
    passwordCheck: publicProcedure
        .input(z.object({ 
            currentPassword: z.string(),
            newPassword: z.string(),
            userId: z.string(),
        }))
        .mutation(async({input }) => {      
            try {
                const userPass = await prisma.user.findUnique({
                    where: { id: input.userId } ,
                    select: { password: true }
                }) as UserPassword    
                const hashedInput = hashToken(input.currentPassword)
                if(hashedInput === userPass.password){
                    const hashedNewPass = hashToken(input.newPassword)
                    const newPassword = await prisma.user.update({
                        where: { 
                            id: input.userId
                        },
                        data: {
                            password: hashedNewPass
                        }  
                    }) as User
                    return `Succesfully changed password`
                } else {
                    return `HASH> ${hashedInput} and ${userPass.password} `
                }
            } catch (e) {
                return `Cannot acces data from database, error:${e}`
            }
        })
    })        