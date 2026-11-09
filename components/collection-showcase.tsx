'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { collectionFrames, colorName, photo } from '@/lib/catalog'
import { getStoryTransition } from '@/lib/scroll-story'

export function CollectionShowcase() {
  const track = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'flow' | 'scroll'>('flow')
  const [active, setActive] = useState(0)
  const initialHashAligned = useRef(false)

  useEffect(() => {
    // Short landscape screens use the fully visible sequence instead of a cramped pin.
    // Reduced motion retains the scroll-driven dissolve but omits spatial motion.
    const media = matchMedia('(min-height:560px)')
    const configure = () => setMode(media.matches ? 'scroll' : 'flow')
    configure()
    media.addEventListener('change', configure)
    return () => media.removeEventListener('change', configure)
  }, [])

  useEffect(() => {
    if (initialHashAligned.current || (matchMedia('(min-height:560px)').matches && mode !== 'scroll')) return
    initialHashAligned.current = true
    const id = location.hash.slice(1)
    if (!['home', 'collections', 'about', 'contact'].includes(id)) return
    // The SSR photo list becomes a sticky scene during hydration. Re-align a deep
    // link after that layout change and font loading, unless the visitor intervenes.
    let cancelled = false
    let frame = 0
    const cancel = () => { cancelled = true }
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const
    events.forEach(event => addEventListener(event, cancel, { passive: true, once: true }))
    document.fonts.ready.then(() => {
      frame = requestAnimationFrame(() => {
        if (!cancelled) document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' })
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      events.forEach(event => removeEventListener(event, cancel))
    }
  }, [mode])

  useEffect(() => {
    const element = track.current
    const viewport = stage.current
    if (!element || !viewport || mode !== 'scroll') return
    const photos = Array.from(element.querySelectorAll<HTMLElement>('.story-photo'))
    const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)')
    let frame = 0
    let visualPosition: number | null = null
    let previousTime = 0
    const render = (time: number) => {
      frame = 0
      const header = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      const rect = element.getBoundingClientRect()
      const height = viewport.getBoundingClientRect().height
      if (height <= 0) return
      const offset = header - rect.top
      const target = Math.min(collectionFrames.length - 1, Math.max(0, offset / height))
      const pinned = rect.top <= header && rect.bottom >= header + height
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16.67
      if (visualPosition === null || !pinned || Math.abs(target - visualPosition) > 1.5) {
        visualPosition = target
      } else {
        // Ease the visuals, never the document scroll or wheel/touch input.
        const settlingTime = reducedMotion.matches ? 55 : 85
        visualPosition += (target - visualPosition) * (1 - Math.exp(-elapsed / settlingTime))
        if (Math.abs(target - visualPosition) < 0.001) visualPosition = target
      }
      const state = getStoryTransition(visualPosition * height, height, collectionFrames.length)
      photos.forEach((photo, index) => {
        const outgoing = index === state.from
        const incoming = state.to !== state.from && index === state.to && state.blend > 0
        // Keep the outgoing image opaque under the incoming layer: no dark flash.
        photo.style.setProperty('--photo-opacity', outgoing ? '1' : incoming ? String(state.blend) : '0')
        photo.style.setProperty('--photo-visibility', outgoing || incoming ? 'visible' : 'hidden')
        photo.style.setProperty('--photo-layer', incoming ? '2' : outgoing ? '1' : '0')
        const shift = reducedMotion.matches ? 0 : outgoing ? -state.blend * 4 : incoming ? (1 - state.blend) * 6 : 0
        photo.style.setProperty('--photo-shift', `${shift}%`)
      })
      viewport.style.setProperty('--story-fill', String(state.fill))
      viewport.style.setProperty('--caption-opacity', reducedMotion.matches ? '1' : String(1 - Math.sin(state.blend * Math.PI) * 0.65))
      setActive(previous => previous === state.active ? previous : state.active)
      if (visualPosition !== target) {
        previousTime = time
        frame = requestAnimationFrame(render)
      } else {
        previousTime = 0
      }
    }
    const update = () => { if (!frame) frame = requestAnimationFrame(render) }
    const reset = () => { visualPosition = null; update() }
    const observer = new ResizeObserver(reset)
    observer.observe(viewport)
    update()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', reset)
    reducedMotion.addEventListener('change', reset)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      removeEventListener('scroll', update)
      removeEventListener('resize', reset)
      reducedMotion.removeEventListener('change', reset)
    }
  }, [mode])

  const current = collectionFrames[active]
  if (!current) return null

  return <section id="collections" className="collection" aria-labelledby="collection-title">
    <div className="section collection-intro"><p className="eyebrow">02 / THE FIELD COLLECTION</p><h2 id="collection-title">ONE LOOP<br /><span>TWO EXPRESSIONS</span></h2><div className="collection-intro-bottom"><p>One silhouette. Forest and Warm White<br />A collection told one photograph at a time.</p><p className="scroll-cue">Keep scrolling to explore <span aria-hidden="true">↓</span></p></div></div>
    <div ref={track} className="collection-track" data-mode={mode} style={{ '--frame-count': collectionFrames.length } as CSSProperties}>
      <div ref={stage} className="collection-stage" role="group" aria-label="Collection photo story" data-frame={active + 1}>
        <div className="story-caption" aria-hidden={mode !== 'scroll'}>
          <p className="eyebrow">LOOP TRAIL LONG SLEEVE</p>
          <div className="story-copy"><span className="color-tag"><span className={`color-dot ${current.color}`} />{colorName(current.color)}</span><h3>{current.title}</h3><p>{current.caption}</p></div>
          <div className="story-status"><span className="story-count">{String(active + 1).padStart(2, '0')} <span>/ {String(collectionFrames.length).padStart(2, '0')}</span></span><div className="story-progress" role="progressbar" aria-label="Collection photographs" aria-valuemin={1} aria-valuemax={collectionFrames.length} aria-valuenow={active + 1}><span /></div><p>{active === collectionFrames.length - 1 ? 'The last look. Our story is next ↓' : 'Scroll to the next photograph ↓'}</p></div>
        </div>
        <div className="story-photos">{collectionFrames.map((item, index) => <figure className="story-photo" key={item.id} data-active={active === index} aria-hidden={mode === 'scroll' && active !== index}><div className="story-image"><picture>{item.mobileId && <source media="(max-width:767px)" srcSet={photo(item.mobileId)} />}<Image src={photo(item.id)} alt={item.alt} fill sizes="(max-width:767px) 100vw, 66vw" loading={mode === 'scroll' && index <= active + 1 ? 'eager' : 'lazy'} /></picture></div><figcaption className="flow-caption"><p className="eyebrow">{String(index + 1).padStart(2, '0')} / {colorName(item.color)}</p><h3>{item.title}</h3><p>{item.caption}</p></figcaption></figure>)}</div>
      </div>
    </div>
  </section>
}
