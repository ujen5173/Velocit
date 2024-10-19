import {
  Chakra_Petch,
  Inter,
  Merienda,
  Playfair_Display,
} from "next/font/google";

export const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  display: "swap",
  variable: "--playfair",
  subsets: ["latin"],
  preload: true,
});

export const nunito = Inter({
  weight: ["400", "500", "700", "300"],
  style: "normal",
  display: "swap",
  variable: "--nunito",
  subsets: ["latin"],
  preload: true,
});

export const chakra_petch = Chakra_Petch({
  weight: ["400", "500", "700"],
  style: "normal",
  display: "swap",
  variable: "--chakra-petch",
  subsets: ["latin"],
  preload: true,
});

export const merienda = Merienda({
  weight: ["400", "700"],
  style: "normal",
  display: "swap",
  variable: "--merienda",
  subsets: ["latin"],
  preload: true,
});
