import NextAuthProvider from '@providers/NextAuthProvider'
import '@styles/globals.css'

export const metadata = {
  title: 'Stockify',
  description: 'Get ahead of everyone with Stockify',
}

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className="main">{children}</body>
      </html>
    </NextAuthProvider>
  )
}
