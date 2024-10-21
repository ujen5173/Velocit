import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";
import { type userRoleEnum } from "./server.types";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: userRoleEnum;
      email: string;
      name?: string | null;
      profile?: string | null;
      stripeCustomerId?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | null;
    profile?: string | null;
    role: userRoleEnum;
    stripeCustomerId?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }) as Adapter,

  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
