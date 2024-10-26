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
import React, { useLayoutEffect, useState } from "react";
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
import { ScrollArea } from "~/components/ui/scroll-area";
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

const VehicleType = {
  BICYCLE: "bicycle",
  MOTORCYCLE: "motorcycle",
  SCOOTER: "scooter",
  ELECTRIC_BICYCLE: "electric-bicycle",
} as const;

const vehicles = [
  {
    type: VehicleType.BICYCLE,
    label: "Cycle",
    price: 500,
    models: ["Trek Domane SL 6", "Giant Contend 1", "Specialized Allez"],
  },
  {
    type: VehicleType.MOTORCYCLE,
    label: "Motorcycle",
    price: 1500,
    models: ["Yamaha MT-15", "KTM Duke 200", "Honda CB Hornet"],
  },
  {
    type: VehicleType.SCOOTER,
    label: "Scooter",
    price: 800,
    models: ["Honda Activa 6G", "TVS Jupiter", "Suzuki Access"],
  },
  {
    type: VehicleType.ELECTRIC_BICYCLE,
    label: "Electric Cycle",
    price: 1000,
    models: ["RadCity 5 Plus", "Ride1Up Core-5", "Aventon Pace 500"],
  },
];

const VendorDetails = () => {
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  const [selectedVehicleType, setSelectedVehicleType] = useState<
    (typeof VehicleType)[keyof typeof VehicleType]
  >(VehicleType.BICYCLE);
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState("");
  const [message, setMessage] = useState("");

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

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if (action === "increment" && quantity < 10) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const disabledDays = [
    new Date().setDate(new Date().getDate() + 2),
    new Date().setDate(new Date().getDate() + 7),
    new Date().setDate(new Date().getDate() + 8),
    new Date().setDate(new Date().getDate() + 9),
  ];

  const isDateDisabled = (date: Date) => {
    if (date < new Date()) {
      return true;
    }
    return disabledDays.some((disabledDate) => isSameDay(date, disabledDate));
  };

  const currentVehicle = vehicles.find((v) => v.type === selectedVehicleType);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[90vh] max-h-[800px] w-[90vw] flex-col gap-4 p-4 md:w-[80vw] lg:max-w-2xl">
          <DialogHeader className="flex-none border-b border-border pb-2">
            <DialogTitle className="text-center text-lg font-medium text-foreground">
              Reserve a Vehicle
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-2">
            <div className="space-y-4 py-2">
              <div className="space-y-2 px-1">
                <Label>Pick up Date</Label>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={`w-full justify-start gap-2 border px-4 text-left font-normal ${
                          !date && "text-muted-foreground"
                        }`}
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
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2 px-1 pb-4">
                <Label>Vehicle Type</Label>
                <div className="grid grid-cols-2 gap-x-2 gap-y-5 px-1 sm:grid-cols-3">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.type}
                      className={`relative cursor-pointer rounded-md bg-[#f1f0f5] p-4 text-slate-800 transition-all hover:bg-slate-200 ${
                        selectedVehicleType === vehicle.type
                          ? "ring-2 ring-secondary"
                          : ""
                      }`}
                      onClick={() => setSelectedVehicleType(vehicle.type)}
                    >
                      <span className="text-sm font-medium">
                        {vehicle.label}
                      </span>
                      <div className="absolute -bottom-[0.80rem] right-2 rounded-full bg-slate-600 px-3 py-1 text-[0.65rem] text-slate-50">
                        NPR {vehicle.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 px-1">
                <Label>Free Accessories with Vehicle</Label>
                <div className="flex flex-wrap items-center gap-4">
                  {["Helmet", "Lock", "Gloves", "Jacket", "Bag"].map(
                    (accessory) => (
                      <div key={accessory} className="flex items-center gap-1">
                        <CircleCheck size={16} className="text-green-600" />
                        <span className="text-xs font-medium text-slate-700">
                          {accessory}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="space-y-2 px-1">
                  <Label>Number of Vehicles</Label>
                  <div className="flex items-center justify-start gap-2">
                    <button
                      className="flex size-6 items-center justify-center rounded-full bg-slate-400"
                      onClick={() => handleQuantityChange("decrement")}
                    >
                      <Minus size={18} className="text-white" />
                    </button>
                    <div className="w-20">
                      <Input
                        type="text"
                        pattern="[0-9]+"
                        inputMode="numeric"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={handleQuantityInput}
                        className="h-10 text-center"
                      />
                    </div>
                    <button
                      className="flex size-6 items-center justify-center rounded-full bg-slate-700"
                      onClick={() => handleQuantityChange("increment")}
                    >
                      <Plus size={18} className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 px-1">
                  <Label>Choose Vehicle</Label>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentVehicle?.models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 px-1">
                <Label>Message to vendor</Label>
                <Textarea
                  className="h-32"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          </ScrollArea>

          <div className="flex w-full items-center justify-end gap-4">
            <Button
              onClick={() => setOpen(false)}
              // className="border-secondary text-secondary"
              variant="outline"
            >
              Cancel
            </Button>
            <Button variant="primary">Reserve</Button>
          </div>
        </DialogContent>
      </Dialog>

      <section className="mx-auto max-w-[1240px] px-4">
        <div className="flex flex-col gap-5 py-6 md:flex-row md:py-10 lg:gap-10">
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
