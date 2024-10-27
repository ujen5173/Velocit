import { relations, sql } from "drizzle-orm";
import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `VehicleRental_${name}`);

// Enums
export const vehicleTypeEnum = pgEnum("vehicle_type", [
  "bike",
  "e-bike",
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

export const userRoleEnum = pgEnum("user_role", ["USER", "VENDOR"]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "processing",
  "completed",
  "failed",
  "refunded",
]);

// Optimized users table
export const users = createTable(
  "user",
  {
    id: varchar("id", { length: 36 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 100 }),
    email: varchar("email", { length: 100 }).notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    image: varchar("image", { length: 255 }),
    role: userRoleEnum("role").notNull().default("USER"),
    stripeCustomerId: varchar("stripe_customer_id", { length: 100 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("user_email_idx").on(table.email),
    roleIdx: index("user_role_idx").on(table.role),
  }),
);

// Optimized businesses table
export const businesses = createTable(
  "business",
  {
    id: varchar("id", { length: 36 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    ownerId: varchar("owner_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    location: jsonb("location").notNull(),
    phoneNumbers: varchar("phone_numbers", { length: 20 })
      .array()
      .notNull()
      .default(sql`'{}'::varchar[]`),
    businessHours: jsonb("business_hours").notNull(),
    rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
    ratingCount: integer("rating_count").default(0),
    bannerImage: text("banner_image"),
    logoImage: text("logo_image"),
    shopImages: text("shop_images")
      .array()
      .default(sql`'{}'::text[]`),
    longRidesAvailable: boolean("long_rides_available").notNull().default(true),
    stripeAccountId: varchar("stripe_account_id", { length: 100 }),
    features: jsonb("features").default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index("business_name_idx").on(table.name),
    ownerIdx: index("business_owner_idx").on(table.ownerId),
    locationIdx: index("business_location_idx").on(table.location),
    ratingIdx: index("business_rating_idx").on(table.rating, table.ratingCount),
  }),
);

// Optimized vehicles table with availability tracking
export const vehicles = createTable(
  "vehicle",
  {
    id: varchar("id", { length: 36 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    businessId: varchar("business_id", { length: 36 })
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    type: vehicleTypeEnum("type").notNull(),
    make: varchar("make", { length: 50 }),
    model: varchar("model", { length: 50 }),
    year: integer("year"),
    images: text("images")
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    basePrice: integer("base_price").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),
    discountedPrice: integer("discounted_price"),
    isAvailable: boolean("is_available").notNull().default(true),
    // New availability tracking fields
    lastMaintenanceDate: timestamp("last_maintenance_date"),
    nextMaintenanceDate: timestamp("next_maintenance_date"),
    currentRentalId: varchar("current_rental_id", { length: 36 }),
    availabilitySchedule: jsonb("availability_schedule").default(
      sql`'{}'::jsonb`,
    ),
    currentLocation: jsonb("current_location"),
    mileage: integer("mileage").default(0),
    status: varchar("status", { length: 20 }).notNull().default("available"),
    features: jsonb("features").default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    businessIdx: index("vehicle_business_idx").on(table.businessId),
    typeIdx: index("vehicle_type_idx").on(table.type),
    availabilityIdx: index("vehicle_availability_idx").on(
      table.isAvailable,
      table.status,
      table.businessId,
    ),
    locationIdx: index("vehicle_location_idx").on(table.currentLocation),
  }),
);

// Optimized rentals table
export const rentals = createTable(
  "rental",
  {
    id: varchar("id", { length: 36 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    vehicleId: varchar("vehicle_id", { length: 36 })
      .notNull()
      .references(() => vehicles.id, { onDelete: "cascade" }),
    rentalStart: timestamp("rental_start").notNull(),
    rentalEnd: timestamp("rental_end").notNull(),
    status: rentalStatusEnum("status").notNull().default("pending"),
    totalPrice: integer("total_price").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),
    additionalCharges: jsonb("additional_charges").default(sql`'{}'::jsonb`),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("rental_user_idx").on(table.userId),
    vehicleIdx: index("rental_vehicle_idx").on(table.vehicleId),
    statusIdx: index("rental_status_idx").on(table.status),
    dateRangeIdx: index("rental_date_range_idx").on(
      table.rentalStart,
      table.rentalEnd,
    ),
  }),
);

export const payments = createTable(
  "payment",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    rentalId: varchar("rental_id", { length: 255 })
      .notNull()
      .references(() => rentals.id, { onDelete: "cascade" }),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("USD"),
    status: paymentStatusEnum("status").notNull().default("pending"),
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
    stripeClientSecret: varchar("stripe_client_secret", { length: 255 }),
    metadata: jsonb("metadata").default(sql`'{}'::jsonb`),
    paymentDate: timestamp("payment_date", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    rentalIdx: index("payment_rental_idx").on(table.rentalId),
    userIdx: index("payment_user_idx").on(table.userId),
    statusIdx: index("payment_status_idx").on(table.status),
  }),
);

export const reviews = createTable(
  "review",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    businessId: varchar("business_id", { length: 255 })
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    rentalId: varchar("rental_id", { length: 255 })
      .notNull()
      .references(() => rentals.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    response: text("response"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    userIdx: index("review_user_idx").on(table.userId),
    businessIdx: index("review_business_idx").on(table.businessId),
    rentalIdx: index("review_rental_idx").on(table.rentalId),
    ratingIdx: index("review_rating_idx").on(table.rating),
  }),
);

export const faq = createTable(
  "faq",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    businessId: varchar("business_id", { length: 255 })
      .notNull()
      .references(() => businesses.id, { onDelete: "cascade" }),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    order: integer("order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    businessIdx: index("faq_business_idx").on(table.businessId),
    orderIdx: index("faq_order_idx").on(table.order),
  }),
);

// NextAuth tables
export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
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
      .references(() => users.id, { onDelete: "cascade" }),
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
export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  rentals: many(rentals),
  reviews: many(reviews),
  business: one(businesses, {
    fields: [users.id],
    references: [businesses.ownerId],
  }),
}));

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  owner: one(users, { fields: [businesses.ownerId], references: [users.id] }),
  faqs: many(faq),
  vehicles: many(vehicles),
  rentals: many(rentals),
  reviews: many(reviews),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  business: one(businesses, {
    fields: [vehicles.businessId],
    references: [businesses.id],
  }),
  rentals: many(rentals),
}));

export const rentalsRelations = relations(rentals, ({ one, many }) => ({
  user: one(users, { fields: [rentals.userId], references: [users.id] }),
  vehicle: one(vehicles, {
    fields: [rentals.vehicleId],
    references: [vehicles.id],
  }),
  payments: many(payments),
  review: one(reviews),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  rental: one(rentals, {
    fields: [payments.rentalId],
    references: [rentals.id],
  }),
  user: one(users, { fields: [payments.userId], references: [users.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  business: one(businesses, {
    fields: [reviews.businessId],
    references: [businesses.id],
  }),
  rental: one(rentals, {
    fields: [reviews.rentalId],
    references: [rentals.id],
  }),
}));

export const faqRelations = relations(faq, ({ one }) => ({
  business: one(businesses, {
    fields: [faq.businessId],
    references: [businesses.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
