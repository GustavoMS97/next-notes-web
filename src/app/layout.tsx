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
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
