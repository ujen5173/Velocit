ALTER TYPE "user_role" ADD VALUE 'USER';--> statement-breakpoint
ALTER TYPE "user_role" ADD VALUE 'VENDOR';--> statement-breakpoint
ALTER TABLE "VehicleRental_user" RENAME COLUMN "profile" TO "image";--> statement-breakpoint
DROP INDEX IF EXISTS "vehicle_availability_idx";--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "owner_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "rating" SET DATA TYPE numeric(3, 2);--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "rating" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "stripe_account_id" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_business" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "user_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "vehicle_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "rental_start" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "rental_end" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_rental" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "email" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "email_verified" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "role" SET DEFAULT 'USER';--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "stripe_customer_id" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_user" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "business_id" SET DATA TYPE varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "make" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "model" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ADD COLUMN "last_maintenance_date" timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ADD COLUMN "next_maintenance_date" timestamp;--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ADD COLUMN "current_rental_id" varchar(36);--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ADD COLUMN "availability_schedule" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ADD COLUMN "current_location" jsonb;--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ADD COLUMN "mileage" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "VehicleRental_vehicle" ADD COLUMN "status" varchar(20) DEFAULT 'available' NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "business_rating_idx" ON "VehicleRental_business" USING btree ("rating","rating_count");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "vehicle_location_idx" ON "VehicleRental_vehicle" USING btree ("current_location");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "vehicle_availability_idx" ON "VehicleRental_vehicle" USING btree ("is_available","status","business_id");