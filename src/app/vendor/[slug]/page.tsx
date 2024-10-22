"use client";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Dot,
  ExternalLink,
  Globe,
  Heart,
  ListFilter,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { chakra_petch, nunito } from "~/app/utils/font";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

type VehicleType = "bicycle" | "bike" | "scooter" | "car" | "e-bike";

type VehicleUse = "rental" | "sale" | "both";

type VehicleStatus = "available" | "rented" | "sold" | "maintenance";

interface VehicleFeatures {
  gears?: string;
  frame_material?: string;
  brake_type?: string;
  engine_capacity?: string;
  fuel_type?: string;
  mileage?: string;
  transmission?: string;
  seating_capacity?: string;
  battery_range?: string;
  motor_power?: string;
  foldable?: boolean;
}

interface Vehicle {
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
  features: VehicleFeatures;
  created_at: string;
  updated_at: string;
}

const VendorPage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [imageOrientation, setImageOrientation] = useState<
    "horizontal" | "vertical"
  >("vertical");

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setImageOrientation("horizontal");
      } else {
        setImageOrientation("vertical");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const vendorDetail = {
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

  const vendorVehicles = [
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
      description:
        "Stylish and powerful scooter with a 300cc engine, perfect for city rides.",
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
      description:
        "Iconic motorcycle with a 350cc engine, ideal for long-distance rides.",
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
      description:
        "High-performance sports car with a V8 engine, offering a thrilling driving experience.",
      features: {
        engine_capacity: "5.0L V8",
        fuel_type: "Petrol",
        transmission: "Automatic",
        seating_capacity: "4",
      },
      created_at: "2024-10-05T11:30:00Z",
      updated_at: "2024-10-05T11:30:00Z",
    },
  ] as Vehicle[];

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 550) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [open, setOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  // Fetch disabled dates from API
  useEffect(() => {
    async function fetchDisabledDates() {
      // Replace with your actual API call
      const data = {
        disabledDates: ["2024-10-25", "2024-11-01", "2024-11-05"],
      };
      setDisabledDates(data.disabledDates.map((date) => parseISO(date)));
    }

    void fetchDisabledDates();
  }, []);

  // Custom CSS for disabling dates
  const isDisabled = (date: Date) => {
    return disabledDates.some(
      (disabledDate) => disabledDate.getTime() === date.getTime(),
    );
  };

  const getDayClassName = (date) => {
    if (isDisabled(date)) {
      return "bg-slate-200 text-foreground cursor-not-allowed"; // Light red for disabled dates
    }
    return "text-foreground";
  };

  return (
    <>
      <div className="h-20"></div>

      <Sheet open={open} onOpenChange={(e) => setOpen(e)}>
        <SheetContent className="m-4 h-auto overflow-hidden rounded-md p-0">
          <SheetHeader>
            <SheetTitle className="border-b border-border bg-slate-100 px-4 py-[0.80rem] text-base font-medium">
              Vehicle Details
            </SheetTitle>
          </SheetHeader>
          <div className="h-full w-full overflow-scroll">
            <div>
              <div className="p-4">
                <div className="mb-4">
                  {/* Thumbnail */}
                  <Carousel setApi={setApi} className="w-full">
                    <CarouselPrevious />
                    <CarouselNext />
                    <CarouselContent className="h-full">
                      {vendorDetail.shopImages.map((_, index) => (
                        <CarouselItem key={index} className="">
                          <Image
                            alt={`${vendorDetail.name}'s Images`}
                            width={950}
                            height={950}
                            layout="cover"
                            className="aspect-square rounded-lg object-cover"
                            key={index}
                            src={_}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  {/* Images */}
                  <div>
                    <Carousel
                      orientation={"horizontal"}
                      setApi={setApi}
                      className="w-full"
                    >
                      <CarouselContent className="max-h-[625px] px-4 pb-2">
                        {vendorVehicles[0]!.images.map((image, index) => (
                          <CarouselItem
                            key={index}
                            className="relative basis-auto px-1 pt-2"
                          >
                            <button className="flex size-20 items-center justify-center rounded-md border border-border hover:ring-2 hover:ring-secondary hover:ring-offset-2">
                              <Image
                                onClick={() => {
                                  api?.scrollTo(index);
                                }}
                                alt={`${vendorDetail.name}'s Images`}
                                width={350}
                                height={350}
                                layout="fixed"
                                className="size-14 cursor-pointer rounded-md object-cover md:aspect-square"
                                key={index}
                                src={image}
                              />
                            </button>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                </div>

                <div>
                  <h1
                    className={cn(
                      "mb-4 text-2xl font-medium",
                      chakra_petch.className,
                    )}
                  >
                    {vendorVehicles[0]!.brand} {vendorVehicles[0]!.model}
                  </h1>

                  <div className="mb-6 flex items-center gap-1">
                    <button className="cursor-default rounded-md bg-secondary px-2 py-[0.35rem] text-xs uppercase text-secondary-foreground shadow-md">
                      {vendorVehicles[0]!.type}
                    </button>
                    <Dot size={16} />
                    <button className="cursor-default rounded-md bg-tertiary px-2 py-[0.35rem] text-xs uppercase text-tertiary-foreground shadow-md">
                      {vendorVehicles[0]!.use}
                    </button>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <h6 className="text-base text-slate-600">Starting from</h6>
                    <div className="flex items-end gap-2">
                      <span
                        className={cn(
                          "text-2xl font-semibold",
                          nunito.className,
                        )}
                      >
                        रु {(vendorVehicles[0]!.price_per_hour ?? 1) * 65}{" "}
                        <span className="text-base font-normal">/day</span>
                      </span>
                    </div>
                  </div>

                  {/* features of the vehicle in a structured key value table*/}
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-medium text-slate-600">
                      Features of {vendorVehicles[0]!.brand}{" "}
                      {vendorVehicles[0]!.model}
                    </h3>
                    <table className="w-full rounded-md">
                      <tbody className="overflow-hidden rounded-md">
                        {Object.entries(vendorVehicles[0]!.features).map(
                          ([key, value], index) => (
                            <tr
                              key={index}
                              className={cn(
                                "flex border border-border",
                                index ===
                                  Object.keys(vendorVehicles[0]!.features)
                                    .length -
                                    1
                                  ? ""
                                  : "border-b-0",
                              )}
                            >
                              <td className="w-10/12 bg-slate-100 p-2 text-base font-semibold text-slate-600">
                                {key}
                              </td>
                              <td className="w-full p-2 text-base text-slate-800">
                                {value}
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Available Dates */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-slate-600">
                        Available Dates
                      </h3>
                      <span className="text-sm text-red-600 underline">
                        Book for {format(selectedDate, "dd, MMM")}
                      </span>
                    </div>

                    <div className={cn(nunito.className)}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()} // No previous dates allowed
                        dayClassName={(date) => getDayClassName(date)} // Apply custom styles
                        filterDate={(date) => !isDisabled(date)} // Disable specific dates
                        inline // Always keep the date picker open
                        // ClassNames:::
                        className="w-full bg-white p-4 shadow-lg"
                        calendarClassName="w-full"
                        renderCustomHeader={({
                          date,
                          decreaseMonth,
                          increaseMonth,
                        }) => (
                          <div
                            className={cn(
                              "flex w-full items-center justify-between bg-white py-2",
                            )}
                          >
                            <span className="inline-block space-x-1">
                              <span className="text-base font-semibold text-foreground">
                                {format(date as Date, "MMMM")}
                              </span>
                              <span className="text-base font-normal text-foreground">
                                {format(date as Date, "yyyy")}
                              </span>
                            </span>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => {
                                  void decreaseMonth();
                                }}
                                variant={"outline"}
                                size={"icon"}
                              >
                                <ChevronLeft
                                  size={16}
                                  className="text-slate-700"
                                />
                              </Button>
                              <Button
                                onClick={() => {
                                  void increaseMonth();
                                }}
                                variant={"outline"}
                                size={"icon"}
                              >
                                <ChevronRight
                                  size={16}
                                  className="text-slate-700"
                                />
                              </Button>
                            </div>
                          </div>
                        )}
                        weekDayClassName={() =>
                          cn("w-full text-foreground", nunito.className)
                        }
                        formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-16"></div>
              <div className="absolute bottom-0 flex w-full items-stretch justify-between gap-2 border-t border-border bg-white px-4 py-2">
                <div className="">
                  <Button
                    variant={"outline"}
                    size="icon"
                    className={cn("h-full w-12")}
                  >
                    <Bookmark size={18} className="text-slate-700" />
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="flex h-full w-full overflow-hidden rounded-md border border-border">
                    <input
                      className="w-full px-4 text-center text-lg font-semibold text-slate-700 outline-none"
                      min={1}
                      defaultValue={1}
                      readOnly
                      type="text"
                    />
                    <div className="flex flex-col border-l border-border">
                      <button className="flex flex-1 items-center justify-center px-1">
                        <ChevronUp size={18} className="text-slate-600" />
                      </button>
                      <Separator />
                      <button className="flex flex-1 items-center justify-center px-1">
                        <ChevronDown size={18} className="text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <Button className="w-full" variant="primary">
                    Reserve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <main className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 right-4"
        >
          <Button className="share-button w-full" variant={"outline"}>
            <ExternalLink size={16} className="mr-2" />
            Share
          </Button>
        </motion.div>

        {/* Vendor Details */}
        <section className="mx-auto max-w-[1240px] px-4">
          <div className="flex flex-col gap-5 py-6 md:flex-row md:py-10 lg:gap-10">
            <div className="mx-auto flex w-full flex-col-reverse gap-2 sm:w-10/12 md:w-7/12 lg:flex-row">
              <div>
                <Carousel
                  orientation={imageOrientation}
                  setApi={setApi}
                  className="w-full"
                >
                  <CarouselContent className="max-h-[625px] py-2">
                    {vendorDetail.shopImages.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="relative basis-auto px-1 pt-2"
                      >
                        {/* <div className="absolute z-20 aspect-square bg-slate-900/10"></div> */}
                        <button className="rounded-md hover:ring-2 hover:ring-secondary hover:ring-offset-2">
                          <Image
                            onClick={() => {
                              api?.scrollTo(index);
                            }}
                            alt={`${vendorDetail.name}'s Images`}
                            width={450}
                            height={450}
                            layout="fixed"
                            className="size-16 cursor-pointer rounded-md object-cover md:aspect-square"
                            key={index}
                            src={image}
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              <div className="relative h-min lg:flex-1">
                <Carousel setApi={setApi} className="w-full">
                  <CarouselPrevious />
                  <CarouselNext />
                  <CarouselContent className="h-full">
                    {vendorDetail.shopImages.map((_, index) => (
                      <CarouselItem key={index} className="">
                        <Image
                          alt={`${vendorDetail.name}'s Images`}
                          width={950}
                          height={950}
                          layout="cover"
                          className="aspect-square rounded-lg object-cover"
                          key={index}
                          src={_}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="absolute right-2 top-2 hidden rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-slate-50">
                  Open
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="mb-2 flex items-center">
                <Link href="/" className="block">
                  <h6 className="text-sm font-medium uppercase text-green-600 underline">
                    {vendorDetail.location[0].address}
                  </h6>
                </Link>
              </div>

              <h1 className="mb-4 text-3xl font-bold">{vendorDetail.name}</h1>

              <div className="flex flex-1 flex-col justify-between">
                <div className="mb-4 flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-500 stroke-yellow-500"
                    />
                    <span className="text-sm">
                      {vendorDetail.rating} ({vendorDetail.ratingCount})
                    </span>
                  </div>
                  <Dot size={16} />
                  <div className="flex items-center gap-1">
                    <Phone size={16} className="text-foreground" />
                    <span className="text-sm">
                      {vendorDetail.phoneNumbers[0]}
                    </span>
                  </div>
                  <Dot size={16} />
                  <div className="flex items-center gap-1">
                    <Globe size={16} className="text-foreground" />
                    <span className="text-sm">Website</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-base font-medium text-slate-600">
                    Available Vehicles
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex size-20 flex-col items-center justify-between rounded-md bg-slate-100 p-2">
                      <Image
                        alt="Vechile"
                        width={100}
                        height={100}
                        className="size-12 object-cover"
                        src={"/images/vehicle/bicycle.png"}
                      />
                      <span className="text-xs">Bicycle</span>
                    </div>
                    <div className="flex size-20 flex-col items-center justify-between rounded-md bg-slate-100 p-2">
                      <Image
                        alt="Vechile"
                        width={100}
                        height={100}
                        className="size-12 object-cover"
                        src={"/images/vehicle/bike.png"}
                      />
                      <span className="text-xs">Bike</span>
                    </div>
                    <div className="flex size-20 flex-col items-center justify-between rounded-md bg-slate-100 p-2">
                      <Image
                        alt="Vechile"
                        width={100}
                        height={100}
                        className="size-9 object-cover"
                        src={"/images/vehicle/scooter.png"}
                      />
                      <span className="text-xs">Scooter</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between gap-6">
                    <h3 className="text-xl font-bold text-slate-600">
                      Business Hours
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-red-600 underline">
                        Closed
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(vendorDetail.businessHours).map(
                      ([key, value], index) => (
                        <div key={index}>
                          <h6 className="text-sm font-medium capitalize">
                            {key}
                          </h6>
                          <p className="text-sm text-slate-600">
                            {value.open} - {value.close}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="">
                    <Button className="w-full" variant={"primary"}>
                      Book a Call
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      className="w-full border-secondary text-secondary"
                      variant={"outline"}
                    >
                      <Heart size={16} className="mr-2" />
                      Add to Favroite
                    </Button>
                    <Button className="w-full" variant={"outline"}>
                      <ExternalLink size={16} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicles */}
        <section className="bg-slate-50 px-4 py-6 sm:py-10 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 flex items-center justify-between gap-10">
              <h1
                className={cn("text-4xl font-semibold", chakra_petch.className)}
              >
                Pick Your Ride
              </h1>
              <Button variant={"outline"} className="hover:bg-slate-50">
                <ListFilter size={16} className="mr-2" />
                <span>Filter</span>
              </Button>
            </div>

            <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {vendorVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setOpen(true)}
                  className="flex flex-col gap-2"
                >
                  <div className="relative flex items-center justify-center">
                    <Image
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      width={450}
                      height={450}
                      layout="fixed"
                      className="h-60 w-auto max-w-full rounded-md object-cover mix-blend-multiply"
                      src={vehicle.images[0]!}
                    />
                    <div className="absolute right-2 top-2 hidden rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-slate-50">
                      {vehicle.status}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <div className="mb-4 flex items-center gap-2">
                      <Star
                        size={16}
                        className="fill-yellow-500 stroke-yellow-500"
                      />
                      <span className="text-sm">
                        {vendorDetail.rating} ({vendorDetail.ratingCount})
                      </span>
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm uppercase text-slate-600">
                        Starting at
                      </h4>
                      <div className="flex items-end gap-2">
                        <span
                          className={cn(
                            "text-xl font-semibold",
                            nunito.className,
                          )}
                        >
                          रु {(vehicle.price_per_hour ?? 1) * 65}{" "}
                          <span className="text-base font-normal">/day</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </section>

        {/* Accessories */}
        <section className="px-4 py-6 sm:py-10 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 flex items-center justify-between gap-10">
              <h1
                className={cn("text-4xl font-semibold", chakra_petch.className)}
              >
                Accessories
              </h1>
              <Button variant={"outline"} className="hover:bg-slate-50">
                <ListFilter size={16} className="mr-2" />
                <span>Filter</span>
              </Button>
            </div>

            <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {vendorVehicles.slice(0, 7).map((vehicle, index) => (
                <div key={vehicle.id} className="flex flex-col gap-2">
                  <div className="relative flex items-center justify-center">
                    <Image
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      width={450}
                      height={450}
                      layout="fixed"
                      className="h-60 w-auto max-w-full rounded-md object-cover mix-blend-multiply"
                      src={vehicle.images[0]!.split("img")[0]!.concat(
                        `img${index + 1 + 10}.jpg`,
                      )}
                    />
                    <div className="absolute right-2 top-2 hidden rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-slate-50">
                      {vehicle.status}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-slate-600">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <div className="mb-4 flex items-center">
                      <div className="ga-2 flex items-center">
                        <Star
                          size={16}
                          className="fill-yellow-500 stroke-yellow-500"
                        />
                        <span className="text-sm">
                          {vendorDetail.rating} ({vendorDetail.ratingCount})
                        </span>
                      </div>
                      <div className="ga-2 flex items-center">
                        <Dot size={16} />
                        <span className="text-sm">
                          {vendorDetail.ratingCount * 100}+ Items Sold
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm uppercase text-slate-600">
                        Starting at
                      </h4>
                      <div className="flex items-end gap-2">
                        <span
                          className={cn(
                            "text-xl font-semibold",
                            nunito.className,
                          )}
                        >
                          रु {(vehicle.price_per_hour ?? 1) * 65}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </section>

        {/* Faqs */}
        <section className="bg-slate-50 px-4 py-6 sm:py-10 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10">
              <h1
                className={cn(
                  "mb-4 text-4xl font-semibold",
                  chakra_petch.className,
                )}
              >
                Frequently Asked Questions (FAQs)
              </h1>
              <p className="lg:7/12 w-full text-lg text-slate-600 md:w-9/12">
                Have questions? Check out our FAQ section for quick answers to
                the most common inquiries. We&apos;ve got you covered!
              </p>
            </div>

            <div>
              <Accordion type="multiple">
                {vendorDetail.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-white px-4 py-6 sm:py-10 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10">
              <h1
                className={cn(
                  "mb-4 text-4xl font-semibold",
                  chakra_petch.className,
                )}
              >
                Visit Us
              </h1>
              <p className="lg:7/12 w-full text-lg text-slate-600 md:w-9/12">
                Visit us at one of our conveniently located branches for quick
                and personalized service. Find the nearest location below, and
                drop by for a seamless experience catered to your needs.
              </p>
            </div>
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-md border border-border bg-white">
                  <MapPin size={25} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-base text-foreground">
                    Locations (<span className="underline">2</span>)
                  </p>
                  <p className="text-base text-foreground">
                    {vendorDetail.location
                      .map((location) => location.address)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex size-14 items-center justify-center rounded-md border border-border bg-white">
                  <Phone size={25} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-base text-foreground">Phone Number</p>
                  <p className="text-base text-foreground">
                    {vendorDetail.phoneNumbers.join(", ")}
                  </p>
                </div>
              </div>
              {Object.values(vendorDetail.socials).length > 1 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex justify-start gap-4">
                      <div className="flex size-14 items-center justify-center rounded-md border border-border bg-white">
                        <Globe size={25} className="text-slate-600" />
                      </div>
                      <div className="text-left">
                        <p className="text-base text-foreground">Socials</p>
                        <p className="text-base text-foreground">
                          @epicmountainbike
                        </p>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-screen max-w-72">
                    <DropdownMenuItem>Facebook</DropdownMenuItem>
                    <DropdownMenuItem>Instagram</DropdownMenuItem>
                    <DropdownMenuItem>Website</DropdownMenuItem>
                    <DropdownMenuItem>Twitter</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="flex size-14 items-center justify-center rounded-md border border-border bg-white">
                    <Globe size={25} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-base text-foreground">Socials</p>
                    <p className="text-base text-foreground">
                      @epicmountainbike
                    </p>
                  </div>
                </div>
              )}
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d16874.946912213625!2d85.310581!3d27.678682!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1834531badcd%3A0x330b0c2fcb7ce7e!2sEpic%20Mountain%20Bike!5e1!3m2!1sen!2snp!4v1729510884714!5m2!1sen!2snp"
              className="h-[40rem] w-full rounded-md border-none"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
    </>
  );
};

export default VendorPage;
