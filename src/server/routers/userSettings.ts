import { router, publicProcedure } from '../trpc';
import { prisma } from '../db/client'
import { boolean, string, z } from 'zod';

import { hashToken } from '../../pages/api/auth/jwt';
import { User } from 'next-auth';


type UserPassword = { password: string } 

export const userSettRouter = router({
    passwordCheck: publicProcedure
        .input(z.object({ 
            userId: z.string(),
        }))
        .mutation(async({input }) => {      
            try {
                const userPass = await prisma.user.findUnique({
                    where: { id: input.userId } ,
                    select: { password: true }
                }) as UserPassword    
                    return userPass.password
            //     }
            } catch (e) {
                return `Cannot acces data from database, error:${e}`
            }
        }),

    userImage: publicProcedure 
        .input(z.object({
            userId: z.string(),
        }))
        .mutation(async( {input} ) => {
            try {
                const getUserImage = await prisma.user.findUnique({
                    where: {
                        id: input.userId
                    },
                    select: {
                        image: true
                    }
                })
                return getUserImage?.image
            } catch (e) {
                return `Cannot acces database, error: ${e}`
            }
        }),

    changeUserImage: publicProcedure
        .input(z.object({
            newImage: z.string(),
            userId: z.string(),
        }))    
        .mutation(async({input}) => {
            try {
                const changeUserImage = await prisma.user.update({
                    where: {
                        id: input.userId
                    },
                    data: {
                        image: input.newImage
                    }
                })
                return 'succesfully changed image'
            } catch (e) {
                return `Cannot update database, Error: ${e}`
            }
        }),
        passwordChange: publicProcedure
        .input(z.object({ 
            newPassword: z.string(),
            userId: z.string(),
        }))
        .mutation(async({ input }) => {      
            try {          
                    const newPassword = await prisma.user.update({
                        where: { 
                            id: input.userId
                        },
                        data: {
                            password: input.newPassword
                        }  
                    }) as User
                    return `Succesfully changed password`
            } catch (e) {
                return `Cannot acces data from database, error:${e}`
            }
        }),
})        