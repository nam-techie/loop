import type { Metadata, Viewport } from 'next'
import { StoreShell } from '@/components/store-shell'
import './globals.css'
export const metadata: Metadata = { title: { default: 'LOOP — Adapt to Trail', template: '%s — LOOP' }, description: 'Trail spirit. Everyday expression. Discover the LOOP Trail Long Sleeve in Forest and Warm White.' }
export const viewport: Viewport = { themeColor: '#033224', colorScheme: 'dark' }
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="en"><body><StoreShell>{children}</StoreShell></body></html> }
