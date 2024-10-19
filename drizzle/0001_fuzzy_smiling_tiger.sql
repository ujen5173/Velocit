ALTER TYPE "user_role" ADD VALUE 'vendor';--> statement-breakpoint
ALTER TABLE "VehicleRental_user" RENAME COLUMN "profile_url" TO "profile";