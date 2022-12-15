import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
    getCharacters: publicProcedure.input(z.object({id:z.number()}))
      .query(async (input) =>{
      return await prisma?.characters.findMany({where : {owner_id:input.input.id}})
  })
  ,
  race: publicProcedure.query(async () => {
    return await prisma?.race.findFirst()
  }),
  getRaces: publicProcedure.query(async () => {
    return await prisma?.race.findMany()
  }),

  registration: publicProcedure.input(z.object({ 'username': z.string(), 'password': z.string() }))
    .mutation(async (input) => {
      const check = await prisma?.login.findFirst({
        where: { username: input.input.username }
      })
      if (!check && input.input.username.length > 0 && input.input.password.length > 0) {
        const res = await prisma!.login.create({ data: input.input })
        return {response:res}
      }
      return false
    }),
    
  logInUser: publicProcedure.input(z.object({ 'username': z.string(), 'password': z.string() }))
  .mutation(async (input)=>{
    const check = await prisma?.login.findFirstOrThrow({
      where:{username: input.input.username,password:input.input.password}
    })
  }),
  getUserId: publicProcedure.input(z.object({ 'username': z.string(), 'password': z.string() }))
      .query(async (input)=>{
        const res = await prisma?.login.findFirst({
          where: {username:input.input.username,password:input.input.password}
        })
        return res?.id
      })
});
