"use client";
import { format, parseISO } from "date-fns";
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Dot,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { chakra_petch, nunito } from "~/app/utils/font";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import { vendorDetail, vendorVehicles } from "~/types";

const AccessoriesDetail = () => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  // Fetch disabled dates from API
  useEffect(() => {
    async function fetchDisabledDates() {
      // Replace with your actual API call
      const data = {
        disabledDates: ["2024-10-25", "2024-11-01", "2024-11-05"],
      };
      setDisabledDates(data.disabledDates.map((date) => parseISO(date)));
    }

    void fetchDisabledDates();
  }, []);

  // Custom CSS for disabling dates
  const isDisabled = (date: Date) => {
    return disabledDates.some(
      (disabledDate) => disabledDate.getTime() === date.getTime(),
    );
  };

  const getDayClassName = (date: Date) => {
    if (isDisabled(date)) {
      return "bg-slate-200 text-foreground cursor-not-allowed"; // Light red for disabled dates
    }
    return "text-foreground";
  };

  return (
    <Sheet open={open} onOpenChange={(e) => setOpen(e)}>
      <SheetContent className="m-4 h-auto overflow-hidden rounded-md p-0">
        <SheetHeader>
          <SheetTitle className="border-b border-border bg-slate-100 px-4 py-[0.80rem] text-base font-medium">
            Vehicle Details
          </SheetTitle>
        </SheetHeader>
        <div className="h-full w-full overflow-scroll">
          <div>
            <div className="p-4">
              <div className="mb-4">
                {/* Thumbnail */}
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

                {/* Images */}
                <div>
                  <Carousel
                    orientation={"horizontal"}
                    setApi={setApi}
                    className="w-full"
                  >
                    <CarouselContent className="max-h-[625px] px-4 pb-2">
                      {vendorVehicles[0]!.images.map((image, index) => (
                        <CarouselItem
                          key={index}
                          className="relative basis-auto px-1 pt-2"
                        >
                          <button className="flex size-20 items-center justify-center rounded-md border border-border hover:ring-2 hover:ring-secondary hover:ring-offset-2">
                            <Image
                              onClick={() => {
                                api?.scrollTo(index);
                              }}
                              alt={`${vendorDetail.name}'s Images`}
                              width={350}
                              height={350}
                              layout="fixed"
                              className="size-14 cursor-pointer rounded-md object-cover md:aspect-square"
                              key={index}
                              src={image}
                            />
                          </button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>

              <div>
                <h1
                  className={cn(
                    "mb-4 text-2xl font-medium",
                    chakra_petch.className,
                  )}
                >
                  {vendorVehicles[0]!.brand} {vendorVehicles[0]!.model}
                </h1>

                <div className="mb-6 flex items-center gap-1">
                  <button className="cursor-default rounded-md bg-secondary px-2 py-[0.35rem] text-xs uppercase text-secondary-foreground shadow-md">
                    {vendorVehicles[0]!.type}
                  </button>
                  <Dot size={16} />
                  <button className="cursor-default rounded-md bg-tertiary px-2 py-[0.35rem] text-xs uppercase text-tertiary-foreground shadow-md">
                    {vendorVehicles[0]!.use}
                  </button>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <h6 className="text-base text-slate-600">Starting from</h6>
                  <div className="flex items-end gap-2">
                    <span
                      className={cn("text-2xl font-semibold", nunito.className)}
                    >
                      रु {(vendorVehicles[0]!.price_per_hour ?? 1) * 65}{" "}
                      <span className="text-base font-normal">/day</span>
                    </span>
                  </div>
                </div>

                {/* features of the vehicle in a structured key value table*/}
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-medium text-slate-600">
                    Features of {vendorVehicles[0]!.brand}{" "}
                    {vendorVehicles[0]!.model}
                  </h3>
                  <table className="w-full rounded-md">
                    <tbody className="overflow-hidden rounded-md">
                      {Object.entries(vendorVehicles[0]!.features).map(
                        ([key, value], index) => (
                          <tr
                            key={index}
                            className={cn(
                              "flex border border-border",
                              index ===
                                Object.keys(vendorVehicles[0]!.features)
                                  .length -
                                  1
                                ? ""
                                : "border-b-0",
                            )}
                          >
                            <td className="w-10/12 bg-slate-100 p-2 text-base font-semibold text-slate-600">
                              {key}
                            </td>
                            <td className="w-full p-2 text-base text-slate-800">
                              {value}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Available Dates */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-slate-600">
                      Available Dates
                    </h3>
                    {selectedDate && (
                      <span className="text-sm text-red-600 underline">
                        Book for {format(selectedDate, "dd, MMM")}
                      </span>
                    )}
                  </div>

                  <div className={cn(nunito.className)}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date()} // No previous dates allowed
                      dayClassName={(date) => getDayClassName(date)} // Apply custom styles
                      filterDate={(date) => !isDisabled(date)} // Disable specific dates
                      inline // Always keep the date picker open
                      // ClassNames:::
                      className="w-full bg-white p-4 shadow-lg"
                      calendarClassName="w-full"
                      renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                      }) => (
                        <div
                          className={cn(
                            "flex w-full items-center justify-between bg-white py-2",
                          )}
                        >
                          <span className="inline-block space-x-1">
                            <span className="text-base font-semibold text-foreground">
                              {format(date, "MMMM")}
                            </span>
                            <span className="text-base font-normal text-foreground">
                              {format(date, "yyyy")}
                            </span>
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => {
                                void decreaseMonth();
                              }}
                              variant={"outline"}
                              size={"icon"}
                            >
                              <ChevronLeft
                                size={16}
                                className="text-slate-700"
                              />
                            </Button>
                            <Button
                              onClick={() => {
                                void increaseMonth();
                              }}
                              variant={"outline"}
                              size={"icon"}
                            >
                              <ChevronRight
                                size={16}
                                className="text-slate-700"
                              />
                            </Button>
                          </div>
                        </div>
                      )}
                      weekDayClassName={() =>
                        cn("w-full text-foreground", nunito.className)
                      }
                      formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-16"></div>
            <div className="absolute bottom-0 flex w-full items-stretch justify-between gap-2 border-t border-border bg-white px-4 py-2">
              <div className="">
                <Button
                  variant={"outline"}
                  size="icon"
                  className={cn("h-full w-12")}
                >
                  <Bookmark size={18} className="text-slate-700" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex h-full w-full overflow-hidden rounded-md border border-border">
                  <input
                    className="w-full px-4 text-center text-lg font-semibold text-slate-700 outline-none"
                    min={1}
                    defaultValue={1}
                    readOnly
                    type="text"
                  />
                  <div className="flex flex-col border-l border-border">
                    <button className="flex flex-1 items-center justify-center px-1">
                      <ChevronUp size={18} className="text-slate-600" />
                    </button>
                    <Separator />
                    <button className="flex flex-1 items-center justify-center px-1">
                      <ChevronDown size={18} className="text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Button className="w-full" variant="primary">
                  Reserve
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccessoriesDetail;
