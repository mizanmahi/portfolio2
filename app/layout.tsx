import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
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
      className={`h-full ${hankenGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
