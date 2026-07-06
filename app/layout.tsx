import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://camilapodesta.com"),
  title: {
    default: "Camila Podestá | Industrial & 3D Design",
    template: "%s | Camila Podestá",
  },
  description:
    "Industrial & 3D design based in Barcelona. Retail furniture, interior design, art & illustration by Camila Podestá.",
  icons: {
    icon: "/fav.png",
    shortcut: "/fav.png",
    apple: "/fav.png",
  },
  openGraph: {
    title: "Camila Podestá | Industrial & 3D Design",
    description:
      "Industrial & 3D design based in Barcelona. Retail furniture, interior design, art & illustration.",
    images: ["/works/retail/_home/asus.gif"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Camila Podestá | Industrial & 3D Design",
    description:
      "Industrial & 3D design based in Barcelona. Retail furniture, interior design, art & illustration.",
    images: ["/works/retail/_home/asus.gif"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
