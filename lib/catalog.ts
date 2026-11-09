export type Color = 'forest' | 'white'
export const photo = (id: string) => `/images/loop-${id}.webp`
export const colorName = (color: Color) => color === 'forest' ? 'Forest' : 'Warm White'
export const collection = { name: 'LOOP Trail Long Sleeve' }

// Array order is the scroll order. Add photographs here; the scene length adapts.
export const collectionFrames: { id: string; mobileId?: string; color: Color; title: string; caption: string; alt: string }[] = [
  { id: '6693', mobileId: '6690', color: 'forest', title: 'Rooted outside.', caption: 'A deeper shade of the everyday. Meet Forest.', alt: 'Forest LOOP shirt laid across moss-covered rocks' },
  { id: '6809', color: 'forest', title: 'Find your path.', caption: 'A familiar silhouette. A different change of scenery.', alt: 'Runner wearing the Forest long sleeve between two trees' },
  { id: '6768', color: 'forest', title: 'Closer to LOOP.', caption: 'Contrast stitching and a signature that speaks for itself.', alt: 'Close-up of the Forest shirt showing the LOOP logo and contrast stitching' },
  { id: '6674', color: 'white', title: 'A fresh perspective.', caption: 'Same spirit. A lighter expression. Meet Warm White.', alt: 'Runner wearing the Warm White long sleeve in the forest' },
  { id: '6686', color: 'white', title: 'Move your way.', caption: 'For the route you planned. And the one you didn’t.', alt: 'Back view of the Warm White long sleeve among forest leaves' },
  { id: '6532', mobileId: '6533', color: 'white', title: 'Make it your own.', caption: 'The details are only the beginning. The rest is your story.', alt: 'Sleeve and shoulder details of the Warm White LOOP long sleeve worn in the forest' },
]

export const contactChannels: { name: string; url: string | null }[] = [
  { name: 'Email', url: null },
  { name: 'Instagram', url: null },
]
