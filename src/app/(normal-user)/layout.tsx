import { redirect } from "next/navigation";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

const NormalUserLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerAuthSession();

  if (session?.user.role === "VENDOR" && !session?.user.vendorSetupComplete)
    redirect("/vendor-setup");

  return <>{children}</>;
};

export default NormalUserLayout;
