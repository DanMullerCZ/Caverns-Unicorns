import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { hashToken } from '../../pages/api/auth/jwt';
import { User, Account, Session } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { sendEmailVerificationToken } from './mail';
import { prisma } from '.././db/client';

export const exampleRouter = router({
  addChar: publicProcedure
    .input(
      z.object({
        class: z.string(),
        race: z.string(),
        user_id: z.string(),
        name: z.string(),
        str:z.number(),
        con:z.number(),
        dex:z.number(),
        int:z.number(),
        wis:z.number(),
        char:z.number(),
      }),
    )
    .mutation(async (input) => {
      if (!input.input.name) {
        throw new Error('Name required.');
      }
      const check = await prisma.characters.findFirst({
        where: { name: input.input.name },
      });
      if (check) {
        throw new Error('Name already taken.');
      }
      const class_id = await prisma.class.findFirst({
        where: {
          name: input.input.class,
        },
        select: {
          id: true,
        },
      });
      const race_id = await prisma.race.findFirst({
        where: {
          name: input.input.race,
        },
        select: {
          id: true,
        },
      });

      if (!race_id) return 'Race not found.';
      if (!class_id) return 'Class not found.';
      await prisma.characters.create({
        data: {
          name: input.input.name,
          race: input.input.race,
          class: input.input.class,
          maxHP:10,
          currentHP:10,
          owner_id: input.input.user_id,
          str:input.input.str,
          dex:input.input.dex,
          con:input.input.con,
          int:input.input.int,
          wis:input.input.wis,
          char:input.input.char,
        },
      });
      return 'ok';
    }),
  races: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (input: any) => {
      if (input.input.name.length == 0) {
        throw new Error('All fields are required.');
      }
      const check = await prisma?.race.findFirst({
        where: { name: input.input.name.toLowerCase() },
      });
      if (check) {
        throw new Error('Race already added.');
      }
      const res = await fetch(
        `https://www.dnd5eapi.co/api/races/${input.input.name.toLowerCase()}`,
      ).then((res) => res.json());

      if (!res.name) {
        throw new Error('Invalid race name.');
      }
      const response = {
        name: input.input.name.toLowerCase(),
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        char: 0,
      };
      for (let i = 0; i < res.ability_bonuses.length; i++) {
        switch (res.ability_bonuses[i].ability_score.index) {
          case 'str': {
            response.str = res.ability_bonuses[i].bonus;
            break;
          }
          case 'dex': {
            response.dex = res.ability_bonuses[i].bonus;
            break;
          }
          case 'con': {
            response.con = res.ability_bonuses[i].bonus;
            break;
          }
          case 'int': {
            response.int = res.ability_bonuses[i].bonus;
            break;
          }
          case 'wis': {
            response.wis = res.ability_bonuses[i].bonus;
            break;
          }
          case 'char': {
            response.char = res.ability_bonuses[i].bonus;
            break;
          }
        }
      }
      await prisma?.race.create({ data: response });
      return response;
    }),
  registration: publicProcedure
    .input(
      z.object({ email: z.string(), password: z.string(), name: z.string(), match: z.boolean() }),
    )
    .mutation(async (input: any) => {
      try {
        if(!input.input.match){
          return 'Passwords do not match'
        }
        const date = new Date();

        date.setDate(date.getSeconds() + 30);
        const user: User = (await prisma?.user.create({
          data: {
            email: input.input.email,
            password: hashToken(input.input.password),
            name: input.input.name,
          },
        })) as User;
        const timeOfExpiration = new Date();
        const tokenExpiration = '10min'; // set also one line below
        timeOfExpiration.setMinutes(timeOfExpiration.getMinutes() + 10);
        const account: Account = (await prisma?.account.create({
          data: {
            userId: user.id,
            type: 'normal',
            provider: 'Credentials',
            providerAccountId: 'not important',
            access_token: jwt.sign(
              { email: user.email },
              process.env.JWT_ACCESS_SECRET as Secret,
              {
                expiresIn: tokenExpiration,
              },
            ),
          },
        })) as Account;

        const session: Session = (await prisma?.session.create({
          data: { expires: date, userId: user.id, sessionToken: '-' },
        })) as Session;

        const message = `Token expires in ${tokenExpiration}, at  ${timeOfExpiration.toLocaleTimeString(
          'Cs-cz',
        )}
        ${
          (process.env.HOST +
            '/veryfiEmail?token=' +
            account.access_token) as string
        }
        `;
        sendEmailVerificationToken(
          user.email as string,
          'Verify your account',
          message,
        );

        if (session) {
          return 'Successfully registered';

        } else {
          return 'Internal error';
        }
      } catch (error: any) {
        return 'Invalid inputs';
      }
    }),

  veryfiEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }: any) => {
      const token: string = input.token;
      let account: Account[];
      let user: User;
      try {
        account = (await prisma.account.findMany({
          where: { access_token: token },
        })) as Account[];
        user = (await prisma.user.findUnique({
          where: { id: account[0].userId },
        })) as User;
      } catch (error) {
        return { message: 'Invalid token' };
      }

      try {
        if (!user?.emailVerified) {
          jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret);
          await prisma?.user.update({
            where: { id: account[0].userId },
            data: { emailVerified: new Date() },
          });
          return { message: 'Email veryfied!' };
        } else {
          return { message: 'Email already verified' };
        }
      } catch (error) {
        if (!user?.emailVerified) {
          await prisma?.user.delete({ where: { id: account[0].userId } });
          return {
            message:
              'Token has expired. You need to register again. Your email has been deleted from the database.',
          };
        } else {
          return { message: 'Email already verified' };
        }
      }
    }),
});
