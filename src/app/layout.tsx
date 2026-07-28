import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import "./globals.css";
import Providers from "@/components/Providers";
import VersionChecker from "@/components/VersionChecker";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.finheistwithus.in.net'),
  title: {
    default: "Fin-Heist | Top CA, Tax, GST & Financial Consultants in India",
    template: "%s | Fin-Heist"
  },
  description: "Fin-Heist offers premium CA services, Income Tax Filing, GST Returns, Company Registration, Accounting, CMA Data & Bank Loan Project Reports across India.",
  keywords: ["Fin-Heist", "Fin Heist", "CA in India", "Income Tax Filing", "GST Return", "Accounting Tally", "Project Reports", "CMA Data", "DSCR", "MSME Loan", "Business Compliance", "Dehradun CA", "Gurgaon CA"],
  authors: [{ name: "Fin-Heist Team" }],
  creator: "Fin-Heist",
  publisher: "Fin-Heist",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.finheistwithus.in.net",
    title: "Fin-Heist | Top CA, Tax, GST & Financial Consultants",
    description: "Expert assistance for Income Tax, GST, Accounting, Business Registration, and Financial Documentation led by CA Finalists.",
    siteName: "Fin-Heist",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fin-Heist | Financial & Tax Consultants",
    description: "Expert assistance for Income Tax, GST, Accounting, Business Registration, and Financial Documentation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-inter selection:bg-blue-600 selection:text-white">
        <Providers>
          <VersionChecker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
