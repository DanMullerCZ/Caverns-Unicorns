import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({

  races: publicProcedure.input(z.object({ 'name': z.string() }))
    .mutation(async (input) => {
      if (input.input.name.length == 0) { throw new Error('All fields are required.') }
      const check = await prisma?.race.findFirst({ where: { name: input.input.name.toLowerCase() } })
      if (check) { throw new Error('Race already added.') }
      const res = await fetch(`https://www.dnd5eapi.co/api/races/${input.input.name.toLowerCase()}`).then(res => res.json())

      if (!res.name) { throw new Error('Invalid race name.') }
      let response = {
        "name": input.input.name.toLowerCase(),
        "str": 0,
        "dex": 0,
        "con": 0,
        "int": 0,
        "wis": 0,
        "char": 0
      }
      for (let i = 0; i < res.ability_bonuses.length; i++) {
        switch (res.ability_bonuses[i].ability_score.index) {
          case 'str': {
            response.str = res.ability_bonuses[i].bonus
            break;
          }
          case 'dex': {
            response.dex = res.ability_bonuses[i].bonus
            break;
          }
          case 'con': {
            response.con = res.ability_bonuses[i].bonus
            break;
          }
          case 'int': {
            response.int = res.ability_bonuses[i].bonus
            break;
          }
          case 'wis': {
            response.wis = res.ability_bonuses[i].bonus
            break;
          }
          case 'char': {
            response.char = res.ability_bonuses[i].bonus
            break;
          }
        }
      }
      await prisma?.race.create({ data: response })
      return response
    }),


  registration: publicProcedure.input(z.object({ 'username': z.string(), 'password': z.string() }))
    .mutation(async (input) => {
      const check = await prisma?.login.findFirst({
        where: { username: input.input.username }
      })
      if (input.input.username.length == 0 || input.input.password.length == 0) { throw new Error('All fields are required.') }
      if (check) { throw new Error('Username is already taken, choose another one.') }
      if (input.input.password.length < 8) { throw new Error('Password must be 8 characters.') }
      const res = await prisma?.login.create({ data: input.input })
      const result = JSON.stringify(res)
      console.log(result)
      return result

    }),


});
