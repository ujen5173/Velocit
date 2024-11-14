import HeaderHeight from "~/app/_components/_/HeaderHeight";
import { handwritting } from "~/app/utils/font";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import AccessoriesCard from "./AccessoriesCard";

const Shop = () => {
  return (
    <>
      <HeaderHeight />

      <div className="w-full px-4">
        <div className="mx-auto max-w-[1440px] pb-20 pt-32 text-center">
          <h3
            className={cn(
              "mb-4 text-base font-semibold uppercase text-slate-700",
            )}
          >
            Shop Gears
          </h3>
          <h1
            className={cn(
              handwritting.className,
              "mb-10 text-4xl font-semibold md:text-5xl lg:text-6xl",
            )}
          >
            Himalayan Rental Shop
          </h1>
          <div className="mx-auto mb-10 w-full md:w-7/12">
            <p className={cn("text-lg text-slate-600")}>
              Shop top-quality accessories for all bike types—helmets, lights,
              locks, pumps, and more. Ready to ride? We&apos;ve got you covered!
            </p>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="flex w-full max-w-screen-sm gap-2">
              <Input
                className="w-full"
                placeholder="What are you looking for?"
              />
              <Button variant={"secondary"}>Search</Button>
            </div>
          </div>
        </div>
        <div
          className={cn("grid gap-x-8 gap-y-4 pb-32")}
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(312px,1fr))",
          }}
        >
          {Array(15)
            .fill("")
            .map((_, i) => (
              <AccessoriesCard i={i + 2} key={i} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
