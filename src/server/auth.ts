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
      image?: string | null;
      vendor_setup_complete: boolean;
      stripeCustomerId?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    vendor_setup_complete: boolean;
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

    async jwt({ token, user, trigger, session: newData }) {
      token.id = token.sub;

      if (trigger === "signUp" && user) {
        const roleCookie = cookies().get("role")?.value;

        if (roleCookie) {
          token.role = roleCookie;
          token.vendor_setup_complete = false;

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

      token.image = token.image ?? token.picture;
      if (trigger === "update") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        token.name = newData.user.name;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        token.image = newData.user.image;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        token.vendor_setup_complete = newData.user.vendor_setup_complete;
      }

      token.role = token.role ?? user?.role ?? "USER";
      token.vendor_setup_complete =
        token.vendor_setup_complete ?? user?.vendor_setup_complete ?? false;

      const { picture, ...rest } = token;

      return rest; // returns token without picture from the token
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          image: (token.image as string | undefined) ?? session.user.image,
          email: token.email,
          vendor_setup_complete: token.vendor_setup_complete,
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
