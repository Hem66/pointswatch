import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/lib/theme-provider'
import { ToastProvider } from '@/lib/toast-context'
import { ToastContainer } from '@/components/toast-container'
import { PointsProvider } from '@/lib/points-context'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PlugCircle - Complete Tasks & Earn Rewards',
  description: 'Complete tasks, earn rewards, climb leaderboards, and refer friends',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ToastProvider>
            <PointsProvider>
              {children}
              <ToastContainer />
            </PointsProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
