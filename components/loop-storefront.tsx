'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUpRight, ChevronDown, Instagram, Menu, ShoppingBag, X } from 'lucide-react'

const images = [
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X4qbzVaf2mf0Dyi8tgvncEQ0JziUMH.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B973C1E94-ED81-4E8C-AF39-0840D6460AB6%7D-AGkPlBG89SGzL4G6L0EjjJPEZby2MS.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B3690D87C-F736-4A0D-BF2E-215E659BDB12%7D-laNpIvX3w99z8QCVrh64jSGUQU6H2O.png',
]

const products = [
  { name: 'FIELD JACKET 01', price: '$168', image: images[0], label: 'CORE PIECE' },
  { name: 'LOOP OVERSHIRT', price: '$128', image: images[1], label: 'NEW ARRIVAL' },
  { name: 'MOSS WORK JACKET', price: '$188', image: images[2], label: 'LIMITED' },
]

export function LoopStorefront() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [selected, setSelected] = useState(0)

  const addToCart = () => setCartCount((count) => count + 1)

  return (
    <main className="min-h-screen overflow-hidden bg-[#151b11] text-[#f1ead6] selection:bg-[#a9b65b] selection:text-[#151b11]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#f1ead6]/15 bg-[#151b11]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="font-display text-2xl font-bold tracking-[-0.08em]" aria-label="Loop home">LOOP<span className="text-[#a9b65b]">.</span></a>
          <nav className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.22em] md:flex" aria-label="Main navigation">
            <a className="text-[#a9b65b]" href="#shop">Shop</a>
            <a className="transition-colors hover:text-[#a9b65b]" href="#story">Our story</a>
            <a className="transition-colors hover:text-[#a9b65b]" href="#journal">Journal</a>
          </nav>
          <div className="flex items-center gap-5">
            <a href="#cart" className="relative flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em]" aria-label={`Shopping bag with ${cartCount} items`}>
              <ShoppingBag size={17} strokeWidth={1.4} /> <span className="hidden sm:inline">Bag</span>
              <span className="absolute -right-3 -top-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#a9b65b] px-1 text-[9px] text-[#151b11]">{cartCount}</span>
            </a>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 border-t border-[#f1ead6]/15 bg-[#151b11] px-5 py-6 text-xs uppercase tracking-[0.2em] md:hidden"><a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a><a href="#story" onClick={() => setMenuOpen(false)}>Our story</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a></nav>}
      </header>

      <section id="top" className="relative flex min-h-[92vh] items-end pt-20">
        <img src={images[0]} alt="Model wearing the Loop field jacket in a dense forest" className="absolute inset-0 h-full w-full object-cover object-center opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151b11] via-[#151b11]/15 to-[#151b11]/35" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-12 md:px-10 md:pb-20">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#b9c66b]">SS26 / Field notes 001</p>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h1 className="max-w-3xl font-display text-[clamp(4.5rem,14vw,12rem)] font-bold leading-[0.76] tracking-[-0.09em]">Made<br /><span className="ml-[12vw] text-[#b9c66b]">to roam.</span></h1>
            <div className="max-w-xs pb-2 text-sm leading-6 text-[#f1ead6]/75">Utility silhouettes shaped by the forest. Designed in Saigon, made for the long way around.</div>
          </div>
          <a href="#shop" className="mt-10 inline-flex items-center gap-3 border border-[#f1ead6]/50 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-[#b9c66b] hover:bg-[#b9c66b] hover:text-[#151b11]">Explore collection <ArrowDown size={15} /></a>
        </div>
        <div className="absolute bottom-7 right-5 hidden text-right text-[9px] uppercase tracking-[0.2em] text-[#f1ead6]/60 md:block md:right-10">A quiet study<br />in movement / 01</div>
      </section>

      <section id="story" className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-36">
        <div className="md:col-span-4"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a9b65b]">01 — The idea</p><h2 className="mt-8 font-display text-5xl font-bold leading-[0.9] tracking-[-0.06em] md:text-7xl">Built for<br />the in-<br />between.</h2></div>
        <div className="md:col-span-5 md:col-start-8 md:pt-16"><p className="text-xl leading-8 text-[#f1ead6]/85 md:text-2xl md:leading-9">LOOP is a study of movement, utility, and the places where city meets wild. Every garment is made to collect stories, not dust.</p><div className="mt-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a9b65b]">Read our story <ArrowUpRight size={15} /></div></div>
      </section>

      <section id="shop" className="bg-[#e1dfc8] px-5 py-20 text-[#151b11] md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]"><div className="mb-12 flex items-end justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7d8d3e]">02 — The collection</p><h2 className="mt-5 font-display text-6xl font-bold leading-[0.85] tracking-[-0.08em] md:text-8xl">Field<br />uniforms.</h2></div><span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#151b11]/50 md:block">03 / 03 pieces</span></div>
          <div className="grid gap-5 md:grid-cols-3">{products.map((product, index) => <article key={product.name} className="group"><button onClick={() => setSelected(index)} className={`relative block aspect-[0.78] w-full overflow-hidden text-left ${selected === index ? 'ring-2 ring-[#7d8d3e] ring-offset-4 ring-offset-[#e1dfc8]' : ''}`}><img src={product.image} alt={`${product.name} product photograph`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b0f08]/60 via-transparent to-transparent" /><span className="absolute left-4 top-4 bg-[#a9b65b] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em]">{product.label}</span><span className="absolute bottom-4 right-4 rounded-full border border-[#f1ead6]/60 p-2 text-[#f1ead6]"><ArrowUpRight size={18} /></span></button><div className="flex justify-between pt-4 text-[11px] font-semibold uppercase tracking-[0.15em]"><span>{product.name}</span><span>{product.price}</span></div><button onClick={addToCart} className="mt-3 border-b border-[#151b11]/40 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors hover:border-[#7d8d3e] hover:text-[#7d8d3e]">Add to bag +</button></article>)}</div>
        </div>
      </section>

      <section id="journal" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-36"><div className="mx-auto grid max-w-[1400px] items-center gap-12 md:grid-cols-2"><div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a9b65b]">03 — Field journal</p><h2 className="mt-7 max-w-xl font-display text-6xl font-bold leading-[0.86] tracking-[-0.08em] md:text-8xl">The forest<br /><span className="text-[#a9b65b]">keeps score.</span></h2><p className="mt-8 max-w-md text-sm leading-6 text-[#f1ead6]/65">Notes from the trail: on weathered canvas, slow mornings, and dressing with intent.</p><button className="mt-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]">Read the journal <ArrowUpRight size={15} className="text-[#a9b65b]" /></button></div><div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-5 border border-[#a9b65b]/30" /><img src={images[2]} alt="Loop jacket resting among moss and forest floor" className="relative aspect-[0.78] w-full object-cover" /><span className="absolute -bottom-6 -left-7 font-display text-7xl font-bold tracking-[-0.1em] text-[#a9b65b]">LOOP</span></div></div></section>

      <footer id="cart" className="border-t border-[#f1ead6]/15 px-5 py-10 md:px-10"><div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><div className="font-display text-3xl font-bold tracking-[-0.08em]">LOOP<span className="text-[#a9b65b]">.</span></div><p className="mt-3 text-xs text-[#f1ead6]/50">Utility clothing for outside the lines.</p></div><div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.18em] text-[#f1ead6]/65"><a href="#shop">Shop</a><a href="#story">About</a><a href="#journal">Journal</a><a href="#instagram" aria-label="Instagram"><Instagram size={15} /></a></div><p className="text-[9px] uppercase tracking-[0.18em] text-[#f1ead6]/35">© 2026 Loop Studio / Saigon</p></div></footer>
    </main>
  )
}
