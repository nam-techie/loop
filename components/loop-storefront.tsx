'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, ShoppingBag, X } from 'lucide-react'

const images = [
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-X4qbzVaf2mf0Dyi8tgvncEQ0JziUMH.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B973C1E94-ED81-4E8C-AF39-0840D6460AB6%7D-AGkPlBG89SGzL4G6L0EjjJPEZby2MS.png',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B3690D87C-F736-4A0D-BF2E-215E659BDB12%7D-laNpIvX3w99z8QCVrh64jSGUQU6H2O.png',
]

const products = [
  { name: 'Field Jacket 01', price: '$168', image: images[0], note: 'Weathered canvas / Olive' },
  { name: 'Loop Overshirt', price: '$128', image: images[1], note: 'Heavy cotton / Moss' },
  { name: 'Moss Work Jacket', price: '$188', image: images[2], note: 'Utility twill / Forest' },
]

type Page = 'home' | 'collections' | 'about' | 'contact' | 'cart'

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return progress
}

export function LoopStorefront() {
  const [page, setPage] = useState<Page>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const navigate = (nextPage: Page) => {
    setPage(nextPage)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = () => setCartCount((count) => count + 1)

  return (
    <main className="min-h-screen bg-[#002901] text-[#f2f0e8] selection:bg-[#fd3e00] selection:text-[#002901]">
      <header className="sticky top-0 z-50 border-b border-[#f2f0e8]/15 bg-[#002901]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <button onClick={() => navigate('home')} className="font-display text-2xl font-bold tracking-[-0.08em]" aria-label="Loop home">LOOP<span className="text-[#fd3e00]">.</span></button>
          <nav className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.22em] md:flex" aria-label="Main navigation">
            {(['home', 'collections', 'about', 'contact'] as Page[]).map((item) => <button key={item} onClick={() => navigate(item)} className={`transition-colors ${page === item ? 'text-[#fd3e00]' : 'hover:text-[#fd3e00]'}`}>{item === 'home' ? 'Home' : item}</button>)}
          </nav>
          <div className="flex items-center gap-5">
            <button onClick={() => navigate('cart')} className="relative flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em]" aria-label={`Cart with ${cartCount} items`}><ShoppingBag size={17} strokeWidth={1.4} /><span className="hidden sm:inline">Cart</span><span className="absolute -right-3 -top-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#fd3e00] px-1 text-[9px] text-[#002901]">{cartCount}</span></button>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 border-t border-[#f2f0e8]/15 bg-[#002901] px-5 py-6 text-xs uppercase tracking-[0.2em] md:hidden">{(['home', 'collections', 'about', 'contact', 'cart'] as Page[]).map((item) => <button key={item} className="text-left" onClick={() => navigate(item)}>{item}</button>)}</nav>}
      </header>

      {page === 'home' && <HomePage navigate={navigate} />}
      {page === 'collections' && <CollectionsPage addToCart={addToCart} />}
      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}
      {page === 'cart' && <CartPage cartCount={cartCount} navigate={navigate} />}
    </main>
  )
}

function HomePage({ navigate }: { navigate: (page: Page) => void }) {
  const progress = useScrollProgress()

  return <>
    <div className="fixed bottom-0 left-5 top-20 z-40 hidden w-px bg-[#f2f0e8]/15 md:block" aria-hidden="true"><div className="relative w-full bg-[#fd3e00] transition-[height] duration-100" style={{ height: `${progress * 100}%` }}><span className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-[#fd3e00] shadow-[0_0_0_4px_#002901]" /></div></div>
    <section className="relative flex min-h-[110vh] items-end overflow-hidden pt-20"><img src={images[0]} alt="Model wearing Loop field jacket in the forest" className="absolute inset-0 h-full w-full object-cover opacity-55" style={{ transform: `translateY(${progress * -12}%) scale(${1 + progress * 0.08})` }} /><div className="absolute inset-0 bg-gradient-to-t from-[#002901] via-[#002901]/25 to-[#002901]/30" /><div className="relative mx-auto w-full max-w-[1400px] px-5 pb-20 md:px-10 md:pb-32"><p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#fd3e00]">01 — Hero banner / SS26</p><div className="overflow-visible"><h1 className="whitespace-nowrap font-display text-[clamp(5rem,15vw,13rem)] font-bold leading-[0.72] tracking-[-0.1em] transition-transform duration-75" style={{ transform: `translateX(${progress * -18}vw)` }}>Made <span className="text-[#fd3e00]">to roam.</span></h1></div><p className="mt-8 max-w-sm text-sm leading-6 text-[#f2f0e8]/70" style={{ opacity: Math.max(0, 1 - progress * 2), transform: `translateY(${progress * -50}px)` }}>Utility silhouettes shaped by the forest. Designed in Saigon, made for the long way around.</p><button onClick={() => navigate('collections')} className="mt-10 inline-flex items-center gap-3 border border-[#f2f0e8]/50 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] hover:border-[#fd3e00] hover:bg-[#fd3e00] hover:text-[#002901]">Shop the collection <ArrowDown size={15} /></button></div></section>
    <section className="relative mx-auto grid min-h-[90vh] max-w-[1400px] items-center gap-10 overflow-hidden px-5 py-24 md:grid-cols-12 md:px-10 md:py-32"><div className="md:col-span-5" style={{ transform: `translateY(${(progress - 0.35) * -80}px)` }}><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#fd3e00]">02 — Brand message</p><h2 className="mt-7 font-display text-6xl font-bold leading-[0.84] tracking-[-0.08em] md:text-8xl">Built for<br />the in-<br /><span className="text-[#fd3e00]">between.</span></h2></div><div className="md:col-span-5 md:col-start-8 md:pt-20" style={{ transform: `translateY(${(progress - 0.45) * 100}px)` }}><img src={images[2]} alt="Loop jacket resting among moss and forest floor" className="mb-8 aspect-[0.85] w-full object-cover" style={{ transform: `translateY(${progress * -10}%)` }} /><p className="text-xl leading-8 text-[#f2f0e8]/80">LOOP is a study of movement, utility, and the places where city meets wild. Every garment is made to collect stories, not dust.</p><button onClick={() => navigate('about')} className="mt-8 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]">Our story <ArrowUpRight size={15} className="text-[#fd3e00]" /></button></div></section>
    <Footer navigate={navigate} />
  </>
}

function CollectionsPage({ addToCart }: { addToCart: () => void }) {
  return <section className="mx-auto min-h-[calc(100vh-80px)] max-w-[1400px] px-5 py-20 md:px-10 md:py-28"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#fd3e00]">Collections / Product list</p><div className="mt-5 flex items-end justify-between"><h1 className="font-display text-7xl font-bold leading-[0.8] tracking-[-0.09em] md:text-[10rem]">Field<br /><span className="text-[#fd3e00]">uniforms.</span></h1><span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#f2f0e8]/50 md:block">03 pieces / SS26</span></div><div className="mt-16 grid gap-6 md:grid-cols-3">{products.map((product) => <article key={product.name}><div className="group relative aspect-[0.78] overflow-hidden"><img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b0f08]/50 to-transparent" /></div><div className="flex justify-between pt-4 text-[11px] font-semibold uppercase tracking-[0.14em]"><span>{product.name}</span><span>{product.price}</span></div><p className="mt-2 text-xs text-[#f2f0e8]/50">{product.note}</p><button onClick={addToCart} className="mt-4 border-b border-[#fd3e00] pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fd3e00]">Add to cart +</button></article>)}</div></section>
}

function AboutPage() { return <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1400px] items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-10"><div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#fd3e00]">About / Our story</p><h1 className="mt-7 font-display text-7xl font-bold leading-[0.8] tracking-[-0.09em] md:text-[9rem]">Outside<br /><span className="text-[#fd3e00]">the lines.</span></h1><p className="mt-10 max-w-md text-lg leading-8 text-[#f2f0e8]/75">We make quiet, considered clothing for people who move through the world with curiosity. Designed in Saigon. Inspired by the forest. Made for the long way around.</p></div><img src={images[1]} alt="Loop overshirt among forest leaves" className="aspect-[0.82] w-full object-cover" /></section> }

function ContactPage() { return <section className="mx-auto min-h-[calc(100vh-80px)] max-w-[1400px] px-5 py-20 md:px-10 md:py-28"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#fd3e00]">Contact / Social links + FAQs</p><h1 className="mt-6 max-w-4xl font-display text-7xl font-bold leading-[0.8] tracking-[-0.09em] md:text-[10rem]">Keep in<br /><span className="text-[#fd3e00]">touch.</span></h1><div className="mt-20 grid gap-12 border-t border-[#f2f0e8]/15 pt-8 md:grid-cols-2"><div><p className="text-sm leading-7 text-[#f2f0e8]/65">Questions about fit, delivery, or the next field note? Our team is on the other side.</p><div className="mt-8 flex flex-col gap-5 text-sm"><a href="mailto:hello@loop-studio.example" className="hover:text-[#fd3e00]">hello@loop-studio.example <ArrowUpRight className="inline" size={14} /></a><a href="#instagram" className="hover:text-[#fd3e00]"><span className="mr-2 inline-block text-[#fd3e00]">IG</span> @loop.outside</a></div></div><div><details className="border-t border-[#f2f0e8]/20 py-5"><summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em]">How does the fit run?</summary><p className="pt-4 text-sm leading-6 text-[#f2f0e8]/60">Our pieces are relaxed through the body. Choose your usual size for room to move.</p></details><details className="border-y border-[#f2f0e8]/20 py-5"><summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.18em]">Where do you ship?</summary><p className="pt-4 text-sm leading-6 text-[#f2f0e8]/60">We ship worldwide from Saigon in recycled, low-impact packaging.</p></details></div></div></section> }

function CartPage({ cartCount, navigate }: { cartCount: number, navigate: (page: Page) => void }) { return <section className="mx-auto min-h-[calc(100vh-80px)] max-w-[1400px] px-5 py-20 md:px-10 md:py-28"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#fd3e00]">Cart / Cart page + checkout</p><h1 className="mt-6 font-display text-7xl font-bold leading-[0.8] tracking-[-0.09em] md:text-[10rem]">Your<br /><span className="text-[#fd3e00]">field kit.</span></h1><div className="mt-20 border-t border-[#f2f0e8]/20 pt-6">{cartCount === 0 ? <div className="flex flex-col items-start gap-6"><p className="text-lg text-[#f2f0e8]/65">Your cart is waiting for its first story.</p><button onClick={() => navigate('collections')} className="border border-[#fd3e00] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-[#fd3e00] hover:text-[#002901]">Explore collection</button></div> : <div className="flex max-w-xl justify-between text-sm"><span>Field Jacket 01 × {cartCount}</span><span>${168 * cartCount}</span></div>}</div></section> }

function Footer({ navigate }: { navigate: (page: Page) => void }) { return <footer className="border-t border-[#f2f0e8]/15 px-5 py-10 md:px-10"><div className="mx-auto flex max-w-[1400px] flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><button onClick={() => navigate('home')} className="font-display text-3xl font-bold tracking-[-0.08em]">LOOP<span className="text-[#fd3e00]">.</span></button><p className="mt-3 text-xs text-[#f2f0e8]/50">Utility clothing for outside the lines.</p></div><div className="flex gap-6 text-[10px] uppercase tracking-[0.18em] text-[#f2f0e8]/65"><button onClick={() => navigate('collections')}>Shop</button><button onClick={() => navigate('about')}>About</button><button onClick={() => navigate('contact')}>Contact</button></div><p className="text-[9px] uppercase tracking-[0.18em] text-[#f2f0e8]/35">© 2026 Loop Studio / Saigon</p></div></footer> }
