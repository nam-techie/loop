'use client'

import { useEffect, useRef } from 'react'

/** One enlarged contour image pans down within its overscan, without tiling. */
export function TerrainBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = ref.current
    if (!layer) return
    let frame = 0
    let previous = -1
    const paint = () => {
      frame = 0
      const range = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, window.scrollY / range))
      // Percentage positioning stays within the single image's excess height:
      // bottom-aligned → top-aligned moves the artwork down without exposing gaps.
      const position = Math.round((1 - progress) * 10000) / 100
      if (position === previous) return
      layer.style.setProperty('--terrain-y', `${position}%`)
      previous = position
    }
    const update = () => { if (!frame) frame = requestAnimationFrame(paint) }
    paint()
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      removeEventListener('scroll', update)
      removeEventListener('resize', update)
    }
  }, [])

  return <div ref={ref} className="terrain-background" aria-hidden="true" />
}
