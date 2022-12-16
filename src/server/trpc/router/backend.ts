import { z } from "zod";
import { router, publicProcedure } from "../trpc";
export const exampleRouter = router({
//     getCharacters: publicProcedure.input(z.object({id:z.number()}))
//       .query(async (input) =>{
//       return await prisma?.characters.findMany({where : {owner_id:input.input.id}})
//   })
//   ,
//   race: publicProcedure.query(async () => {
//     return await prisma?.race.findFirst()
//   }),
//   getRaces: publicProcedure.query(async () => {
//     return await prisma?.race.findMany()
//   }),
  races: publicProcedure.input(z.object({'name':z.string()}))
        .mutation(async (input) => {
          if (input.input.name.length==0) {throw new Error('All fields are required.')}
          const res = await fetch(`https://www.dnd5eapi.co/api/races/human`)
          console.log(res)
          if (!res) {throw new Error('Invalid race name.')}
          const result = JSON.stringify(res)
          return result
        }),


  registration: publicProcedure.input(z.object({ 'username': z.string(), 'password': z.string() }))
    .mutation(async (input) => {
      const check = await prisma?.login.findFirst({
        where: { username: input.input.username }
      })
      if (input.input.username.length == 0 || input.input.password.length == 0){throw new Error('All fields are required.')}
      if (check ) {throw new Error('Username is already taken, choose another one.')}
      if (input.input.password.length < 8) {throw new Error('Password must be 8 characters.')}
        const res = await prisma?.login.create({ data: input.input })
        const result = JSON.stringify(res)
        console.log(result)
        return result
        
    }),
    
//   logInUser: publicProcedure.input(z.object({ 'username': z.string(), 'password': z.string() }))
//   .mutation(async (input)=>{
//     const check = await prisma?.login.findFirstOrThrow({
//       where:{username: input.input.username,password:input.input.password}
//     })
//   }),
//   getUserId: publicProcedure.input(z.object({ 'username': z.string(), 'password': z.string() }))
//       .query(async (input)=>{
//         const res = await prisma?.login.findFirst({
//           where: {username:input.input.username,password:input.input.password}
//         })
//         return res?.id
//       })
});
