import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn =
  globalForDb.conn ??
  postgres(env.DATABASE_URL, {
    max: 10, // Max pool size
    idle_timeout: 20, // Close idle connections after 20s
    connect_timeout: 10, // Connection timeout
    prepare: false, // Disable prepared statements
    ssl: env.NODE_ENV === "production", // Enable SSL in production
    connection: {
      application_name: "velocit", // For identifying in database logs
    },
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
