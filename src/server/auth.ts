// auth.ts
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
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
      vendorSetupComplete?: boolean;
      stripeCustomerId?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    vendorSetupComplete: boolean;
    role: userRoleEnum;
    createdAt: Date;
    updatedAt: Date;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async jwt({ token, user, trigger }) {
      token.id = token.sub;
      token.vendorSetupComplete =
        token.vendorSetupComplete ?? user.vendorSetupComplete ?? false;

      if (trigger === "signUp" && user) {
        const roleCookie = cookies().get("role")?.value;

        if (roleCookie) {
          token.role = roleCookie;

          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, user.email),
          });

          if (existingUser) {
            await db
              .update(users)
              .set({ email: user.email, role: roleCookie as userRoleEnum })
              .where(eq(users.id, existingUser.id));
          }

          cookies().set("role", "", { maxAge: -1, path: "/" });
        }
      }

      token.role = token.role ?? user.role ?? "USER";

      return token;
    },

    async session({ session, token }) {
      // console.log({ session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          vendorSetupComplete: token.vendorSetupComplete,
          role: token.role,
        },
      };
    },
  },

  session: {
    strategy: "jwt",
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
