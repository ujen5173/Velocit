"use client";
import { Globe, MapPin, Phone } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { chakra_petch } from "~/app/utils/font";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { vendorDetail } from "~/lib/data";
import { cn } from "~/lib/utils";

const Locations = () => {
  return (
    <section className="bg-white px-4 py-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10">
          <h1
            className={cn(
              "mb-4 text-4xl font-semibold",
              chakra_petch.className,
            )}
          >
            Visit Us
          </h1>
          <p className="lg:7/12 hidden w-full text-lg text-slate-600 sm:block md:w-9/12">
            Visit one of our convenient branches for quick, personalized
            service. Find your nearest location below and enjoy a seamless
            experience tailored to you.
          </p>
        </div>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-md border border-border bg-white">
              <MapPin size={25} className="text-slate-600" />
            </div>
            <div>
              <p className="text-base text-foreground">
                Locations (<span className="underline">2</span>)
              </p>
              <p className="text-base font-medium text-slate-600">
                {vendorDetail.location
                  .map((location) => location.address)
                  .join(", ")}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex size-14 items-center justify-center rounded-md border border-border bg-white">
              <Phone size={25} className="text-slate-600" />
            </div>
            <div>
              <p className="text-base text-foreground">Phone Number</p>
              <p className="text-base font-medium text-slate-600">
                {vendorDetail.phoneNumbers.join(", ")}
              </p>
            </div>
          </div>
          {Object.values(vendorDetail.socials).length > 1 ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex justify-start gap-4">
                  <div className="flex size-14 items-center justify-center rounded-md border border-border bg-white">
                    <Globe size={25} className="text-slate-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-base text-foreground">Socials</p>
                    <p className="text-base text-foreground">
                      @epicmountainbike
                    </p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-screen max-w-72">
                <DropdownMenuItem>Facebook</DropdownMenuItem>
                <DropdownMenuItem>Instagram</DropdownMenuItem>
                <DropdownMenuItem>Website</DropdownMenuItem>
                <DropdownMenuItem>Twitter</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-start gap-4">
              <div className="flex size-14 items-center justify-center rounded-md border border-border bg-white">
                <Globe size={25} className="text-slate-600" />
              </div>
              <div>
                <p className="text-base text-foreground">Socials</p>
                <p className="text-base font-medium text-slate-600">
                  @epicmountainbike
                </p>
              </div>
            </div>
          )}
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d16874.946912213625!2d85.310581!3d27.678682!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1834531badcd%3A0x330b0c2fcb7ce7e!2sEpic%20Mountain%20Bike!5e1!3m2!1sen!2snp!4v1729510884714!5m2!1sen!2snp"
          className="h-[40rem] w-full rounded-md border-none"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Locations;
