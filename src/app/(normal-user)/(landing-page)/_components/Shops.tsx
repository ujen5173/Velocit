import VendorCard from "~/app/_components/_/VendorCard";
import { slides } from "~/lib/data";

const Shops = () => {
  return (
    <>
      <div className="h-36"></div>
      <section className="w-full">
        <div className="grid grid-cols-1 gap-2 px-6 sm:grid-cols-2">
          {slides.map((shop, index) => (
            <VendorCard key={index} shop={shop} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Shops;
