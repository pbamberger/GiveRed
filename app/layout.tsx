import type { Metadata } from 'next'
import './globals.css'
import ThemeRegistry from './ThemeRegistry'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://givered.nz'),
  title: {
    template: '%s — GiveRed',
    default: 'GiveRed — Give blood. Together.',
  },
  description: 'Start or join a blood donation group with your whānau, workmates, or community — and make donating a regular habit.',
  openGraph: {
    siteName: 'GiveRed',
    locale: 'en_NZ',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ">
      <body>
        <ThemeRegistry>
          {/* Skip to main content — WCAG 2.4.1 */}
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <NavBar />
          <main id="main-content" style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  )
}
