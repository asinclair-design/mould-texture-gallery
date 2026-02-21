import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Unbounded } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#0b0c10",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://textures.rpgroupltd.com"),
  title: {
    default: "Mould Texture Gallery | RP Group",
    template: "%s | RP Group",
  },
  description:
    "A fast, searchable mould texture gallery. Click any texture to zoom and inspect surface detail.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Mould Texture Gallery | RP Group",
    description:
      "Browse mould textures by ID. Click to zoom and inspect surface detail.",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
