import React from "react";

const VendorLayout = async ({ children }: { children: React.ReactNode }) => {
  console.log("vendor layout");

  return <>{children}</>;
};

export default VendorLayout;
