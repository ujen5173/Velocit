"use client";

import { ChevronLeft, ChevronRight, Dot, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { nunito } from "~/app/utils/font";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

interface Slide {
  name: string;
  rating: number;
  perDay: {
    bicycle: number;
  };
  satisfiedCustomers: number;
  location: string;
  images: string[];
}

const slides: Slide[] = [
  {
    name: "Bike Farm Nepal",
    rating: 4.5,
    perDay: {
      bicycle: 100,
    },
    satisfiedCustomers: 200,
    location: "Kathmandu, Nepal",
    images: [
      "/images/shops/img1.jpg",
      "/images/shops/img3.jpg",
      "/images/shops/img2.jpg",
      "/images/shops/img4.jpg",
    ],
  },
  {
    name: "Epic Mountain Bike",
    rating: 4.8,
    perDay: {
      bicycle: 120,
    },
    satisfiedCustomers: 350,
    location: "Pokhara, Nepal",
    images: [
      "/images/shops/img2.jpg",
      "/images/shops/img1.jpg",
      "/images/shops/img4.jpg",
      "/images/shops/img3.jpg",
    ],
  },
  {
    name: "Saddle Bike Store",
    rating: 4.3,
    perDay: {
      bicycle: 110,
    },
    satisfiedCustomers: 180,
    location: "Bhaktapur, Nepal",
    images: ["/images/shops/img1.jpg", "/images/shops/img3.jpg"],
  },
  {
    name: "Himalayan Single Track",
    rating: 4.7,
    perDay: {
      bicycle: 150,
    },
    satisfiedCustomers: 400,
    location: "Kathmandu, Nepal",
    images: ["/images/shops/img4.jpg"],
  },
  {
    name: "B.B Cycle Center",
    rating: 4.5,
    perDay: {
      bicycle: 100,
    },
    satisfiedCustomers: 200,
    location: "Kathmandu, Nepal",
    images: [
      "/images/shops/img1.jpg",
      "/images/shops/img3.jpg",
      "/images/shops/img2.jpg",
      "/images/shops/img4.jpg",
    ],
  },
];

const ShopsAround = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<
    Record<number, number>
  >(slides.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {}));

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const handleImageNav = (shopIndex: number, direction: "prev" | "next") => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [shopIndex]:
        direction === "prev"
          ? Math.max(0, (prev[shopIndex] ?? 0) - 1)
          : Math.min(
              slides[shopIndex]!.images.length - 1,
              (prev[shopIndex] ?? 0) + 1,
            ),
    }));
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1200px] px-4 py-16">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className={cn("text-3xl font-bold", nunito.className)}>
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
                  className="xs:basis-1/2 basis-full space-y-4 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="relative">
                    <button
                      onClick={() => handleImageNav(index, "prev")}
                      className={cn(
                        "absolute left-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full border bg-white/80",
                        currentImageIndexes[index] === 0 && "opacity-50",
                      )}
                      disabled={currentImageIndexes[index] === 0}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => handleImageNav(index, "next")}
                      className={cn(
                        "absolute right-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full border bg-white/80",
                        currentImageIndexes[index] === shop.images.length - 1 &&
                          "opacity-50",
                      )}
                      disabled={
                        currentImageIndexes[index] === shop.images.length - 1
                      }
                    >
                      <ChevronRight size={18} />
                    </button>
                    <Image
                      width={800}
                      height={800}
                      className="aspect-[4/3] rounded-md object-cover"
                      src={shop.images[currentImageIndexes[index] ?? 0]!}
                      alt={`${shop.name}, ${shop.location}`}
                    />
                    {shop.images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                        {shop.images.map((_, imgIndex) => (
                          <div
                            key={imgIndex}
                            className={cn(
                              "size-2 rounded-full bg-white/80",
                              currentImageIndexes[index] === imgIndex
                                ? "opacity-100"
                                : "opacity-50",
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <h1 className="mb-2 line-clamp-1 text-lg font-medium">
                      {shop.name}
                    </h1>
                    <div className="mb-4 flex flex-wrap items-center">
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
                        <span className="text-sm">{shop.location}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm uppercase">Starting At</h4>
                      <h1
                        className={cn(
                          "text-2xl font-semibold",
                          nunito.className,
                        )}
                      >
                        रु {shop.perDay.bicycle}{" "}
                        <span className="text-base font-normal">/day</span>
                      </h1>
                    </div>
                    <Separator className="mt-4 h-1 bg-pink-500" />
                    <div className="py-2">
                      <span className="text-sm">
                        {shop.satisfiedCustomers}+ satisfied customers
                      </span>
                    </div>
                  </div>
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
