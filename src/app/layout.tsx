import "~/styles/globals.css";

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import RootContext from "./_components/contexts/root";
import { nunito } from "./utils/font";
import { constructMetadata } from "./utils/site";

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.className}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <RootContext>{children}</RootContext>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
