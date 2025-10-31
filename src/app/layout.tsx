// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header"; // Import Header
import Footer from "@/components/Footer"; // Import Footer
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// --- Configuration ---
const TOOL_NAME = "Windows Event Threat Navigator";
const TOOL_DESCRIPTION = "Comprehensive reference guide for Windows Security and Sysmon events. Essential tool for SOC analysts, threat hunters, and incident responders to investigate security events with MITRE ATT&CK mappings.";
const SITE_URL = "https://wetnav.patelhari.com";
const AUTHOR_NAME = "Hari Patel";
const AUTHOR_TITLE = "Cybersecurity Researcher";
// --- End Configuration ---

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TOOL_NAME,
    template: `%s | ${TOOL_NAME}`,
  },
  description: TOOL_DESCRIPTION,
  authors: [{ name: AUTHOR_NAME, url: `${SITE_URL}/about` }],
  creator: AUTHOR_NAME,
  publisher: TOOL_NAME,
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
    creator: '@patelhari',
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
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": TOOL_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": TOOL_DESCRIPTION,
    "sameAs": [
      "https://github.com/packetwarden/WETNav"
    ],
    "founder": {
      "@type": "Person",
      "name": AUTHOR_NAME,
      "jobTitle": AUTHOR_TITLE,
      "url": `${SITE_URL}/about`,
      "description": "Cybersecurity researcher specializing in Windows event log analysis, threat detection, and incident response methodologies."
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Technical Support",
      "url": "https://github.com/packetwarden/WETNav/issues"
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-45QHJVS20N"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-45QHJVS20N');
            `,
          }}
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
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
