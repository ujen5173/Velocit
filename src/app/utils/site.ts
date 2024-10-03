import { type Metadata } from "next";
import { env } from "~/env";

const links = {
  github: "https://github.com/ujen5173/velocit",
  twitter: "https://twitter.com/ujen_basi",
  linkedin: "https://www.linkedin.com/in/ujen-basi-167a4522a/",
  discord: "",
  authorsWebsite: "https://ujenbasi.vercel.app",
  authorsGitHub: "https://github.com/ujen5173",
  openGraphImage: env.NEXT_PUBLIC_APP_URL + "/og-image.png",
};

export function getBaseUrl() {
  if (typeof window !== undefined) {
    return window.location.origin;
  }

  if (env.NEXT_PUBLIC_APP_URL) {
    return env.NEXT_PUBLIC_APP_URL;
  }

  return `http://localhost:3000`;
}
export const siteConfig = {
  name: "Velocit",
  namelower: "velocit",
  title: "Velocit - Quick and Easy Cycle, Bike, Scooter, and Car Rentals",
  description:
    "Velocit offers seamless rentals for cycles, bikes, scooters, and cars. Find the perfect vehicle for your journey with fast booking and competitive rates.",
  tagline: "Seamless rentals for cycles, bikes, scooters, and cars.",
  links,
  url: "https://velocit.vercel.app",
  ogImage: links.openGraphImage,
  author: "ujen5173",
  keywords: [
    "Velocit rentals",
    "cycle rental service",
    "bike rental service",
    "scooter rental service",
    "car rental service",
    "vehicle hire",
    "affordable vehicle rentals",
    "rent cycles bikes scooters cars",
    "easy vehicle rentals",
  ],
};

export function constructMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  image = `${getBaseUrl()}/og-image.png`,
  icons = [
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
  noIndex = false,
  url = getBaseUrl(),
  publishedTime,
}: {
  title?: string;
  description?: string;
  image?: string | null;
  icons?: Metadata["icons"];
  noIndex?: boolean;
  url?: string;
  publishedTime?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      publishedTime,
      ...(image && {
        images: [
          {
            url: image,
          },
        ],
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      creator: "ujen_basi",
    },
    icons,
    metadataBase: new URL(getBaseUrl()),
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}
