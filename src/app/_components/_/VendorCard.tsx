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
    <div>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent className="">
            {shop.images.map((image, index) => (
              <CarouselItem key={index} className="relative pt-2">
                <Image
                  alt={`${shop.name}'s Images`}
                  width={450}
                  height={450}
                  layout="fixed"
                  className="aspect-[4/3] cursor-pointer rounded-md object-cover"
                  key={index}
                  src={image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Link href={`/vendor/${shop.slug}`}>
        <div className="py-4">
          <h1 className="mb-2 line-clamp-1 text-lg font-medium">{shop.name}</h1>
          <div className="select-none">
            <div className="mb-4 flex items-center">
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-yellow-500 stroke-yellow-500" />
                <span className="text-sm">{shop.rating}</span>
              </div>
              <Dot size={18} />
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                <span className="line-clamp-1 text-sm">{shop.address}</span>
              </div>
            </div>
            <div>
              <h4 className="mb-1 text-sm uppercase">Starting At</h4>
              <h1 className={cn("text-2xl font-semibold", bricolage.className)}>
                रु {shop.perDay.bicycle}{" "}
                <span className="text-base font-normal">/day</span>
              </h1>
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
