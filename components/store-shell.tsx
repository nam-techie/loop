'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { BrandLogo } from './brand-logo'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'collections', label: 'Collections' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export function StoreShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('home')
  useEffect(() => {
    try { localStorage.removeItem('loop-cart-v1') } catch {}
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 })
    sections.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand-link" href="/#home" aria-label="LOOP home"><BrandLogo /></a>
      <nav aria-label="Page sections">{sections.map(({ id, label }) => <a key={id} href={`/#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
      <span className="header-note">ADAPT TO TRAIL</span>
    </header>
    <main id="main">{children}</main>
    <footer>
      <div className="footer-top"><a href="/#home" className="brand-link" aria-label="LOOP home"><BrandLogo emblem /></a><p>Off the routine.<br />Into your element.</p><p className="footer-signoff">You’ve reached the end.<br />The next chapter is outside.</p></div>
      <div className="footer-bottom"><span>© 2026 LOOP — ADAPT TO TRAIL.</span><span>Trail spirit. Everyday expression.</span><a href="/#home">Back to the beginning ↑</a></div>
    </footer>
  </>
}
