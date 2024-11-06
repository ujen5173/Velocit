import "~/styles/globals.css";

import { type Metadata } from "next";
import { headers } from "next/headers";
import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import Footer from "./_components/_/Footer";
import Header from "./_components/_/Header";
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
  const url =
    headers().get("x-url")?.replace(env.NEXT_PUBLIC_APP_URL, "") ?? "/";

  return (
    <html lang="en" className={`${lato.className}`}>
      <body>
        <TRPCReactProvider>
          <HydrateClient>
            <Header pth={url} />
            <RootContext>
              <AuthContext>{children}</AuthContext>
            </RootContext>
            <Footer />
          </HydrateClient>
        </TRPCReactProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
