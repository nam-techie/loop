'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { photo } from '@/lib/catalog'

export function Campaign() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const scene = ref.current
    if (!scene) return
    const media = matchMedia('(min-width:1024px) and (min-height:650px) and (prefers-reduced-motion:no-preference)')
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect()
        const progress = media.matches ? Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - innerHeight))) : 0
        scene.style.setProperty('--progress', String(progress))
      })
    }
    update()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    media.addEventListener('change', update)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', update)
      removeEventListener('resize', update)
      media.removeEventListener('change', update)
    }
  }, [])

  return <section ref={ref} id="home" className="campaign" aria-labelledby="home-title">
    <div className="hero-stage">
      <Image className="hero-background" src={photo('6693')} alt="Forest green LOOP shirt resting on moss-covered rocks" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="hero-meta"><span>LOOP / FIELD COLLECTION 01</span><span>Made for your own way out.</span></div>
      <div className="hero-copy">
        <p className="eyebrow">TRAIL SPIRIT. EVERYDAY EXPRESSION.</p>
        <h1 id="home-title">ADAPT<br />TO <span>TRAIL.</span></h1>
        <div className="hero-bottom"><p>Leave the routine behind.<br />Find your rhythm between the everyday<br className="desktop-only" /> and the unexpected.</p><p className="scroll-cue">Scroll to discover <span aria-hidden="true">↓</span></p></div>
      </div>
      <div className="hero-inset"><Image src={photo('6809')} alt="The forest LOOP long sleeve worn among trees" fill sizes="25vw" /></div>
      <div className="hero-detail"><Image src={photo('6768')} alt="LOOP logo and stitching detail" fill sizes="12vw" /></div>
      <span className="hero-index">01 / IN YOUR ELEMENT</span>
    </div>
  </section>
}
