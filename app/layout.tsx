import '../styles/global.css'
import { PageShell } from '@/components/layout/page-shell'
import { ThemeScript } from '@/components/layout/theme-script'
import { siteConfig } from '@/config/site'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.siteName,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.description,
    locale: siteConfig.locale.replace('-', '_'),
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteConfig.locale}
      className={`bg-white text-black dark:bg-[#111010] dark:text-white ${GeistSans.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  )
}
