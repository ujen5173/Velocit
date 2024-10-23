"use client";
import { format, isSameDay } from "date-fns";
import {
  CalendarDays,
  CircleCheck,
  Dot,
  ExternalLink,
  Globe,
  Heart,
  Minus,
  Phone,
  Plus,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { type DateRange } from "react-day-picker";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import { vendorDetail } from "~/types";

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

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const disabledDays = [
    new Date().setDate(new Date().getDate() + 2),
    new Date().setDate(new Date().getDate() + 7),
    new Date().setDate(new Date().getDate() + 8),
    new Date().setDate(new Date().getDate() + 9),
  ];

  // Function to check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    // Disable dates before today
    if (date < new Date()) {
      return true;
    }

    // Disable specific dates
    return disabledDays.some((disabledDate) => isSameDay(date, disabledDate));
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-4">
          <DialogHeader className="border-b border-border">
            <DialogTitle className="pb-2 text-center text-lg font-medium text-foreground">
              Reserve a Vehicle
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Pick up Date</Label>
              <div className={cn("grid gap-2")}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start gap-2 border px-4 text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarDays size={18} className="text-slate-700" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      disabled={isDateDisabled}
                      defaultMonth={date?.from}
                      selected={date}
                      showOutsideDays={false}
                      classNames={{
                        cell: "w-[36px] text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      }}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2 pb-4">
              <Label>Vehicle Type</Label>
              <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3">
                <div className="relative rounded-md bg-[#f1f0f5] p-4 text-slate-800">
                  <span className="text-sm font-medium">Cycle</span>
                  <div className="absolute -bottom-[0.80rem] right-2 rounded-full bg-slate-600 px-3 py-1 text-[0.65rem] text-slate-50">
                    NPR 500
                  </div>
                </div>
                <div className="relative rounded-md bg-[#f1f0f5] p-4 text-slate-800">
                  <span className="text-sm font-medium">Motocycle</span>
                  <div className="absolute -bottom-[0.80rem] right-2 rounded-full bg-slate-600 px-3 py-1 text-[0.65rem] text-slate-50">
                    NPR 500
                  </div>
                </div>
                <div className="relative rounded-md bg-[#f1f0f5] p-4 text-slate-800">
                  <span className="text-sm font-medium">Scooter</span>
                  <div className="absolute -bottom-[0.80rem] right-2 rounded-full bg-slate-600 px-3 py-1 text-[0.65rem] text-slate-50">
                    NPR 500
                  </div>
                </div>
                <div className="relative rounded-md bg-[#f1f0f5] p-4 text-slate-800">
                  <span className="text-sm font-medium">Electric Cycle</span>
                  <div className="absolute -bottom-[0.80rem] right-2 rounded-full bg-slate-600 px-3 py-1 text-[0.65rem] text-slate-50">
                    NPR 500
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Free Accessories with Vehicle</Label>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <CircleCheck size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-slate-700">
                    Helmet
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleCheck size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-slate-700">
                    Lock
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleCheck size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-slate-700">
                    Gloves
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleCheck size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-slate-700">
                    Jacket
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleCheck size={16} className="text-green-600" />
                  <span className="text-xs font-medium text-slate-700">
                    Bag
                  </span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 gap-2 space-y-2 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>No of Vehicle</Label>
                <div className="flex items-center justify-start gap-2">
                  <div>
                    <button className="flex size-6 items-center justify-center rounded-full bg-slate-400">
                      <Minus size={18} className="text-white" />
                    </button>
                  </div>
                  <div className="w-20">
                    <Input
                      type="text"
                      pattern="[1-9]"
                      defaultValue={1}
                      className="h-10 text-center"
                    />
                  </div>
                  <div>
                    <button className="flex size-6 items-center justify-center rounded-full bg-slate-700">
                      <Plus size={18} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Choose of Vehicle</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Trek Domane SL 6</SelectItem>
                    <SelectItem value="dark">Yamaha MT-15</SelectItem>
                    <SelectItem value="system">Honda Activa 6G</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Any message to the vendor?</Label>
              <Textarea className="h-32" />
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-4">
            <Button
              onClick={() => setOpen(false)}
              className="border-secondary text-secondary"
              variant={"outline"}
            >
              Cancel
            </Button>
            <Button className="" variant={"primary"}>
              Reserve
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <section className="mx-auto max-w-[1240px] px-4">
        <div className="flex flex-col gap-5 py-6 md:flex-row md:py-10 lg:gap-10">
          <div className="mx-auto flex h-fit w-full flex-col-reverse gap-2 sm:w-10/12 md:w-7/12 lg:flex-row">
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
                  <Button
                    onClick={() => setOpen(true)}
                    className="w-full"
                    variant={"primary"}
                  >
                    Reserve Now
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
    </>
  );
};

export default VendorDetails;
