"use client";
import { ListFilter, Star } from "lucide-react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { nunito } from "~/app/utils/font";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { vendorDetail, vendorVehicles } from "~/types";

const Vehicles = () => {
  return (
    <section className="bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex items-center justify-between gap-10">
          <h1
            className={cn("text-2xl font-bold xs:text-3xl", nunito.className)}
          >
            Pick Your Ride
          </h1>
          <Button variant={"outline"} className="hover:bg-slate-50">
            <ListFilter size={16} className="mr-2" />
            <span>Filter</span>
          </Button>
        </div>

        <section className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {vendorVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              // onClick={() => setOpen(true)} // for the vehicle details model
              className="flex flex-col gap-2"
            >
              <div className="relative flex items-center justify-center">
                <Image
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  width={450}
                  height={450}
                  layout="fixed"
                  className="h-60 w-auto max-w-full rounded-md object-cover mix-blend-multiply"
                  src={vehicle.images[0]!}
                />
                <div className="absolute right-2 top-2 hidden rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-slate-50">
                  {vehicle.status}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-slate-700">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <div className="mb-4 flex items-center gap-2">
                  <Star
                    size={16}
                    className="fill-yellow-500 stroke-yellow-500"
                  />
                  <span className="text-sm">
                    {vendorDetail.rating} ({vendorDetail.ratingCount})
                  </span>
                </div>
                <div>
                  <h4 className="mb-1 text-sm uppercase text-slate-600">
                    Starting at
                  </h4>
                  <div className="flex items-end gap-2">
                    <span
                      className={cn("text-xl font-semibold", nunito.className)}
                    >
                      रु {(vehicle.price_per_hour ?? 1) * 65}{" "}
                      <span className="text-base font-normal">/day</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default Vehicles;
