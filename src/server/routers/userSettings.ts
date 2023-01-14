import { router, publicProcedure } from '../trpc';
import { prisma } from '../db/client'
import { boolean, string, z } from 'zod';
import { hashToken } from 'pages/api/auth/jwt';

type UserPassword = { password: string } 



export const userSettRouter = router({
    passwordCheck: publicProcedure
        .input(z.object({ 
            currentPassword: z.string(),
            newPassword: z.string(),
        }))
        .mutation(async({input, ctx }) => {      
            try {
                const userPass: any = await prisma.user.findFirst({
                    where: { id: ctx.session?.user?.id } ,
                    select: { password: true }
                }) as UserPassword
                console.log(userPass, 'user password');
                
                const hashedInput = hashToken(input.currentPassword)
                if(hashedInput === userPass.password){
                    const hashedNewPass = hashToken(input.newPassword)
                    const newPassword: any = await prisma.user.update({
                        where: { 
                            id: ctx.session?.user?.id 
                        },
                        data: {
                            password: hashedNewPass
                        }  
                    })
                    return `Succesfully changed password ${newPassword}`
                } else {
                    return 'wrong password'
                }
            } catch (e) {
                return `Cannot acces data from database, error:${e}`
            }
        })
    })        