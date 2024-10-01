import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gmail Email Sender',
  description: 'Send emails using your Gmail account',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}