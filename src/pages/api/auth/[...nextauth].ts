import NextAuth, { type NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
// Prisma adapter for NextAuth, optional and can be removed
<<<<<<< HEAD
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        //session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [  DiscordProvider({
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET
  }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
=======
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '../../../env/server.mjs';
import { prisma } from '../../../server/db/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User, Session, Account, Prisma } from '@prisma/client';
import { generateTokens, hashToken, expiresAt } from './jwt';
import { randomBytes, randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { Secret } from 'next-auth/jwt/types.js';

export const authOptions: NextAuthOptions = {
  // Include user.id on session

  pages: {
    signIn: '/login',
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      //type: "credentials",
      //id: "domain-login",

      name: 'Credentials',
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
      ) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const user: User = (await prisma.user.findUnique({
          where: { email: payload.email },
        })) as User;

        if (
          user.password == hashToken(payload.password as string) &&
          user.emailVerified
        ) {
          return user;
        } else {
          return null;
        }
      },
      credentials: {
        email: { label: 'E-mail', type: 'text ' },
        password: { label: 'Password', type: 'password' },
      },
    }),
>>>>>>> master
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        console.log(token);
        const st = (): string => {
          return randomUUID?.() ?? randomBytes(32).toString('hex');
        };
        session.user.id = token.sub as string;
        const s: Prisma.BatchPayload = await prisma.session.updateMany({
          where: { userId: token.sub },
          data: {
            sessionToken: st(),
            expires: new Date(Number(token.exp) * 1000),
          },
        });
        const tokens = generateTokens(token);

        const a: Prisma.BatchPayload = await prisma.account.updateMany({
          where: { userId: token.sub },
          data: {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            expires_at: expiresAt(tokens.accessToken),
            id_token: token.jti as string,
          },
        });
        console.log(a, s);
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
