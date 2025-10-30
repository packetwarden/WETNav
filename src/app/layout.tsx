// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- Configuration ---
const TOOL_NAME = "Windows Event Threat Navigator"; // <<< REPLACE with your chosen tool name
const TOOL_DESCRIPTION = "Windows Event Threat Navigator: Quick reference linking Windows/Sysmon events to MITRE ATT&CK®"; // <<< Update description
// --- End Configuration ---

export const metadata: Metadata = {
  title: TOOL_NAME, // Use the new tool name
  description: TOOL_DESCRIPTION,
  icons: {
    icon: '/favicon.ico', // Path to your favicon in the app directory root
    // Optional: Add other icon types if needed later
    // shortcut: '/favicon.ico',
    // apple: '/apple-icon.png', // Example: Place apple-icon.png in /public
    // other: {
    //   rel: 'apple-touch-icon-precomposed',
    //   url: '/apple-touch-icon-precomposed.png',
    // },
  },
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
