"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { bricolage } from "~/app/utils/font";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import VendorCard from "./VendorCard";

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
  lonlat?: [number, number];
}

const slides: Slide[] = [
  {
    name: "Bike Farm Nepal",
    slug: "bike-farm-nepal",
    rating: 4.5,
    perDay: {
      bicycle: 100,
    },
    satisfiedCustomers: 200,
    address: "Kathmandu, Nepal",
    images: [
      "/images/shops/img1.jpg",
      "/images/shops/img3.jpg",
      "/images/shops/img2.jpg",
      "/images/shops/img4.jpg",
    ],
  },
  {
    name: "Epic Mountain Bike",
    slug: "epic-mountian-bike",
    rating: 4.8,
    perDay: {
      bicycle: 120,
    },
    satisfiedCustomers: 350,
    address: "Pokhara, Nepal",
    images: [
      "/images/shops/img2.jpg",
      "/images/shops/img1.jpg",
      "/images/shops/img4.jpg",
      "/images/shops/img3.jpg",
    ],
  },
  {
    name: "Saddle Bike Store",
    slug: "saddle-bike-store",
    rating: 4.3,
    perDay: {
      bicycle: 110,
    },
    satisfiedCustomers: 180,
    address: "Bhaktapur, Nepal",
    images: ["/images/shops/img1.jpg", "/images/shops/img3.jpg"],
  },
  {
    name: "Himalayan Single Track",
    slug: "himalayan-single-track",
    rating: 4.7,
    perDay: {
      bicycle: 150,
    },
    satisfiedCustomers: 400,
    address: "Kathmandu, Nepal",
    images: ["/images/shops/img4.jpg"],
  },
  {
    name: "B.B Cycle Center",
    slug: "bb-cycle-center",
    rating: 4.5,
    perDay: {
      bicycle: 100,
    },
    satisfiedCustomers: 200,
    address: "Kathmandu, Nepal",
    images: [
      "/images/shops/img1.jpg",
      "/images/shops/img3.jpg",
      "/images/shops/img2.jpg",
      "/images/shops/img4.jpg",
    ],
  },
];

const ShopsAround = () => {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2
            className={cn(
              "text-2xl font-bold xs:text-3xl",
              bricolage.className,
            )}
          >
            Popular Shops
          </h2>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={current === 0}
              className="size-10 border border-border bg-white"
            >
              <ChevronLeft size={20} className="text-foreground" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={current === count - 1}
              className="size-10 border border-border bg-white"
            >
              <ChevronRight size={20} className="text-foreground" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{ align: "start" }}
          >
            <CarouselContent>
              {slides.map((shop, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full space-y-4 xs:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <VendorCard shop={shop} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <Button variant="outline">Explore all Rental Shops</Button>
        </div>
      </div>
    </section>
  );
};

export default ShopsAround;
