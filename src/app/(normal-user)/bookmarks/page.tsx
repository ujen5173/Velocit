"use client";

import { searchedData } from "~/lib/data";
import { cn } from "~/lib/utils";
import VendorCard from "../../_components/_/VendorCard";
import { bricolage } from "../../utils/font";

const Bookmarks = () => {
  return (
    <>
      <div className="h-16 md:h-20"></div>
      <section className="w-full">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-4">
            <h1 className={cn("text-4xl font-semibold", bricolage.className)}>
              Bookmarks
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchedData.map((shop, index) => (
              <div key={index}>
                <VendorCard shop={shop} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Bookmarks;
