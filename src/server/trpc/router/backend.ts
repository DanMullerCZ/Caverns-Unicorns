import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { generateTokens, hashToken } from "../../../pages/api/auth/jwt";
import { User, Account, Session } from "@prisma/client";


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
  races: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (input) => {
      if (input.input.name.length == 0) {
        throw new Error("All fields are required.");
      }
      const res = await fetch(`https://www.dnd5eapi.co/api/races/human`);
      console.log(res);
      if (!res) {
        throw new Error("Invalid race name.");
      }
      const result = JSON.stringify(res);
      return result;
    }),

  registration: publicProcedure
    .input(
      z.object({ email: z.string(), password: z.string(), name: z.string() })
    )
    .mutation(async (input) => {
      const date = new Date();

      date.setDate(date.getSeconds() + 30);
      const user: User = (await prisma?.user.create({
        data: {
          email: input.input.email,
          password:hashToken(input.input.password),
          name: input.input.name,
        },
      })) as User;
      const account: Account = (await prisma?.account.create({
        data: {
          userId: user.id,
          type: "normal",
          provider: "Credentials",
          providerAccountId: "not important",
        },
      })) as Account;
      const session: Session = (await prisma?.session.create({
        data: { expires: date, userId: user.id, sessionToken: "-" },
      })) as Session;

      console.log(user, account);
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
