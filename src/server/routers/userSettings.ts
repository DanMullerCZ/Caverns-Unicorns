import { router, publicProcedure } from '../trpc';
import { prisma } from '../db/client'
import { boolean, string, z } from 'zod';
import { hashToken } from '../../pages/api/auth/jwt';

type UserPassword = { password: string } 
type passwordState = true | false | null
export const userSettRouter = router({
    changePassword: publicProcedure
        .input(z.string())
        .mutation(async({input, ctx }) => {
            let correctPassword: passwordState = null
            if( input === ''){
                throw new Error('please provide new password')
            }
            const userPass: UserPassword = await prisma.user.findUnique({
                where: { id: ctx.session?.user?.id } ,
                select: { password: true }
            }) as UserPassword
            const hashedInput = hashToken(input)
            hashedInput === userPass.password ? correctPassword = true : correctPassword = false
            
            return  correctPassword 
        })
    })