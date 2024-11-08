import React from "react";
import Header from "~/app/_components/_/Header";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header pth={"/"} />
      {children}
    </main>
  );
};

export default LandingPageLayout;
