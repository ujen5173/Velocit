import {
  Dot,
  ExternalLink,
  Globe,
  Heart,
  Phone,
  Star,
  Store,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
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
import { vendorDetail } from "~/lib/data";
import { cn } from "~/lib/utils";
import Bookings from "./Bookings";

const VendorDetails = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <Bookings open={open} setOpen={setOpen} />

      <section className="px-4">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 py-6 md:flex-row md:py-10 lg:gap-10">
          <div className="mx-auto flex h-fit w-full flex-col-reverse gap-0 sm:w-10/12 md:w-7/12 lg:flex-row lg:gap-2">
            <div>
              <Carousel
                orientation={imageOrientation}
                setApi={setApi}
                className="w-full"
              >
                <CarouselContent
                  className={cn(
                    "max-h-[625px] py-2",
                    imageOrientation === "horizontal" ? "px-3" : "py-3",
                  )}
                >
                  {vendorDetail.shopImages.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="relative basis-auto px-1 pt-2"
                    >
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
                  {vendorDetail?.location[0]?.address}
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
                <h3 className="mb-2 text-base font-semibold text-slate-600">
                  Available Vehicles
                </h3>
                <div className="flex gap-4">
                  <div className="flex flex-1 items-center gap-2">
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
                        src={"/images/vehicle/e-bicycle.png"}
                      />
                      <span className="text-xs">E-Cycle</span>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-[inherit]" />
                  <div className="flex items-center gap-2">
                    <Button
                      variant={"outline"}
                      className="flex size-20 flex-col items-center justify-between rounded-md p-2"
                    >
                      <div className="flex h-12 w-12 items-center justify-center">
                        <Store size={26} className="text-red-600" />
                      </div>
                      <span className="text-xs">Shop Gears</span>
                    </Button>
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
                <div>
                  <Button
                    onClick={() => setOpen(true)}
                    className="w-full"
                    variant={"primary"}
                  >
                    Reserve Now
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="w-full" variant={"outline-secondary"}>
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
    </>
  );
};

export default VendorDetails;
