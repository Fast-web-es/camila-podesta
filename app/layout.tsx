import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CookieProvider } from "@/components/CookieConsent";
import Layout from "@/components/Layout";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcos Morales | Graphic Designer & Artist",
  description: "A sophisticated, minimalist portfolio for a Graphic Designer and Artist featuring a gallery grid, editorial layout, and smooth transitions.",
  openGraph: {
    title: "Marcos Morales | Graphic Designer & Artist",
    description: "A sophisticated, minimalist portfolio for a Graphic Designer and Artist featuring a gallery grid, editorial layout, and smooth transitions.",
    images: ["/images/commercial/nat-geo-asombrosamente/1.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos Morales | Graphic Designer & Artist",
    description: "A sophisticated, minimalist portfolio for a Graphic Designer and Artist featuring a gallery grid, editorial layout, and smooth transitions.",
    images: ["/images/commercial/nat-geo-asombrosamente/1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        <CookieProvider>
          <Layout>{children}</Layout>
        </CookieProvider>
      </body>
    </html>
  );
}
