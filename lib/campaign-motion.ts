const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }
const phase = (progress: number, start: number, end: number) => ease((progress - start) / (end - start))

// All phases share section-local progress, so the scene is reversible and resizing
// never leaves behind an accumulated transform or a wheel-driven animation queue.
export function getCampaignFrame(progress: number, width: number, height: number, count: number) {
  const p = Number.isFinite(progress) ? clamp(progress) : 0
  const w = Number.isFinite(width) && width > 0 ? width : 390
  const h = Number.isFinite(height) && height > 0 ? height : 700
  const total = Math.max(1, Math.floor(Number.isFinite(count) ? count : 1))
  const compact = w < 768
  const cardWidth = compact ? clamp(w * .49, 146, 240) : clamp(w * .205, 190, 300)
  const cardHeight = Math.min(cardWidth * 1.32, h * (h < 650 ? .4 : .49))
  const gap = compact ? 18 : clamp(w * .023, 22, 36)
  const firstX = w * (compact ? .43 : .2)
  const lastX = firstX + (total - 1) * (cardWidth + gap)
  const distance = Math.max(0, lastX - (w - firstX))
  const departure = phase(p, .025, .34)
  const spread = phase(p, .21, .48)
  const travel = phase(p, .5, .91)
  const galleryOpacity = phase(p, .12, .265)
  const rotations = [-15, 10, -7, 17, -11, 6, -18, 3]
  const stagger = [-.045, .035, -.025, .055, -.04, .02, -.055, .025]
  const cards = Array.from({ length: total }, (_, i) => {
    const seed = i % rotations.length
    const pileX = w * (compact ? .5 : .64) + (i - (total - 1) / 2) * (compact ? 5 : 9)
    const pileY = h * .59 + (i % 3 - 1) * 13
    const rowX = firstX + i * (cardWidth + gap) - travel * distance
    return {
      x: mix(pileX, rowX, spread),
      y: mix(pileY, h * (compact ? .51 : h < 650 ? .58 : .56) + stagger[seed] * h, spread),
      rotate: mix(rotations[seed], rotations[seed] * .15, spread),
      rotateY: mix(-26 + seed * 5, 0, spread),
      rotateX: mix(12, 0, spread),
      scale: mix(.82 + seed * .016, 1, spread),
      layer: total - i,
    }
  })
  // This counter measures the complete strip, rather than the center-most card
  // (several photos are visible together on desktop). It always reaches the end.
  const active = Math.min(total - 1, Math.floor(travel * total))
  return {
    cards, cardWidth, cardHeight, active, travel,
    departure,
    heroOpacity: 1 - phase(p, .055, .275),
    galleryOpacity,
    captionOpacity: phase(p, .25, .39),
    phase: p < .17 ? 'arrival' : p < .5 ? 'gather' : 'gallery',
  }
}
