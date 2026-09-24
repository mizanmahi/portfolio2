import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  display: "swap",
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mizanur Rahman — Full-Stack Web Developer",
  description: "Portfolio of Mizanur Rahman, a Full-Stack Web Developer based in Dhaka, Bangladesh.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      data-theme="dark"
      lang="en"
      className={`h-full ${hankenGrotesk.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
