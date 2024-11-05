import "~/styles/globals.css";

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import TailwindIndicator from "./_components/_/TailwindIndicator";
import AuthContext from "./_components/contexts/authContext";
import RootContext from "./_components/contexts/root";
import { lato } from "./utils/font";
import { constructMetadata } from "./utils/site";

export const metadata: Metadata = constructMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("root layout");

  return (
    <html lang="en" className={`${lato.className}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <RootContext>
              <AuthContext>{children}</AuthContext>
            </RootContext>
          </HydrateClient>
        </TRPCReactProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
