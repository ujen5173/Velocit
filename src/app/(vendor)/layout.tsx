import React from "react";
import Header from "~/app/_components/_/Header";

const OthersPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header pth={"/..."} />
      {children}
    </main>
  );
};

export default OthersPageLayout;
