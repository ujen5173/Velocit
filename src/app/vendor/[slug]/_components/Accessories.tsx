"use client";
import { Dot, ListFilter, Star } from "lucide-react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { chakra_petch, nunito } from "~/app/utils/font";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { vendorDetail, vendorVehicles } from "../page";

const Accessories = () => {
  return (
    <section className="px-4 py-6 sm:py-10 md:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex items-center justify-between gap-10">
          <h1 className={cn("text-4xl font-semibold", chakra_petch.className)}>
            Accessories
          </h1>
          <Button variant={"outline"} className="hover:bg-slate-50">
            <ListFilter size={16} className="mr-2" />
            <span>Filter</span>
          </Button>
        </div>

        <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {vendorVehicles.slice(0, 7).map((vehicle, index) => (
            <div key={vehicle.id} className="flex flex-col gap-2">
              <div className="relative flex items-center justify-center">
                <Image
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  width={450}
                  height={450}
                  layout="fixed"
                  className="h-60 w-auto max-w-full rounded-md object-cover mix-blend-multiply"
                  src={vehicle.images[0]!.split("img")[0]!.concat(
                    `img${index + 1 + 10}.jpg`,
                  )}
                />
                <div className="absolute right-2 top-2 hidden rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-slate-50">
                  {vehicle.status}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-slate-600">
                  {vehicle.brand} {vehicle.model}
                </h3>
                <div className="mb-4 flex items-center">
                  <div className="ga-2 flex items-center">
                    <Star
                      size={16}
                      className="fill-yellow-500 stroke-yellow-500"
                    />
                    <span className="text-sm">
                      {vendorDetail.rating} ({vendorDetail.ratingCount})
                    </span>
                  </div>
                  <div className="ga-2 flex items-center">
                    <Dot size={16} />
                    <span className="text-sm">
                      {vendorDetail.ratingCount * 100}+ Items Sold
                    </span>
                  </div>
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

export default Accessories;
