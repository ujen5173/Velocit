import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `VehicleRental_${name}`);

// Enums
export const vehicleTypeEnum = pgEnum("vehicle_type", [
  "bike",
  "e-bike",
  "cycle",
  "e-cycle",
  "scooter",
  "e-scooter",
  "car",
  "e-car",
  "others",
]);
export const rentalStatusEnum = pgEnum("rental_status", [
  "pending",
  "approved",
  "rejected",
  "cancelled",
  "completed",
]);

export const business = createTable(
  "business",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 256 }).notNull(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    description: text("description"),
    locationMap: text("location_map"),
    locationAddress: text("location_address"),
    locationCity: text("location_city"),
    phoneNumbers: integer("phone_numbers")
      .array()
      .notNull()
      .default(sql`'{}'::int[]`),
    openingHours: text("opening_hours"),
    openingDays: text("opening_days"),
    rating: integer("rating").default(0),
    banner: text("banner"),
    logo: text("logo"),
    shopImage: text("shop_image"),
    longRidesAvailable: boolean("long_rides_available").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (table) => ({
    slugIdx: index("slug_idx").on(table.slug),
    nameIdx: index("name_idx").on(table.name),
  }),
);

export const vehicles = createTable("vehicle", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  businessId: varchar("business_id", { length: 255 })
    .notNull()
    .references(() => business.id),
  name: varchar("name", { length: 256 }).notNull(),
  type: vehicleTypeEnum("type").notNull(),
  images: text("images")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  basePrice: integer("base_price").notNull(),
  discountedPrice: integer("discounted_price"),
  availability: boolean("availability").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const rentals = createTable("rental", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  vehicleId: varchar("vehicle_id", { length: 255 })
    .notNull()
    .references(() => vehicles.id),
  businessId: varchar("business_id", { length: 255 })
    .notNull()
    .references(() => business.id),
  rentedFrom: timestamp("rented_from", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  rentedTill: timestamp("rented_till", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  status: rentalStatusEnum("status").notNull().default("pending"),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const faq = createTable("faq", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  businessId: varchar("business_id", { length: 255 })
    .notNull()
    .references(() => business.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }),
  image: varchar("image", { length: 255 }),
});

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// Relations
export const businessRelations = relations(business, ({ many }) => ({
  faqs: many(faq),
  vehicles: many(vehicles),
  rentals: many(rentals),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  business: one(business, {
    fields: [vehicles.businessId],
    references: [business.id],
  }),
  rentals: many(rentals),
}));

export const rentalsRelations = relations(rentals, ({ one }) => ({
  user: one(users, { fields: [rentals.userId], references: [users.id] }),
  vehicle: one(vehicles, {
    fields: [rentals.vehicleId],
    references: [vehicles.id],
  }),
  business: one(business, {
    fields: [rentals.businessId],
    references: [business.id],
  }),
}));

export const faqRelations = relations(faq, ({ one }) => ({
  business: one(business, {
    fields: [faq.businessId],
    references: [business.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  rentals: many(rentals),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
