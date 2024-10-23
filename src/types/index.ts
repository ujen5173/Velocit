export type VehicleType = "bicycle" | "bike" | "scooter" | "car" | "e-bike";

export type VehicleUse = "rental" | "sale" | "both";

export type VehicleStatus = "available" | "rented" | "sold" | "maintenance";

// interface VehicleFeatures {
//   gears?: string;
//   frame_material?: string;
//   brake_type?: string;
//   engine_capacity?: string;
//   fuel_type?: string;
//   mileage?: string;
//   transmission?: string;
//   seating_capacity?: string;
//   battery_range?: string;
//   motor_power?: string;
//   foldable?: boolean;
// }

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

export const vendorDetail = {
  id: "1",
  ownerId: "1",
  name: "Epic Mountain Bike Nepal",
  location: [
    {
      address: "Jhamsikhel Rd",
      city: "Kathmandu",
      state: "Bagmati",
      zip: "44600",
    },
    {
      address: "Gwarko, Lalitpur",
      city: "Kathmandu",
      state: "Bagmati",
      zip: "44600",
    },
  ],
  socials: {
    // facebook: "https://www.facebook.com/epicmountainbike",
    // instagram: "https://www.instagram.com/epicmountainbike",
    // twitter: "https://www.twitter.com/epicmountainbike",
    website: "https://www.epicmountainbike.com",
  },
  phoneNumbers: ["9812345678", "9812345679"],
  businessHours: {
    monday: {
      open: "9:00",
      close: "17:00",
    },
    tuesday: {
      open: "9:00",
      close: "17:00",
    },
    wednesday: {
      open: "9:00",
      close: "17:00",
    },
    thursday: {
      open: "9:00",
      close: "17:00",
    },
    friday: {
      open: "9:00",
      close: "17:00",
    },
    saturday: {
      open: "9:00",
      close: "17:00",
    },
    sunday: {
      open: "9:00",
      close: "17:00",
    },
  },
  rating: 4.5,
  ratingCount: 67,
  bannerImage: "/images/background-pattern.jpg",
  logoImage: "/images/vendor/logo.jpg",
  shopImages: [
    "/images/shops/img-1.jpg",
    "/images/shops/img-2.jpg",
    "/images/shops/img-3.jpg",
    "/images/shops/img-4.jpg",
    "/images/shops/img-2.jpg",
  ],
  longRidesAvailable: true,
  faqs: [
    {
      question: "What documents do I need to rent a bike?",
      answer: "You just need a valid ID and a contact number to rent a bike.",
    },
    {
      question: "Is the bike insured during the rental period?",
      answer:
        "Yes, all our bikes come with basic insurance during the rental period.",
    },
    {
      question: "What happens if I return the bike late?",
      answer:
        "If the bike is returned late, an extra rental fee may apply based on how long the delay is.",
    },
    {
      question: "Are accessories included with the bike rental?",
      answer:
        "Yes, we provide basic accessories like helmets and locks for free with your bike rental.",
    },
    {
      question: "Can I customize or modify the bike?",
      answer:
        "No, we don't allow any modifications or changes to the bike during the rental period.",
    },
    {
      question: "What should I do if the bike gets damaged?",
      answer:
        "If the bike is damaged, please contact us immediately. You may be responsible for repair costs depending on the damage.",
    },
  ],
} as const;

export const vendorVehicles: Vehicle[] = [
  {
    id: "1f45a2d1-4c9b-4e8b-a348-9e15d3b2c1a2",
    type: "bicycle",
    brand: "Trek",
    model: "Domane SL 6",
    year: 2023,
    use: "rental",
    price_per_hour: 5.0,
    price_per_day: 25.0,
    sale_price: null,
    location: "Kathmandu, Nepal",
    status: "available",
    images: [
      "/images/vendor/vehicles/img1.jpg",
      "/images/vendor/vehicles/img2.jpg",
    ],
    features: {
      Gears: "22-speed",
      "Frame material": "Carbon",
      "Brake Type": "Disc",
    },
    created_at: "2024-10-01T10:15:00Z",
    updated_at: "2024-10-01T10:15:00Z",
  },
  {
    id: "e3a8f5d9-4bce-44e9-82ba-7cbce71e6f4b",
    type: "bike",
    brand: "Yamaha",
    model: "MT-15",
    year: 2022,
    use: "rental",
    price_per_hour: 10.0,
    price_per_day: 50.0,
    sale_price: null,
    location: "Pokhara, Nepal",
    status: "rented",
    images: [
      "/images/vendor/vehicles/img1.jpg",
      "/images/vendor/vehicles/img1.jpg",
    ],
    features: {
      engine_capacity: "155cc",
      fuel_type: "Petrol",
      mileage: "45 kmpl",
    },
    created_at: "2024-09-20T11:00:00Z",
    updated_at: "2024-09-25T12:30:00Z",
  },
  {
    id: "d9fa3f2a-123f-4569-bd1b-5d7c7e4d8a3b",
    type: "scooter",
    brand: "Honda",
    model: "Activa 6G",
    year: 2021,
    use: "rental",
    price_per_hour: 8.0,
    price_per_day: 40.0,
    sale_price: null,
    location: "Bhaktapur, Nepal",
    status: "available",
    images: ["/images/vendor/vehicles/img2.jpg"],
    features: {
      engine_capacity: "109cc",
      fuel_type: "Petrol",
      mileage: "55 kmpl",
    },
    created_at: "2024-08-15T09:45:00Z",
    updated_at: "2024-08-15T09:45:00Z",
  },
  {
    id: "3b54de4f-6d28-432f-973a-8c5f23b9a7f9",
    type: "car",
    brand: "Hyundai",
    model: "Creta",
    year: 2023,
    use: "rental",
    price_per_hour: 20.0,
    price_per_day: 120.0,
    sale_price: null,
    location: "Lalitpur, Nepal",
    status: "available",
    images: [
      "/images/vendor/vehicles/img3.jpg",
      "/images/vendor/vehicles/img3.jpg",
    ],
    features: {
      fuel_type: "Diesel",
      transmission: "Automatic",
      seating_capacity: "5",
    },
    created_at: "2024-09-05T14:20:00Z",
    updated_at: "2024-09-05T14:20:00Z",
  },
  {
    id: "4c16d2a1-beb7-4c5b-922d-6a84c543abc8",
    type: "e-bike",
    brand: "Lectric",
    model: "XP 3.0",
    year: 2023,
    use: "rental",
    price_per_hour: 7.0,
    price_per_day: 35.0,
    sale_price: null,
    location: "Lumbini, Nepal",
    status: "available",
    images: ["/images/vendor/vehicles/img4.jpg"],
    features: {
      battery_range: "45 miles",
      motor_power: "500W",
      foldable: true,
    },
    created_at: "2024-10-01T10:00:00Z",
    updated_at: "2024-10-01T10:00:00Z",
  },
  {
    id: "5a24b13e-948f-4d4c-a681-ea4e86569d8c",
    type: "bicycle",
    brand: "Giant",
    model: "Escape 3",
    year: 2022,
    use: "sale",
    price_per_hour: null,
    price_per_day: null,
    sale_price: 450.0,
    location: "Chitwan, Nepal",
    status: "available",
    images: ["/images/vendor/vehicles/img5.jpg"],
    features: {
      gears: "21-speed",
      frame_material: "Aluminum",
      brake_type: "V-brake",
    },
    created_at: "2024-09-15T08:30:00Z",
    updated_at: "2024-09-15T08:30:00Z",
  },
  {
    id: "6b75f1e2-9b1d-42b3-876b-4b84a9d8b9e7",
    type: "car",
    brand: "Toyota",
    model: "Corolla Altis",
    year: 2021,
    use: "both",
    price_per_hour: 15.0,
    price_per_day: 90.0,
    sale_price: 20000.0,
    location: "Butwal, Nepal",
    status: "available",
    images: ["/images/vendor/vehicles/img6.jpg"],
    features: {
      fuel_type: "Petrol",
      transmission: "Manual",
      seating_capacity: "5",
    },
    created_at: "2024-09-30T12:00:00Z",
    updated_at: "2024-09-30T12:00:00Z",
  },
  {
    id: "7e13b7c1-9b8d-4f7f-85b7-1cda0a948f7e",
    type: "scooter",
    brand: "Vespa",
    model: "GTS 300",
    year: 2022,
    use: "rental",
    price_per_hour: 12.0,
    price_per_day: 60.0,
    sale_price: null,
    location: "Kathmandu, Nepal",
    status: "available",
    images: [
      "/images/vendor/vehicles/img7.jpg",
      "/images/vendor/vehicles/img7.jpg",
    ],
    features: {
      engine_capacity: "300cc",
      fuel_type: "Petrol",
      mileage: "31 kmpl",
    },
    created_at: "2024-10-15T13:30:00Z",
    updated_at: "2024-10-15T13:30:00Z",
  },
  {
    id: "8b32f7c2-4c3f-4976-b5c6-124deea9a7f3",
    type: "bike",
    brand: "Royal Enfield",
    model: "Classic 350",
    year: 2021,
    use: "rental",
    price_per_hour: 15.0,
    price_per_day: 70.0,
    sale_price: null,
    location: "Pokhara, Nepal",
    status: "available",
    images: [
      "/images/vendor/vehicles/img10.jpg",
      "/images/vendor/vehicles/img10.jpg",
    ],
    features: {
      engine_capacity: "350cc",
      fuel_type: "Petrol",
      mileage: "40 kmpl",
    },
    created_at: "2024-09-10T10:45:00Z",
    updated_at: "2024-09-10T10:45:00Z",
  },
  {
    id: "9c43e9c3-543b-4d4c-99b1-2d89d8f8c7a5",
    type: "car",
    brand: "Ford",
    model: "Mustang GT",
    year: 2023,
    use: "both",
    price_per_hour: 40.0,
    price_per_day: 250.0,
    sale_price: 55000.0,
    location: "Lalitpur, Nepal",
    status: "available",
    images: [
      "/images/vendor/vehicles/img9.jpg",
      "/images/vendor/vehicles/img9.jpg",
    ],
    features: {
      engine_capacity: "5.0L V8",
      fuel_type: "Petrol",
      transmission: "Automatic",
      seating_capacity: "4",
    },
    created_at: "2024-10-05T11:30:00Z",
    updated_at: "2024-10-05T11:30:00Z",
  },
];
