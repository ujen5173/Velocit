export type VehicleType = "bicycle" | "bike" | "scooter" | "car" | "e-bike";

export type VehicleUse = "rental" | "sale" | "both";

export type VehicleStatus = "available" | "rented" | "sold" | "maintenance";

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  use: VehicleUse;
  price_per_hour?: number | null;
  price_per_day?: number | null;
  sale_price?: number | null;
  location: string;
  status: VehicleStatus;
  images: string[];
  features: Record<string, string | boolean>;
  created_at: string;
  updated_at: string;
}

export interface Slide {
  name: string;
  rating: number;
  slug: string;
  perDay: {
    bicycle: number;
  };
  satisfiedCustomers: number;
  address: string;
  images: string[];
  lonlat?: number[];
}
