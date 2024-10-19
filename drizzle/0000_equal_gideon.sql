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
 CREATE TYPE "public"."user_role" AS ENUM('user', 'shop_owner', 'admin');
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
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"owner_id" varchar(255) NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" text,
	"location" jsonb NOT NULL,
	"phone_numbers" varchar(20)[] DEFAULT '{}'::varchar[] NOT NULL,
	"business_hours" jsonb NOT NULL,
	"rating" integer DEFAULT 0,
	"rating_count" integer DEFAULT 0,
	"banner_image" text,
	"logo_image" text,
	"shop_images" text[] DEFAULT '{}'::text[],
	"long_rides_available" boolean DEFAULT true NOT NULL,
	"stripe_account_id" varchar(255),
	"features" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_faq" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"business_id" varchar(255) NOT NULL,
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
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"vehicle_id" varchar(255) NOT NULL,
	"rental_start" timestamp with time zone NOT NULL,
	"rental_end" timestamp with time zone NOT NULL,
	"status" "rental_status" DEFAULT 'pending' NOT NULL,
	"total_price" integer NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"additional_charges" jsonb DEFAULT '{}'::jsonb,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_review" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"business_id" varchar(255) NOT NULL,
	"rental_id" varchar(255) NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"response" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone,
	"profile_url" varchar(255),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"stripe_customer_id" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VehicleRental_vehicle" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"business_id" varchar(255) NOT NULL,
	"name" varchar(256) NOT NULL,
	"type" "vehicle_type" NOT NULL,
	"make" varchar(100),
	"model" varchar(100),
	"year" integer,
	"images" text[] DEFAULT '{}'::text[] NOT NULL,
	"base_price" integer NOT NULL,
	"currency" varchar(3) DEFAULT 'USD' NOT NULL,
	"discounted_price" integer,
	"is_available" boolean DEFAULT true NOT NULL,
	"features" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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
 ALTER TABLE "VehicleRental_review" ADD CONSTRAINT "VehicleRental_review_user_id_VehicleRental_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."VehicleRental_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_review" ADD CONSTRAINT "VehicleRental_review_business_id_VehicleRental_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."VehicleRental_business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VehicleRental_review" ADD CONSTRAINT "VehicleRental_review_rental_id_VehicleRental_rental_id_fk" FOREIGN KEY ("rental_id") REFERENCES "public"."VehicleRental_rental"("id") ON DELETE cascade ON UPDATE no action;
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
CREATE INDEX IF NOT EXISTS "faq_business_idx" ON "VehicleRental_faq" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "faq_order_idx" ON "VehicleRental_faq" USING btree ("order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_rental_idx" ON "VehicleRental_payment" USING btree ("rental_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_user_idx" ON "VehicleRental_payment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_status_idx" ON "VehicleRental_payment" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_user_idx" ON "VehicleRental_rental" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_vehicle_idx" ON "VehicleRental_rental" USING btree ("vehicle_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_status_idx" ON "VehicleRental_rental" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "rental_date_range_idx" ON "VehicleRental_rental" USING btree ("rental_start","rental_end");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "review_user_idx" ON "VehicleRental_review" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "review_business_idx" ON "VehicleRental_review" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "review_rental_idx" ON "VehicleRental_review" USING btree ("rental_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "review_rating_idx" ON "VehicleRental_review" USING btree ("rating");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "VehicleRental_session" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_idx" ON "VehicleRental_user" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_role_idx" ON "VehicleRental_user" USING btree ("role");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "vehicle_business_idx" ON "VehicleRental_vehicle" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "vehicle_type_idx" ON "VehicleRental_vehicle" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "vehicle_availability_idx" ON "VehicleRental_vehicle" USING btree ("is_available");