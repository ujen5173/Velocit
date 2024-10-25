"use client";

import { Dot, MapIcon, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { type Slide } from "../_components/_/ShopsAround";
import { bricolage, chakra_petch } from "../utils/font";
import { HEADER_HEIGHT } from "../utils/helpers";
import MapArea from "./_components/MapArea";

const searchedData: Slide[] = [
  {
    name: "Mountain Biker's Haven",
    rating: 4.8,
    slug: "mountain-bikers-haven",
    perDay: {
      bicycle: 25,
    },
    satisfiedCustomers: 120,
    address: "123 Trail Way, Adventure City, AC 12345",
    images: [
      "/images/shops/img1.jpg",
      "/images/shops/img2.jpg",
      "/images/shops/img4.jpg",
    ],
    lonlat: [34.0522, -118.2437],
  },
  {
    name: "Urban Cycling Co.",
    rating: 4.5,
    slug: "urban-cycling-co",
    perDay: {
      bicycle: 15,
    },
    satisfiedCustomers: 95,
    address: "456 City Lane, Metropolis, MP 67890",
    images: [
      "/images/shops/img3.jpg",
      "/images/shops/img-1.jpg",
      "/images/shops/img-3.jpg",
    ],
    lonlat: [40.7128, -74.006],
  },
  {
    name: "Eco-Friendly Rentals",
    rating: 4.7,
    slug: "eco-friendly-rentals",
    perDay: {
      bicycle: 20,
    },
    satisfiedCustomers: 150,
    address: "789 Green St, Eco City, EC 54321",
    images: [
      "/images/shops/img-2.jpg",
      "/images/shops/img1.jpg",
      "/images/shops/img-4.jpg",
    ],
    lonlat: [37.7749, -122.4194],
  },
  {
    name: "Beachside Bikes",
    rating: 4.6,
    slug: "beachside-bikes",
    perDay: {
      bicycle: 30,
    },
    satisfiedCustomers: 80,
    address: "101 Ocean Blvd, Seaside Town, ST 98765",
    images: [
      "/images/shops/img4.jpg",
      "/images/shops/img3.jpg",
      "/images/shops/img2.jpg",
    ],
    lonlat: [36.7783, -119.4179],
  },
  {
    name: "Mountain Biker's Haven",
    rating: 4.8,
    slug: "mountain-bikers-haven",
    perDay: {
      bicycle: 25,
    },
    satisfiedCustomers: 120,
    address: "123 Trail Way, Adventure City, AC 12345",
    images: [
      "/images/shops/img1.jpg",
      "/images/shops/img2.jpg",
      "/images/shops/img4.jpg",
    ],
    lonlat: [34.0522, -118.2437],
  },
  {
    name: "Urban Cycling Co.",
    rating: 4.5,
    slug: "urban-cycling-co",
    perDay: {
      bicycle: 15,
    },
    satisfiedCustomers: 95,
    address: "456 City Lane, Metropolis, MP 67890",
    images: [
      "/images/shops/img3.jpg",
      "/images/shops/img-1.jpg",
      "/images/shops/img-3.jpg",
    ],
    lonlat: [40.7128, -74.006],
  },
  {
    name: "Eco-Friendly Rentals",
    rating: 4.7,
    slug: "eco-friendly-rentals",
    perDay: {
      bicycle: 20,
    },
    satisfiedCustomers: 150,
    address: "789 Green St, Eco City, EC 54321",
    images: [
      "/images/shops/img-2.jpg",
      "/images/shops/img1.jpg",
      "/images/shops/img-4.jpg",
    ],
    lonlat: [37.7749, -122.4194],
  },
  {
    name: "Beachside Bikes",
    rating: 4.6,
    slug: "beachside-bikes",
    perDay: {
      bicycle: 30,
    },
    satisfiedCustomers: 80,
    address: "101 Ocean Blvd, Seaside Town, ST 98765",
    images: [
      "/images/shops/img4.jpg",
      "/images/shops/img3.jpg",
      "/images/shops/img2.jpg",
    ],
    lonlat: [36.7783, -119.4179],
  },
  {
    name: "Mountain Biker's Haven",
    rating: 4.8,
    slug: "mountain-bikers-haven",
    perDay: {
      bicycle: 25,
    },
    satisfiedCustomers: 120,
    address: "123 Trail Way, Adventure City, AC 12345",
    images: [
      "/images/shops/img1.jpg",
      "/images/shops/img2.jpg",
      "/images/shops/img4.jpg",
    ],
    lonlat: [34.0522, -118.2437],
  },
  {
    name: "Urban Cycling Co.",
    rating: 4.5,
    slug: "urban-cycling-co",
    perDay: {
      bicycle: 15,
    },
    satisfiedCustomers: 95,
    address: "456 City Lane, Metropolis, MP 67890",
    images: [
      "/images/shops/img3.jpg",
      "/images/shops/img-1.jpg",
      "/images/shops/img-3.jpg",
    ],
    lonlat: [40.7128, -74.006],
  },
  {
    name: "Eco-Friendly Rentals",
    rating: 4.7,
    slug: "eco-friendly-rentals",
    perDay: {
      bicycle: 20,
    },
    satisfiedCustomers: 150,
    address: "789 Green St, Eco City, EC 54321",
    images: [
      "/images/shops/img-2.jpg",
      "/images/shops/img1.jpg",
      "/images/shops/img-4.jpg",
    ],
    lonlat: [37.7749, -122.4194],
  },
  {
    name: "Beachside Bikes",
    rating: 4.6,
    slug: "beachside-bikes",
    perDay: {
      bicycle: 30,
    },
    satisfiedCustomers: 80,
    address: "101 Ocean Blvd, Seaside Town, ST 98765",
    images: [
      "/images/shops/img4.jpg",
      "/images/shops/img3.jpg",
      "/images/shops/img2.jpg",
    ],
    lonlat: [36.7783, -119.4179],
  },
  {
    name: "Cycle Explorers",
    rating: 4.9,
    slug: "cycle-explorers",
    perDay: {
      bicycle: 28,
    },
    satisfiedCustomers: 200,
    address: "202 Adventure Rd, Explore City, EC 12345",
    images: [
      "/images/shops/img-1.jpg",
      "/images/shops/img-3.jpg",
      "/images/shops/img-2.jpg",
    ],
    lonlat: [34.0522, -118.2437],
  },
  {
    name: "City Cycle Rentals",
    rating: 4.4,
    slug: "city-cycle-rentals",
    perDay: {
      bicycle: 18,
    },
    satisfiedCustomers: 110,
    address: "303 Urban Ave, Downtown City, DC 87654",
    images: [
      "/images/shops/img4.jpg",
      "/images/shops/img-4.jpg",
      "/images/shops/img2.jpg",
    ],
    lonlat: [51.5074, -0.1278],
  },
  {
    name: "Adventure Bike Rentals",
    rating: 4.8,
    slug: "adventure-bike-rentals",
    perDay: {
      bicycle: 27,
    },
    satisfiedCustomers: 140,
    address: "404 Mountain Rd, Boulder Town, BT 34567",
    images: [
      "/images/shops/img1.jpg",
      "/images/shops/img-1.jpg",
      "/images/shops/img-2.jpg",
    ],
    lonlat: [39.7392, -104.9903],
  },
  {
    name: "Pedal Power",
    rating: 4.9,
    slug: "pedal-power",
    perDay: {
      bicycle: 22,
    },
    satisfiedCustomers: 175,
    address: "505 Pedal St, Cyclersville, CY 65432",
    images: [
      "/images/shops/img-3.jpg",
      "/images/shops/img4.jpg",
      "/images/shops/img3.jpg",
    ],
    lonlat: [48.8566, 2.3522],
  },
  {
    name: "Eco Pedals",
    rating: 4.7,
    slug: "eco-pedals",
    perDay: {
      bicycle: 20,
    },
    satisfiedCustomers: 165,
    address: "606 Eco Dr, Green City, GC 43210",
    images: [
      "/images/shops/img2.jpg",
      "/images/shops/img-4.jpg",
      "/images/shops/img1.jpg",
    ],
    lonlat: [52.52, 13.405],
  },
  {
    name: "BikeTime Rentals",
    rating: 4.6,
    slug: "biketime-rentals",
    perDay: {
      bicycle: 19,
    },
    satisfiedCustomers: 130,
    address: "707 Speed Ave, Fast City, FC 76543",
    images: [
      "/images/shops/img-2.jpg",
      "/images/shops/img-3.jpg",
      "/images/shops/img1.jpg",
    ],
    lonlat: [55.7558, 37.6173],
  },
  {
    name: "Tour de Cycle",
    rating: 4.5,
    slug: "tour-de-cycle",
    perDay: {
      bicycle: 21,
    },
    satisfiedCustomers: 115,
    address: "808 Cycle Way, Ride City, RC 87654",
    images: [
      "/images/shops/img3.jpg",
      "/images/shops/img1.jpg",
      "/images/shops/img4.jpg",
    ],
    lonlat: [41.9028, 12.4964],
  },
  {
    name: "Urban Wheelers",
    rating: 4.7,
    slug: "urban-wheelers",
    perDay: {
      bicycle: 26,
    },
    satisfiedCustomers: 190,
    address: "909 Downtown Blvd, Big City, BC 76543",
    images: [
      "/images/shops/img-4.jpg",
      "/images/shops/img2.jpg",
      "/images/shops/img-2.jpg",
    ],
    lonlat: [35.6895, 139.6917],
  },
];

const Search = () => {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [showingArea, setShowingArea] = useState<"places" | "map" | "both">(
    "places",
  );

  useEffect(() => {
    const handleResize = () => {
      setShowingArea(window.innerWidth < 1024 ? "places" : "both");
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={HEADER_HEIGHT}></div>
      <section className="relative w-full">
        <div className="fixed bottom-4 left-1/2 z-[100] block -translate-x-1/2 lg:hidden">
          <Button
            onClick={() =>
              setShowingArea(showingArea === "places" ? "map" : "places")
            }
            variant={"primary"}
            rounded={"full"}
          >
            <MapIcon size={18} />
            <span className="ml-2">
              {showingArea === "places" ? "Show Map" : "Show List"}
            </span>
          </Button>
        </div>

        <div className={cn("relative flex")}>
          <div
            className={cn(
              "max-w-none overflow-auto border-r border-border lg:max-w-[600px] xl:max-w-[932px]",
              showingArea === "map" ? "hidden" : "block w-full",
              showingArea === "both" ? "block" : "",
              "px-8 py-4 md:p-4",
            )}
          >
            {/* Keep the original content as is */}
            <div className="mb-2">
              <span
                className={cn(
                  "text-base font-medium text-foreground",
                  chakra_petch.className,
                )}
              >
                {searchedData.length} Results found in visible area
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {searchedData.map((shop) => (
                <div
                  className={cn("relative", chakra_petch.className)}
                  key={shop.slug}
                >
                  <div className={"relative"}>
                    <Carousel setApi={setApi} className="w-full">
                      <CarouselPrevious />
                      <CarouselNext />
                      <CarouselContent className="">
                        {shop.images.map((image, index) => (
                          <CarouselItem key={index} className="relative pt-2">
                            <Image
                              onClick={() => api?.scrollTo(index)}
                              alt={`${shop.name}'s Images`}
                              width={450}
                              height={450}
                              layout="fixed"
                              className="aspect-[4/3] cursor-pointer rounded-md object-cover"
                              src={image}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>

                  <Link href={`/vendor/${shop.slug}`}>
                    <div className="pt-4">
                      <h1
                        className={cn(
                          "mb-2 line-clamp-1 text-lg font-medium",
                          chakra_petch.className,
                        )}
                      >
                        {shop.name}
                      </h1>
                      <div className="select-none">
                        <div className="mb-4 flex items-center">
                          <div className="flex items-center gap-1">
                            <Star
                              size={18}
                              className="fill-yellow-500 stroke-yellow-500"
                            />
                            <span className="text-sm">{shop.rating}</span>
                          </div>
                          <Dot size={18} />
                          <div className="flex items-center gap-1">
                            <MapPin size={18} />
                            <span className="line-clamp-1 text-sm">
                              {shop.address}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-1 text-sm uppercase">
                            Starting At
                          </h4>
                          <h1
                            className={cn(
                              "text-2xl font-semibold",
                              bricolage.className,
                            )}
                          >
                            रु {shop.perDay.bicycle}{" "}
                            <span className="text-base font-normal">/day</span>
                          </h1>
                        </div>
                        <Separator className="mt-2 h-[2px] bg-border" />
                        <div className="py-2">
                          <span className="text-sm">
                            {shop.satisfiedCustomers}+ satisfied customers
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div
            className={cn(
              "relative z-40 h-auto min-h-[calc(100vh-64px)] flex-1 md:min-h-[calc(100vh-80px)]",
              showingArea === "places" ? "hidden" : "block",
              showingArea === "both" ? "block" : "",
            )}
          >
            <div className="sticky inset-0 left-0 top-[64px] h-[calc(100vh-64px)] md:top-[80px] md:h-[calc(100vh-80px)]">
              <MapArea />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
