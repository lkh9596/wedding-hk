import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kenkenandmanman.com"),
  title: "Ken & Man Man | April 3, 2027",
  description:
    "Join us to celebrate the wedding of Ken Lee and Man Man Jim on April 3rd, 2027 at KU Convention Wedding Hall, Seoul.",
  openGraph: {
    title: "Ken & Man Man | April 3, 2027",
    description:
      "Join us to celebrate the wedding of Ken Lee and Man Man Jim on April 3rd, 2027 at KU Convention Wedding Hall, Seoul.",
    type: "website",
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ken & Man Man" }],
  },
  twitter: { card: "summary_large_image" },
  // Keep guests’ phone numbers and email addresses out of search results.
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${playfair.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
