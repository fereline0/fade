import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Yandex from "next-auth/providers/yandex";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./app/_utils/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [Github, Yandex],
  callbacks: {
    async session({ session }) {
      return {
        ...session,
      };
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            role: {
              connect: {
                name: "User",
              },
            },
          },
        });
      }
    },
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          role: {
            include: {
              abilities: true,
            },
          },
          bans: true,
        },
      });

      if (user) {
        session.user.role = user.role;
        session.user.bans = user.bans;
      }
    },
  },
});
