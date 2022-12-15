import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import CredentialsProvider from "next-auth/providers/credentials";


import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from "dotenv";
import * as crypto from "crypto";

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
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      type: "credentials",
      id: "domain-login",
      name: "Domain Account",
      async authorize(credentials: any, req: any) {
        const payload = {
          email: credentials.email //|| "no password",
        };
        console.log("********" + payload.email);
        
          const user = await prisma.user.findUnique({
          where: { email: payload.email },
        }); 

        if (user) {
          return user;
        } else {
          return null;
        }
      },
      credentials: {
        username: { label: "Username", type: "text ", placeholder: "jsmith" },
        email: { label: "Password", type: "text" },
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  }
  
  
};

export default NextAuth(authOptions);
