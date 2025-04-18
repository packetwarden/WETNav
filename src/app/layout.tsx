// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- Configuration ---
const TOOL_NAME = "Windows Event Threat Navigator"; // <<< REPLACE with your chosen tool name
const TOOL_DESCRIPTION = "Quick reference for Windows security event investigations"; // <<< Update description
// --- End Configuration ---

export const metadata: Metadata = {
  title: TOOL_NAME, // Use the new tool name
  description: TOOL_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        {/* Use Flexbox to structure Header, Main Content, Footer */}
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* Main content area that grows */}
          <main className="flex-grow w-full">
             {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
