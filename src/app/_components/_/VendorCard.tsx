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
import { type GetPopularShops } from "~/server/api/routers/business";

type Props = {
  shop: GetPopularShops[number];
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
                  {+shop.rating <= 0 ? "N/A" : +shop.rating}
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
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {shop.availableVehiclesTypes.map((type, index) => {
                  return (
                    <div
                      key={index + shop.id}
                      className={cn(
                        "flex items-center gap-1 rounded-sm border px-2 py-1 font-medium",
                        {
                          "border-car-color/50 bg-car-color/20 text-car-color":
                            type === "car",
                          "border-e-car-color/50 bg-e-car-color/20 text-e-car-color":
                            type === "e-car",
                          "border-bike-color/50 bg-bike-color/20 text-bike-color":
                            type === "bike",
                          "border-cycle-color/50 bg-cycle-color/20 text-cycle-color":
                            type === "bicycle",
                          "border-e-cycle-color/50 bg-e-cycle-color/20 text-e-cycle-color":
                            type === "e-bicycle",
                          "border-scooter-color/50 bg-scooter-color/20 text-scooter-color":
                            type === "scooter",
                        },
                      )}
                    >
                      <div
                        className={cn("size-1.5 rounded-full", {
                          "bg-car-color": type === "car",
                          "bg-e-car-color": type === "e-car",
                          "bg-bike-color": type === "bike",
                          "bg-cycle-color": type === "bicycle",
                          "bg-e-cycle-color": type === "e-bicycle",
                          "bg-scooter-color": type === "scooter",
                        })}
                      ></div>
                      <span className="text-xs uppercase">{type}</span>
                    </div>
                  );
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
