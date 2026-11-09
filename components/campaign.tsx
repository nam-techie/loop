'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { campaignFrames, photo } from '@/lib/catalog'
import { getCampaignFrame } from '@/lib/campaign-motion'

export function Campaign() {
  const sceneRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    const stage = stageRef.current
    if (!scene || !stage) return
    // Home's scroll choreography is explicitly requested even when the browser
    // reports reduced motion. It moves only with native scrolling, never autoplay.
    const media = matchMedia('(min-height:650px)')
    const cards = Array.from(scene.querySelectorAll<HTMLElement>('.field-card'))
    const counter = scene.querySelector<HTMLElement>('.field-current')
    let frame = 0
    let visualProgress: number | null = null
    let previousTime = 0
    let previousActive = -1
    let width = 0
    let height = 0
    let header = 0
    let enabled = false

    const render = (time: number) => {
      frame = 0
      if (!enabled || height <= 0) return
      const rect = scene.getBoundingClientRect()
      const target = Math.min(1, Math.max(0, (header - rect.top) / Math.max(1, rect.height - height)))
      const pinned = rect.top <= header && rect.bottom >= header + height
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16.67
      if (visualProgress === null || !pinned || Math.abs(target - visualProgress) > .22) visualProgress = target
      else {
        visualProgress += (target - visualProgress) * (1 - Math.exp(-elapsed / 70))
        if (Math.abs(target - visualProgress) < .0001) visualProgress = target
      }
      const state = getCampaignFrame(visualProgress, width, height, cards.length)
      stage.style.setProperty('--departure', String(state.departure))
      stage.style.setProperty('--hero-opacity', String(state.heroOpacity))
      stage.style.setProperty('--gallery-opacity', String(state.galleryOpacity))
      stage.style.setProperty('--field-caption-opacity', String(state.captionOpacity))
      stage.style.setProperty('--field-progress', String(state.travel))
      stage.style.setProperty('--card-width', `${state.cardWidth}px`)
      stage.style.setProperty('--card-height', `${state.cardHeight}px`)
      scene.dataset.phase = state.phase
      cards.forEach((card, index) => {
        const pose = state.cards[index]
        card.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0) translate(-50%, -50%) rotateX(${pose.rotateX}deg) rotateY(${pose.rotateY}deg) rotateZ(${pose.rotate}deg) scale(${pose.scale})`
        card.style.zIndex = String(pose.layer)
      })
      if (previousActive !== state.active) {
        cards.forEach((card, index) => { card.dataset.current = String(index === state.active) })
        if (counter) counter.textContent = String(state.active + 1).padStart(2, '0')
        previousActive = state.active
      }
      if (visualProgress !== target) {
        previousTime = time
        frame = requestAnimationFrame(render)
      } else previousTime = 0
    }
    const update = () => { if (enabled && !frame) frame = requestAnimationFrame(render) }
    const measure = () => {
      width = stage.clientWidth
      height = stage.clientHeight
      header = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      visualProgress = null
      update()
    }
    const configure = () => {
      enabled = media.matches
      scene.dataset.motion = enabled ? 'scroll' : 'flow'
      cancelAnimationFrame(frame)
      frame = 0
      measure()
    }
    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    configure()
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', measure)
    media.addEventListener('change', configure)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      removeEventListener('scroll', update)
      removeEventListener('resize', measure)
      media.removeEventListener('change', configure)
    }
  }, [])

  return <section ref={sceneRef} id="home" className="campaign" data-motion="flow" aria-labelledby="home-title">
    <div ref={stageRef} className="campaign-stage">
      <div className="hero-opening">
        <Image className="hero-background" src={photo('6693')} alt="Forest green LOOP shirt resting on moss-covered rocks" fill preload sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-meta"><span>LOOP / FIELD COLLECTION 01</span><span>TRAIL SPIRIT. EVERYDAY EXPRESSION</span></div>
        <div className="hero-copy">
          <p className="eyebrow">A DIFFERENT WAY OUT.</p>
          <h1 id="home-title">ADAPT<br /><span>TO TRAIL</span></h1>
          <div className="hero-bottom"><p>Leave the routine behind<br />Find your rhythm outside.</p><p className="scroll-cue">Scroll into the field <span aria-hidden="true">↓</span></p></div>
        </div>
        <span className="hero-index">01 / IN YOUR ELEMENT</span>
        <span className="hero-edge" aria-hidden="true">THE EVERYDAY ENDS HERE</span>
      </div>

      <div className="field-gallery" aria-labelledby="field-title">
        <div className="field-heading"><div><p className="eyebrow">A FEW MOMENTS OUTSIDE</p><h2 id="field-title">OUTSIDE THE<br /><span>EVERYDAY</span></h2></div><p>One collection. Countless ways out<br />Follow the thread, frame by frame.</p></div>
        <div className="field-cards">{campaignFrames.map((item, index) => <figure className="field-card" key={item.id}>
          <div className="field-card-image"><Image src={photo(item.id)} alt={item.alt} fill sizes="(max-width:767px) 52vw, (max-width:1440px) 25vw, 320px" style={{ objectPosition: item.position }} /></div>
          <figcaption><span>{String(index + 1).padStart(2, '0')}</span><span>{item.label}</span></figcaption>
        </figure>)}</div>
        <div className="field-footer"><p className="field-note">A change of scenery<br /><span>A return to yourself</span></p><div className="field-position" aria-hidden="true"><span className="field-current">01</span><span className="field-line"><span /></span><span>{String(campaignFrames.length).padStart(2, '0')}</span></div><p className="scroll-cue">The collection is next <span aria-hidden="true">↓</span></p></div>
        <div className="ticker field-ribbon" aria-hidden="true">MOVE YOUR WAY ↗ ADAPT TO TRAIL ↗ MOVE YOUR WAY ↗</div>
      </div>
    </div>
  </section>
}
