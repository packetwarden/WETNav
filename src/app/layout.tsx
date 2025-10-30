// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- Configuration ---
const TOOL_NAME = "Windows Event Threat Navigator"; // <<< REPLACE with your chosen tool name
const TOOL_DESCRIPTION = "Comprehensive reference guide for Windows Security and Sysmon events. Essential tool for SOC analysts, threat hunters, and incident responders to investigate security events with MITRE ATT&CK mappings."; // <<< Update description
const SITE_URL = "https://wetnavigator.com";
// --- End Configuration ---

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TOOL_NAME,
    template: `%s | ${TOOL_NAME}`,
  },
  description: TOOL_DESCRIPTION,
  keywords: [
    "Windows Security Events",
    "Sysmon Events",
    "Event Log Analysis",
    "Threat Hunting",
    "SOC",
    "SIEM",
    "Security Monitoring",
    "Incident Response",
    "MITRE ATT&CK",
    "Windows Event IDs",
    "Security Analytics",
    "Event Viewer",
    "Cybersecurity",
  ],
  authors: [{ name: "Windows Event Threat Navigator", url: SITE_URL }],
  creator: "Windows Event Threat Navigator",
  publisher: "Windows Event Threat Navigator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: TOOL_NAME,
    description: TOOL_DESCRIPTION,
    siteName: TOOL_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: TOOL_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TOOL_NAME,
    description: TOOL_DESCRIPTION,
    creator: '@packetwarden',
    images: [`${SITE_URL}/og-image.png`],
  },
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
  verification: {
    // Add your verification codes here when you set them up
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
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
