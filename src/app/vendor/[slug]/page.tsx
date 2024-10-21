"use client";
import { Dot, Globe, Heart, Phone, Share, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

const VendorPage = () => {
  const [api, setApi] = useState<CarouselApi>();

  const vendorDetail = {
    id: "1",
    ownerId: "1",
    name: "Epic Mountain Bike Nepal",
    description:
      "Explore an extensive array of top-tier mountain bikes, cutting-edge parts, and high-performance apparel from leading brands.",
    location: {
      address: "Jhamsikhel Rd, Kathmandu",
      city: "Kathmandu",
      state: "Bagmati",
      zip: "44600",
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
    bannerImage: "/images/background-pattern.png",
    logoImage: "/images/vendor/logo.png",
    shopImages: [
      "/images/shops/img-1.jpg",
      "/images/shops/img-2.jpg",
      "/images/shops/img-3.jpg",
      "/images/shops/img-4.jpg",
    ],
    longRidesAvailable: true,
  } as const;

  return (
    <>
      <div className="h-20"></div>
      <main className="w-full">
        <section className="w-full">
          <div className="mx-auto flex max-w-[1240px] gap-10 px-4 py-10">
            <div className="flex w-7/12 gap-4">
              <div className="flex flex-col gap-4">
                {vendorDetail.shopImages.map((image, index) => (
                  <Image
                    onClick={() => {
                      api?.scrollTo(index);
                    }}
                    alt={`${vendorDetail.name}'s Images`}
                    width={550}
                    height={550}
                    layout="cover"
                    className="aspect-square cursor-pointer rounded-md object-cover"
                    key={index}
                    src={image}
                  />
                ))}
              </div>
              <div className="relative">
                <Carousel setApi={setApi} className="h-full w-full">
                  <CarouselPrevious />
                  <CarouselNext />
                  <CarouselContent className="h-full">
                    {vendorDetail.shopImages.map((_, index) => (
                      <CarouselItem key={index}>
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
                    {vendorDetail.location.address}
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
                      <Share size={16} className="mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default VendorPage;
