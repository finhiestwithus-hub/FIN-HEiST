import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fin-Heist | Tax, GST & Compliance Made Simple",
  description: "Professional assistance for Income Tax, GST, Accounting, Business Registration, Financial Documentation and Bank Loan Project Reports across India. Led by CA Finalists.",
  keywords: ["Fin-Heist", "CA in India", "Income Tax Filing", "GST Return", "Accounting Tally", "Project Reports", "CMA Data", "DSCR", "MSME Loan", "Business Compliance", "Dehradun CA"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#050816] text-slate-100 font-inter selection:bg-blue-600 selection:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
