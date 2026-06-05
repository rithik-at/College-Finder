import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "CollegeHub",
  description: "India's premier college discovery platform. Search 50+ top colleges, compare side-by-side, and predict your admission chances with our smart predictor tool.",
  keywords: "colleges, IIT, NIT, engineering, admissions, JEE, college predictor, compare colleges",
  manifest: "/manifest.json",
  themeColor: "#1e3a5f",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CollegeHub",
  },
};

import { AuthProvider } from "@/components/auth/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
