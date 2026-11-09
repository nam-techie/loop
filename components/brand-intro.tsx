'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { BrandLogo } from './brand-logo'
import { photo } from '@/lib/catalog'

export function BrandIntro({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'pending' | 'playing' | 'done'>('pending')
  const panelRef = useRef<HTMLDivElement>(null)
  const siteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    // Section links and restored reading positions open directly into the site.
    if (location.pathname !== '/' || (location.hash && location.hash !== '#home') || scrollY > 100) {
      setState('done')
      return
    }

    let disposed = false
    let finished = false
    let locked = false
    let fontTimer: ReturnType<typeof setTimeout>
    const animations: Animation[] = []
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const previousFocus = document.activeElement
    const unlock = () => {
      if (locked) root.style.overflow = previousOverflow
      locked = false
    }
    const finish = () => {
      if (disposed || finished) return
      finished = true
      animations.forEach(animation => animation.cancel())
      clearTimeout(fontTimer)
      clearTimeout(safetyTimer)
      removeEventListener('keydown', escape)
      unlock()
      setState('done')
      // Release keyboard users onto a real link after the intro is removed.
      if (panel.contains(document.activeElement)) requestAnimationFrame(() => {
        if (disposed) return
        const destination = previousFocus instanceof HTMLElement && previousFocus !== document.body
          ? previousFocus : siteRef.current?.querySelector<HTMLElement>('.brand-link')
        destination?.focus({ preventScroll: true })
      })
    }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') finish() }
    addEventListener('keydown', escape)
    const safetyTimer = setTimeout(finish, 5000)

    async function play() {
      // Let AVEGA arrive, but never hold the visitor behind a font/network wait.
      await Promise.race([
        document.fonts.load('400 48px AVEGA').catch(() => {}),
        new Promise<void>(resolve => { fontTimer = setTimeout(resolve, 600) }),
      ])
      clearTimeout(fontTimer)
      if (disposed || finished) return
      if (!panel || typeof panel.animate !== 'function') { finish(); return }
      root.style.overflow = 'hidden'
      locked = true
      setState('playing')
      panel.focus({ preventScroll: true })
      const lines = panel.querySelectorAll<HTMLElement>('.intro-line')
      const easing = 'cubic-bezier(.16, 1, .3, 1)'
      const scene = panel.querySelector<HTMLElement>('.intro-scene')
      const image = panel.querySelector<HTMLElement>('.intro-scene-image')
      const trail = panel.querySelector<SVGPathElement>('.intro-trail-path')
      const signature = panel.querySelector<HTMLElement>('.intro-signature')
      if (scene) animations.push(scene.animate([
        { clipPath: 'inset(18% 49.8% 18% 49.8%)', opacity: 0, offset: 0 },
        { clipPath: 'inset(14% 46% 14% 46%)', opacity: .8, offset: .18 },
        { clipPath: 'inset(9% 28% 9% 28%)', opacity: 1, offset: .65 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, offset: 1 },
      ], { duration: 3420, easing: 'cubic-bezier(.45, 0, .2, 1)', fill: 'forwards' }))
      if (image) animations.push(image.animate([
        { transform: 'scale(1.16)' }, { transform: 'scale(1)' },
      ], { duration: 3650, easing, fill: 'forwards' }))
      if (trail) animations.push(trail.animate([
        { strokeDashoffset: 1, opacity: 0 },
        { strokeDashoffset: .45, opacity: .42, offset: .5 },
        { strokeDashoffset: 0, opacity: .12 },
      ], { delay: 100, duration: 3000, easing, fill: 'forwards' }))
      if (signature) animations.push(signature.animate([
        { opacity: 0, transform: 'translateY(8px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { delay: 700, duration: 900, easing, fill: 'forwards' }))
      lines.forEach((line, index) => {
        animations.push(line.animate([
          { transform: 'translate3d(0, 120%, 0) rotateX(-80deg)', opacity: 0 },
          { transform: 'translate3d(0, 0, 0) rotateX(0deg)', opacity: 1 },
        ], { duration: 1000, delay: 230 + index * 380, easing, fill: 'forwards' }))
        animations.push(line.animate([
          { transform: 'translate3d(0, 0, 0) rotateX(0deg)', opacity: 1 },
          { transform: 'translate3d(0, -125%, 0) rotateX(65deg)', opacity: 0 },
        ], { duration: 620, delay: 2370 + index * 130, easing: 'cubic-bezier(.7, 0, .84, 0)', fill: 'forwards' }))
      })
      const reveal = panel.animate([
        { opacity: 1 },
        { opacity: 0 },
      ], { delay: 3220, duration: 580, easing: 'cubic-bezier(.45, 0, .2, 1)', fill: 'forwards' })
      animations.push(reveal)
      reveal.finished.then(finish).catch(() => {})
    }
    void play().catch(finish)
    return () => {
      disposed = true
      clearTimeout(fontTimer)
      clearTimeout(safetyTimer)
      removeEventListener('keydown', escape)
      animations.forEach(animation => animation.cancel())
      unlock()
    }
  }, [])

  return <>
    <noscript><style>{'.brand-intro { display: none !important; }'}</style></noscript>
    {state !== 'done' && <div ref={panelRef} className="brand-intro" data-state={state} role="dialog" tabIndex={-1} aria-modal={state === 'playing'} aria-label="LOOP introduction">
      <div className="intro-scene" aria-hidden="true">
        <div className="intro-scene-image"><Image src={photo('6693')} alt="" fill sizes="100vw" loading="eager" /></div>
        <div className="intro-scene-shade" />
      </div>
      <svg className="intro-trail" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path className="intro-trail-path" pathLength="1" d="M-100 820C160 870 250 640 430 620C635 596 1050 870 1150 605C1270 290 755 120 565 260C330 435 890 620 1040 180C1110-25 1350 20 1510 90" /></svg>
      <div className="intro-signature" aria-hidden="true"><BrandLogo /></div>
      <div className="intro-copy">
        <div className="intro-line-window"><h2 className="intro-line">ADAPT TO TRAIL</h2></div>
        <div className="intro-line-window"><h2 className="intro-line intro-line-accent">MAKE FOR YOU</h2></div>
      </div>
    </div>}
    <div ref={siteRef} className="intro-site" inert={state === 'playing'}>{children}</div>
  </>
}
