"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "~/components/ui/button";
import Accessories from "./_components/Accessories";
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
      <div className="h-20"></div>

      {/* For shopping... */}
      {/* <AccessoriesDetail /> */}

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

        {/* Vehicles */}
        <Vehicles />

        {/* Accessories */}
        <Accessories />

        {/* Faqs */}
        <Faqs />

        {/* Location */}
        <Locations />
      </main>
    </>
  );
};

export default VendorPage;
