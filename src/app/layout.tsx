import { JSX } from 'react'

import '@src/styles/globals.css'
import { AuthProvider } from '@src/context/AuthContext'

export const metadata = {
  title: 'Notes Web',
  description: 'A real-world notes app'
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="Notes" />
      <link rel="manifest" href="/site.webmanifest" />
      <body className="h-screen overflow-hidden flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
