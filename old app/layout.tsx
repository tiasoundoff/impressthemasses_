
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'ImpressTheMasses - Digital Design Packs for Creators',
  description: 'Professional digital design templates for solo creators, coaches, and small businesses. Get Instagram stories, pitch decks, brand kits and more.',
  keywords: 'digital templates, design packs, Instagram stories, pitch decks, brand kits, social media templates',
  authors: [{ name: 'ImpressTheMasses' }],
  openGraph: {
    title: 'ImpressTheMasses - Digital Design Packs for Creators',
    description: 'Professional digital design templates for solo creators, coaches, and small businesses.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
