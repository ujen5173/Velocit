import {
  Bitter,
  Bricolage_Grotesque,
  Lato,
  Merienda,
  Nunito,
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

export const lato = Lato({
  weight: ["400", "700", "900", "100", "300"],
  style: "normal",
  display: "swap",
  variable: "--lato",
  subsets: ["latin"],
  preload: true,
});

export const nunito = Nunito({
  weight: ["400", "700", "900", "500", "600", "200", "300"],
  style: "normal",
  display: "swap",
  variable: "--lato",
  subsets: ["latin"],
  preload: true,
});

export const bricolage = Bricolage_Grotesque({
  weight: ["400", "500", "700", "300", "200", "600", "800"],
  style: "normal",
  display: "swap",
  variable: "--bricolage",
  subsets: ["latin"],
  preload: true,
});

export const chakra_petch = Bitter({
  weight: ["400", "500", "700"],
  style: "normal",
  display: "swap",
  variable: "--chakra-petch",
  subsets: ["latin"],
  preload: true,
});
// export const chakra_petch = Chakra_Petch({
//   weight: ["400", "500", "700"],
//   style: "normal",
//   display: "swap",
//   variable: "--chakra-petch",
//   subsets: ["latin"],
//   preload: true,
// });

export const merienda = Merienda({
  weight: ["400", "700"],
  style: "normal",
  display: "swap",
  variable: "--merienda",
  subsets: ["latin"],
  preload: true,
});
