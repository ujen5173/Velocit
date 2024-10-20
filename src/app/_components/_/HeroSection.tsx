"use client";

import { format } from "date-fns";
import { CalendarIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import { chakra_petch } from "~/app/utils/font";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

const HeroSection = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section className="relative w-full">
      <div className="overlay" />
      <Image
        src={"/main-bg-2.jpg"}
        alt="Background Main Image"
        width={1920}
        priority
        height={1080}
        layout="cover"
        className="h-[70vh] max-h-[1240px] min-h-[650px] w-full object-cover"
      />

      <div className="absolute inset-0 flex h-full w-full items-end">
        <div className="mx-auto max-w-[1440px] px-4 py-16">
          <h1
            className={cn(
              "mb-6 text-4xl font-semibold leading-tight text-slate-100 md:text-5xl lg:text-6xl",
              chakra_petch.className,
            )}
          >
            <Balancer>
              Rent Cycles, Cars, and Scooters from Local Shops Around You
            </Balancer>
          </h1>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex h-auto flex-1 items-center gap-2 rounded-lg bg-slate-100/20 px-4 md:max-w-80">
              <MapPin className="stroke-slate-100" size={18} />
              <input
                className={cn(
                  "h-12 w-full bg-transparent text-base text-slate-100 outline-none placeholder:text-slate-100",
                )}
                type="text"
                placeholder="Search destinations"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "flex w-full flex-1 items-center gap-2 rounded-lg bg-slate-100/20 px-4 py-3 text-base text-slate-100 outline-none placeholder:text-slate-100 md:max-w-80",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon size={18} className="stroke-stale-100" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <div className="h-auto w-full flex-1 md:max-w-80">
              <Select>
                <SelectTrigger
                  className={cn(
                    "h-full w-full min-w-40 border-none bg-transparent py-3 text-base text-slate-100 outline-none placeholder:text-slate-100",
                    "relative flex items-center gap-2 rounded-lg bg-slate-100/20 px-4",
                  )}
                >
                  <SelectValue placeholder="Which Vechile?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vehicle Type</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="bike">Bike</SelectItem>
                    <SelectItem value="scooter">Scooter</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button className="uppercase">Search</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
