import "~/styles/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { type Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { Toaster } from "~/components/ui/toaster";
import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import TailwindIndicator from "./_components/_/TailwindIndicator";
import RootContext, {
  type Currency,
  DEFAULT_CURRENCY,
} from "./_components/contexts/root";
import { bricolage } from "./utils/font";
import { constructMetadata } from "./utils/site";

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  const isCurrency = (value: unknown): value is Currency => {
    return (
      typeof value === "object" &&
      value !== null &&
      "label" in value &&
      "value" in value &&
      typeof (value as Currency).label === "string" &&
      typeof (value as Currency).value === "string"
    );
  };

  const currency = (() => {
    try {
      const stored = sessionStorage.getItem("currency");
      if (!stored) return DEFAULT_CURRENCY;

      const parsed = JSON.parse(stored) as Currency;
      return isCurrency(parsed) ? parsed : DEFAULT_CURRENCY;
    } catch (error) {
      console.error("Error parsing currency from sessionStorage:", error);
      return DEFAULT_CURRENCY;
    }
  })();

  return (
    <html lang="en">
      <body className={bricolage.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <TRPCReactProvider>
          <HydrateClient>
            <RootContext currency={currency} session={session}>
              {children}
            </RootContext>
            <Toaster />
          </HydrateClient>
        </TRPCReactProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
