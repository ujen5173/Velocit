import { Dot, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { bricolage } from "~/app/utils/font";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { type Slide } from "~/types";

type Props = {
  shop: Slide;
  separatorColor?: string;
  separatorHeight?: string;
};

const VendorCard = ({ separatorHeight, separatorColor, shop }: Props) => {
  return (
    <div className={bricolage.className}>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent>
            {shop.images.map((image, index) => (
              <CarouselItem key={index} className="relative pt-2">
                <Link href={`/vendor/${shop.slug}`}>
                  <Image
                    alt={`${shop.name}'s Images`}
                    width={450}
                    height={450}
                    layout="fixed"
                    className="aspect-[4/3] cursor-pointer rounded-md object-cover"
                    key={index}
                    src={image}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Link href={`/vendor/${shop.slug}`}>
        <div className="pt-4">
          <h1 className="mb-2 line-clamp-1 text-lg font-medium">{shop.name}</h1>
          <div className="select-none">
            <div className="mb-4 flex items-center">
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-yellow-500 stroke-yellow-500" />
                <span className="text-sm">
                  {+shop.rating! <= 0 ? "N/A" : +shop.rating!}
                </span>
              </div>
              <Dot size={18} />
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                <span className="line-clamp-1 text-sm">
                  {shop.location?.city}
                </span>
              </div>
            </div>
            <div>
              <h4 className="mb-1 text-sm uppercase">Available Vehicles</h4>
              <div className="flex flex-1 items-center gap-2">
                {shop.availableVehicleTypes.map((type, index) => {
                  switch (type) {
                    case "bicycle":
                      return (
                        <div
                          key={index + shop.id}
                          className="flex items-center gap-1 rounded-sm border border-green-500 bg-green-50 px-2 py-1 font-medium"
                        >
                          <div className="size-1.5 rounded-full bg-green-500"></div>
                          <span className="text-xs">Bicycle</span>
                        </div>
                      );
                    case "bike":
                      return (
                        <div
                          key={index + shop.id}
                          className="flex items-center gap-1 rounded-sm border border-rose-500 bg-rose-50 px-2 py-1 font-medium"
                        >
                          <div className="size-1.5 rounded-full bg-rose-500"></div>
                          <span className="text-xs">Bike</span>
                        </div>
                      );
                    case "e-bicycle":
                      return (
                        <div
                          key={index + shop.id}
                          className="flex items-center gap-1 rounded-sm border border-orange-500 bg-orange-50 px-2 py-1 font-medium"
                        >
                          <div className="size-1.5 rounded-full bg-orange-500"></div>
                          <span className="text-xs">E-Bicycle</span>
                        </div>
                      );
                    case "car":
                      return (
                        <div
                          key={index + shop.id}
                          className="flex items-center gap-1 rounded-sm border border-blue-500 bg-blue-50 px-2 py-1 font-medium"
                        >
                          <div className="size-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-xs">Car</span>
                        </div>
                      );
                    case "scooter":
                      return (
                        <div
                          key={index + shop.id}
                          className="flex items-center gap-1 rounded-sm border border-yellow-500 bg-yellow-50 px-2 py-1 font-medium"
                        >
                          <div className="size-1.5 rounded-full bg-yellow-500"></div>
                          <span className="text-xs">Car</span>
                        </div>
                      );
                  }
                })}
              </div>
            </div>
            <Separator
              className={cn(
                "mt-4",
                separatorColor ?? "bg-pink-500",
                separatorHeight ?? "h-1",
              )}
            />
            <div className="py-2">
              <span className="text-sm">
                {shop.satisfiedCustomers}+ satisfied customers
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VendorCard;
