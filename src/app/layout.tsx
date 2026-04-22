import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://theshoreacademy.com"),
  title: {
    default: "Ocean Safety School South Florida | Rip Current Training for All Ages | The Shore Academy",
    template: "%s | The Shore Academy",
  },
  description:
    "The Shore Academy is South Florida's only dedicated ocean safety school. Rip current training, wave navigation, and beach safety for children, teens, and adults in West Palm Beach, Boca Raton, Delray Beach, Miami, and Fort Lauderdale.",
  keywords: [
    "ocean safety school south florida",
    "rip current training",
    "ocean safety for kids",
    "junior lifeguard program florida",
    "west palm beach ocean safety",
    "boca raton swim lessons ocean",
    "delray beach ocean safety",
    "miami ocean safety school",
    "fort lauderdale ocean safety",
    "beach safety classes florida",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Shore Academy",
    images: [{ url: "/hero-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theshoreacademy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Shore Academy",
  description:
    "South Florida's only dedicated ocean safety school. Certified lifeguard instructors teaching rip current survival, wave navigation, and beach safety.",
  url: "https://theshoreacademy.com",
  logo: "https://theshoreacademy.com/logo.png",
  image: "https://theshoreacademy.com/hero-image.png",
  email: "info@theshoreacademy.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "West Palm Beach",
    addressRegion: "FL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.7153,
    longitude: -80.0534,
  },
  areaServed: ["West Palm Beach", "Boca Raton", "Delray Beach", "Miami", "Fort Lauderdale"],
  priceRange: "$175–$1499",
  sameAs: [
    "https://www.linkedin.com/company/the-shore-academy/",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S8YREKZKHN"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S8YREKZKHN');
        `}</Script>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
