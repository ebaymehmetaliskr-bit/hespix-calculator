// File: app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer

export const metadata: Metadata = {
  title: "Fast & Easy Unit Converter | Meters, KG, Liters",
  description: "Perform instant unit conversions for mass, length, temperature, area, volume, and more. A fast, free, and easy-to-use online converter.",
  keywords: "unit converter, converter, kg to lbs, cm to inches, meter to feet, celsius to fahrenheit, online calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}