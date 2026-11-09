export type Color = 'forest' | 'white'
export const photo = (id: string) => `/images/loop-${id}.webp`
export const colorName = (color: Color) => color === 'forest' ? 'Forest' : 'Warm White'
export const collection = { name: 'LOOP Trail Long Sleeve' }

// Home's editorial filmstrip. These are scenes from the same collection, not
// separate products. Order and count can change without changing the animation.
export const campaignFrames = [
  { id: '6809', label: 'Find your own way', position: '50% 42%', alt: 'Forest LOOP long sleeve worn between sunlit trees' },
  { id: '6489', label: 'Follow the feeling', position: '50% 45%', alt: 'Runner in the Warm White LOOP shirt stepping down a forest trail' },
  { id: '6768', label: 'Closer to the details', position: '50% 50%', alt: 'LOOP embroidery and contrast seams on the Forest shirt' },
  { id: '6690', label: 'Rooted outside', position: '50% 48%', alt: 'Forest LOOP shirt resting on a bed of moss' },
  { id: '6558', label: 'Move beyond routine', position: '50% 45%', alt: 'Runner in Warm White moving over a fallen tree' },
  { id: '6674', label: 'A lighter expression', position: '50% 42%', alt: 'The Warm White LOOP long sleeve worn in the forest' },
  { id: '6754', label: 'Leave room for outside', position: '50% 50%', alt: 'Warm White LOOP shirt displayed against dark forest leaves' },
  { id: '6718', label: 'Take the spirit with you', position: '50% 50%', alt: 'Green and orange LOOP collection packaging in the forest' },
]

// Array order is the scroll order. Add photographs here; the scene length adapts.
export const collectionFrames: { id: string; mobileId?: string; color: Color; title: string; caption: string; alt: string }[] = [
  { id: '6693', mobileId: '6690', color: 'forest', title: 'Rooted outside', caption: 'A deeper shade of the everyday. Meet Forest.', alt: 'Forest LOOP shirt laid across moss-covered rocks' },
  { id: '6809', color: 'forest', title: 'Find your path', caption: 'A familiar silhouette. A different change of scenery.', alt: 'Runner wearing the Forest long sleeve between two trees' },
  { id: '6768', color: 'forest', title: 'Closer to LOOP', caption: 'Contrast stitching and a signature that speaks for itself.', alt: 'Close-up of the Forest shirt showing the LOOP logo and contrast stitching' },
  { id: '6674', color: 'white', title: 'A fresh perspective', caption: 'Same spirit. A lighter expression. Meet Warm White.', alt: 'Runner wearing the Warm White long sleeve in the forest' },
  { id: '6686', color: 'white', title: 'Move your way', caption: 'For the route you planned. And the one you didn’t.', alt: 'Back view of the Warm White long sleeve among forest leaves' },
  { id: '6532', mobileId: '6533', color: 'white', title: 'Make it your own', caption: 'The details are only the beginning. The rest is your story.', alt: 'Sleeve and shoulder details of the Warm White LOOP long sleeve worn in the forest' },
]

export const contactChannels: { name: string; label?: string; url: string | null }[] = [
  { name: 'Phone', label: '+84 909 767 676', url: 'tel:+84909767676' },
  { name: 'Email', label: 'infor@loop.com', url: 'mailto:infor@loop.com' },
  { name: 'Instagram', url: null },
]
