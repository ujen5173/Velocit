"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "~/components/ui/button";
import Faqs from "./_components/Faqs";
import Locations from "./_components/Locations";
import Vehicles from "./_components/Vehicles";
import VendorDetails from "./_components/VendorDetails";

const VendorPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 550) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={"h-16 md:h-20"}></div>

      {/* For shopping... */}

      <main className="relative w-full">
        {/* Share Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button className="share-button w-full" variant={"outline"}>
            <ExternalLink size={16} className="mr-2" />
            Share
          </Button>
        </motion.div>
        {/* Vendor Details */}
        <VendorDetails />
        <div className="[&>section:nth-child(odd)]:bg-slate-50 [&>section]:px-4 [&>section]:py-16">
          {/* Vehicles */}
          <Vehicles />
          {/* Accessories */}
          {/* <Accessories /> */}
          {/* Faqs */}
          <Faqs />
          {/* Location */}
          <Locations />
        </div>
      </main>
    </>
  );
};

export default VendorPage;
