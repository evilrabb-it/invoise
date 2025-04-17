import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Invoise - Automating Billing",
  description: "Create and manage invoices easily with multi-currency support",
  icons: {
    icon: "/favicon.png", 
  },
  author: "Aditya Akbar",
  openGraph: {
    title: "Invoise - Automating Billing",
    description: "Create and manage invoices easily with multi-currency support",
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
    published_time: "2025-04-13T00:00:00Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoise - Automating Billing",
    description: "Create and manage invoices easily with multi-currency support",
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 
