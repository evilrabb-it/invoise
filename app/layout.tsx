import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Invoise - Invoice Generator",
  description: "A web app built with Next.js, TypeScript, and Shadcn UI to generate professional invoices.",
  icons: {
    icon: "/favicon.png",
  },
  author: "Aditya Akbar",
  openGraph: {
    title: "Invoise - Invoice Generator",
    description: "A web app built with Next.js, TypeScript, and Shadcn UI to generate professional invoices.",
    url: "https://invoise.vercel.app",
    siteName: "Invoise",
    images: [
      {
        url: "https://invoise.vercel.app/Invoise.png",
        width: 1200,
        height: 630,
        alt: "Invoise preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoise - Automating Billing",
    description: "A web app built with Next.js, TypeScript, and Shadcn UI to generate professional invoices.",
    images: ["https://invoise.vercel.app/Invoise.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Meta tag for published time */}
        <meta property="article:published_time" content="2025-04-13T00:00:00Z" />
        <meta name="author" content="Aditya Akbar" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Invoise",
              url: "https://invoise.vercel.app",
              author: {
                "@type": "Person",
                name: "Aditya Akbar",
              },
              datePublished: "2025-04-13",
              image: "https://invoise.vercel.app/Invoise.png",
              description:
                "Create and manage invoices easily with multi-currency support",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
