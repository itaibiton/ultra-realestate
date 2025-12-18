import { Nunito_Sans, Heebo } from "next/font/google";

// Primary font: Nunito Sans (Nova style)
export const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Hebrew font: Heebo
export const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Legacy alias for backward compatibility
export const inter = nunitoSans;
