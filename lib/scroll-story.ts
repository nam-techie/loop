/** Each photo receives a full stage-height of native scrolling, including the last. */
export function getStoryFrame(offset: number, stepHeight: number, count: number): number {
  if (count < 1 || !Number.isFinite(offset) || !Number.isFinite(stepHeight) || stepHeight <= 0) return 0
  return Math.min(count - 1, Math.max(0, Math.floor(offset / stepHeight)))
}

/** Hold a photograph first, then smoothly blend into the following one. */
export function getStoryTransition(offset: number, stepHeight: number, count: number) {
  const from = getStoryFrame(offset, stepHeight, count)
  const to = Math.min(from + 1, Math.max(0, count - 1))
  const local = Number.isFinite(offset) && Number.isFinite(stepHeight) && stepHeight > 0
    ? Math.max(0, offset / stepHeight - from) : 0
  const phase = from === to ? 0 : Math.min(1, Math.max(0, (local - 0.52) / 0.48))
  const blend = phase * phase * (3 - 2 * phase)
  return {
    from,
    to,
    blend,
    active: blend >= 0.5 ? to : from,
    fill: count > 0 ? Math.min(1, (from + blend + 1) / count) : 0,
  }
}
