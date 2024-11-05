DO $$ BEGIN
 CREATE TYPE "public"."payment_status" AS ENUM('pending', 'processing', 'completed', 'failed', 'refunded');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."rental_status" AS ENUM('pending', 'approved', 'rejected', 'cancelled', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('USER', 'VENDOR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."vehicle_type" AS ENUM('bike', 'e-bike', 'scooter', 'e-scooter', 'car', 'e-car', 'others');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "VehicleRental_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_business" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"owner_id" varchar(36) NOT NULL,
	"name" varchar(100) NOT NULL,
	"location" jsonb NOT NULL,
	"phone_numbers" varchar(20)[] DEFAULT '{}'::varchar[] NOT NULL,
	"business_hours" jsonb NOT NULL,
	"rating" numeric(3, 2) DEFAULT '0',
	"rating_count" integer DEFAULT 0,
	"available_vehicle_types" vehicle_type[] DEFAULT '{}'::vehicle_type[],
	"logo" text,
	"shop_images" text[] DEFAULT '{}'::text[],
	"rental_accessories" varchar(100)[] DEFAULT '{}'::varchar[],
	"stripe_account_id" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_faq" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"business_id" varchar(36) NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_payment" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"rental_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"stripe_payment_intent_id" varchar(255),
	"stripe_client_secret" varchar(255),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"payment_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_rental" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"vehicle_id" varchar(36) NOT NULL,
	"business_id" varchar(36) NOT NULL,
	"rental_start" timestamp NOT NULL,
	"rental_end" timestamp NOT NULL,
	"number_of_vehicles" integer DEFAULT 1 NOT NULL,
	"status" "rental_status" DEFAULT 'pending' NOT NULL,
	"total_price" integer NOT NULL,
	"notes" text,
	"payment_screenshot" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_user" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(100) NOT NULL,
	"email_verified" timestamp,
	"image" varchar(255),
	"role" "user_role" DEFAULT 'USER',
	"deleted" boolean DEFAULT false,
	"vendor_setup_complete" boolean DEFAULT false,
	"stripe_customer_id" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_vehicle" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"business_id" varchar(36) NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" "vehicle_type" NOT NULL,
	"images" text[] DEFAULT '{}'::text[] NOT NULL,
	"base_price" integer NOT NULL,
	"number_of_vehicles" integer DEFAULT 1 NOT NULL,
	"discounted_price" integer,
	"long_rides_available" boolean DEFAULT true NOT NULL,
	"unavailability_dates" timestamp[] DEFAULT '{}'::timestamp[] NOT NULL,
	"mileage" integer DEFAULT 0,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"features" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "VehicleRental_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_account" ADD CONSTRAINT "VehicleRental_account_user_id_VehicleRental_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."VehicleRental_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_business" ADD CONSTRAINT "VehicleRental_business_owner_id_VehicleRental_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."VehicleRental_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_faq" ADD CONSTRAINT "VehicleRental_faq_business_id_VehicleRental_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."VehicleRental_business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_payment" ADD CONSTRAINT "VehicleRental_payment_rental_id_VehicleRental_rental_id_fk" FOREIGN KEY ("rental_id") REFERENCES "public"."VehicleRental_rental"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_payment" ADD CONSTRAINT "VehicleRental_payment_user_id_VehicleRental_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."VehicleRental_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_rental" ADD CONSTRAINT "VehicleRental_rental_user_id_VehicleRental_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."VehicleRental_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_rental" ADD CONSTRAINT "VehicleRental_rental_vehicle_id_VehicleRental_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."VehicleRental_vehicle"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_rental" ADD CONSTRAINT "VehicleRental_rental_business_id_VehicleRental_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."VehicleRental_business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_session" ADD CONSTRAINT "VehicleRental_session_user_id_VehicleRental_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."VehicleRental_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_vehicle" ADD CONSTRAINT "VehicleRental_vehicle_business_id_VehicleRental_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."VehicleRental_business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "VehicleRental_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "business_name_idx" ON "VehicleRental_business" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "business_owner_idx" ON "VehicleRental_business" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "business_location_idx" ON "VehicleRental_business" USING btree ("location");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "business_rating_idx" ON "VehicleRental_business" USING btree ("rating","rating_count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faq_business_idx" ON "VehicleRental_faq" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faq_order_idx" ON "VehicleRental_faq" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_rental_idx" ON "VehicleRental_payment" USING btree ("rental_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_user_idx" ON "VehicleRental_payment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_status_idx" ON "VehicleRental_payment" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_user_idx" ON "VehicleRental_rental" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_vehicle_idx" ON "VehicleRental_rental" USING btree ("vehicle_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_business_idx" ON "VehicleRental_rental" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_status_idx" ON "VehicleRental_rental" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_date_range_idx" ON "VehicleRental_rental" USING btree ("rental_start","rental_end");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "VehicleRental_session" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_idx" ON "VehicleRental_user" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_role_idx" ON "VehicleRental_user" USING btree ("role");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "vehicle_business_idx" ON "VehicleRental_vehicle" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "vehicle_type_idx" ON "VehicleRental_vehicle" USING btree ("type");