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
  description: "Fin-Heist offers premium CA services, Income Tax Filing, GST Returns, Company Registration, Accounting, CMA Data, DSCR, and Bank Loan Project Reports across India and Dehradun.",
  keywords: [
    "Fin-Heist", "Fin Heist", "CA in India", "Income Tax Services", "ITR Filing in Dehradun", 
    "ITR for Salaried Individuals", "ITR for Business and Professionals", "Presumptive Taxation Support 44AD 44ADA", 
    "Capital Gain Calculation Support", "GST Consultant in Dehradun", "GST Registration", "GSTR-1 Filing", 
    "GSTR-3B Filing", "Accounting & Tally", "Bookkeeping", "Ledger Scrutiny", "Balance Sheet Preparation", 
    "Tax Consultant in Dehradun", "Financial Advisor in Dehradun", "Udyam Registration", "MSME Documentation", 
    "Project Report Consultant in Dehradun", "Bank Loan Project Reports", "Mudra Loan Project Reports", 
    "Financial Projections", "DSCR Calculation", "CMA Data Preparation", "Business Loan Consultant in Dehradun", 
    "Audit Documentation", "Proprietorship Registration", "Partnership Firm Registration", "LLP Registration", 
    "Private Limited Company Registration", "Section 8 Company Registration", "Trademark Registration", 
    "PAN Card Application", "EPF Registration", "ESIC Registration", "FSSAI Food License", "Import Export Code", 
    "NGO Registration", "12A Registration", "80G Registration", "CA Certificates", "Net Worth Certificate", 
    "Turnover Certificate", "TDS Return Filing", "Advance Tax", "Bank Loan Assistance", "Working Capital Finance"
  ],
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
