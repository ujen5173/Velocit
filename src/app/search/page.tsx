"use client";

import { MapIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { searchedData } from "~/lib/data";
import { cn } from "~/lib/utils";
import VendorCard from "../_components/_/VendorCard";
import { chakra_petch } from "../utils/font";
import MapArea from "./_components/MapArea";

const Search = () => {
  const [showingArea, setShowingArea] = useState<"places" | "map" | "both">(
    "places",
  );

  useEffect(() => {
    const handleResize = () => {
      setShowingArea(window.innerWidth < 1024 ? "places" : "both");
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={"h-16 md:h-20"}></div>
      <section className="relative w-full">
        <div className="fixed bottom-4 left-1/2 z-[100] block -translate-x-1/2 lg:hidden">
          <Button
            onClick={() =>
              setShowingArea(showingArea === "places" ? "map" : "places")
            }
            variant={"primary"}
            rounded={"full"}
          >
            <MapIcon size={18} />
            <span className="ml-2">
              {showingArea === "places" ? "Show Map" : "Show List"}
            </span>
          </Button>
        </div>

        <div className={cn("relative flex")}>
          <div
            className={cn(
              "max-w-none overflow-auto border-r border-border lg:max-w-[600px] xl:max-w-[932px]",
              showingArea === "map" ? "hidden" : "block w-full",
              showingArea === "both" ? "block" : "",
              "px-8 py-4 md:p-4",
            )}
          >
            {/* Keep the original content as is */}
            <div className="mb-2">
              <span
                className={cn(
                  "text-lg font-medium text-foreground",
                  chakra_petch.className,
                )}
              >
                {searchedData.length} Results found in visible area
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {searchedData.map((shop) => (
                <div
                  className={cn("relative", chakra_petch.className)}
                  key={shop.slug}
                >
                  <VendorCard
                    shop={shop}
                    separatorColor="bg-slate-200"
                    separatorHeight="h-[3px]"
                  />
                  {/* <div className={"relative"}>
                    <Carousel setApi={setApi} className="w-full">
                      <CarouselPrevious />
                      <CarouselNext />
                      <CarouselContent className="">
                        {shop.images.map((image, index) => (
                          <CarouselItem key={index} className="relative pt-2">
                            <Image
                              onClick={() => api?.scrollTo(index)}
                              alt={`${shop.name}'s Images`}
                              width={450}
                              height={450}
                              layout="fixed"
                              className="aspect-[4/3] cursor-pointer rounded-md object-cover"
                              src={image}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>

                  <Link href={`/vendor/${shop.slug}`}>
                    <div className="pt-4">
                      <h1
                        className={cn(
                          "mb-2 line-clamp-1 text-lg font-medium",
                          chakra_petch.className,
                        )}
                      >
                        {shop.name}
                      </h1>
                      <div className="select-none">
                        <div className="mb-4 flex items-center">
                          <div className="flex items-center gap-1">
                            <Star
                              size={18}
                              className="fill-yellow-500 stroke-yellow-500"
                            />
                            <span className="text-sm">{shop.rating}</span>
                          </div>
                          <Dot size={18} />
                          <div className="flex items-center gap-1">
                            <MapPin size={18} />
                            <span className="line-clamp-1 text-sm">
                              {shop.address}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-1 text-sm uppercase">
                            Starting At
                          </h4>
                          <h1
                            className={cn(
                              "text-2xl font-semibold",
                              bricolage.className,
                            )}
                          >
                            रु {shop.perDay.bicycle}{" "}
                            <span className="text-base font-normal">/day</span>
                          </h1>
                        </div>
                        <Separator className="mt-2 h-[2px] bg-border" />
                        <div className="py-2">
                          <span className="text-sm">
                            {shop.satisfiedCustomers}+ satisfied customers
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link> */}
                </div>
              ))}
            </div>
          </div>
          <div
            className={cn(
              "relative z-40 h-auto min-h-[calc(100vh-64px)] flex-1 md:min-h-[calc(100vh-80px)]",
              showingArea === "places" ? "hidden" : "block",
              showingArea === "both" ? "block" : "",
            )}
          >
            <div className="sticky inset-0 left-0 top-[64px] h-[calc(100vh-64px)] md:top-[80px] md:h-[calc(100vh-80px)]">
              <MapArea />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
