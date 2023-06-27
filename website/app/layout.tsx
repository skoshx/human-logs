import { twMerge } from 'tailwind-merge'
import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'human-logs',
  description: 'human-logs is a tiny log library that allows you to take events, explanations and solutions and connect them like lego-pieces to create user-friendly logs.',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={twMerge(inter.className, 'bg-white')}>{children}</body>
    </html>
  )
}
