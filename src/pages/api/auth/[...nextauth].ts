import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { User, Session, Account, Prisma } from "@prisma/client";
import { generateTokens, hashToken } from "./jwt";
import GitHubProvider from "next-auth/providers/github";


export const authOptions: NextAuthOptions = {
  // Include user.id on session

  pages: {
    //signIn: "/login"
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
      name: "Credentials",
      async authorize(credentials: any, req: any) {
        const payload = {
          email: credentials.email,
          password: credentials.password, //|| "no password",
        };

        const user: User = (await prisma.user.findUnique({
          where: { email: payload.email },
        })) as User;

        if (user.password == hashToken(payload.password)) {
          return user;
        } else {
          return null;
        }
      },
      credentials: {
        email: { label: "E-mail", type: "text " },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        const s: Prisma.BatchPayload = await prisma.session.updateMany({
          where: { userId: token.sub },
          data: {
            sessionToken: hashToken(token.jti),
          },
        });
        const tokens = generateTokens(
          token.email as string,
          token.jti as string
        );
        const a: Prisma.BatchPayload = await prisma.account.updateMany({
          where: { userId: token.sub },
          data: {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
          },
        });
        console.log(a, s);
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
