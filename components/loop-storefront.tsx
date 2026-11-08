const columns = [
  { title: 'HOME', items: ['Hero Banner', 'Brand Message', 'Footer'] },
  { title: 'COLLECTIONS', items: ['Product List'] },
  { title: 'ABOUT', items: ['Our Story'] },
  { title: 'CONTACT', items: ['Social Links', 'FAQs'] },
  { title: 'CART', items: ['Cart Page', 'Checkout'] },
]

export function LoopStorefront() {
  return (
    <main className="min-h-screen bg-[#151b11] text-[#f1ead6] selection:bg-[#a9b65b] selection:text-[#151b11]">
      <header className="border-b border-[#f1ead6]/15 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-[1500px] items-start justify-between gap-8">
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[9px] font-semibold uppercase tracking-[0.18em]" aria-label="Project sections">
            <a className="text-[#a9b65b]" href="#introduction">Introduction</a>
            <a className="transition-colors hover:text-[#a9b65b]" href="#brand-identity">Brand Identity</a>
            <a className="transition-colors hover:text-[#a9b65b]" href="#application">Application</a>
            <a className="border-b border-[#a9b65b] pb-1 text-[#a9b65b]" href="#sitemap">Campaign website</a>
            <a className="transition-colors hover:text-[#a9b65b]" href="#timeline">Timeline</a>
          </nav>
          <div className="hidden text-right text-[9px] uppercase leading-4 tracking-[0.15em] text-[#f1ead6]/55 sm:block">FPT Capstone Project<br /><span className="text-[#a9b65b]">Summer 2026 — 70%</span></div>
        </div>
      </header>

      <section id="sitemap" className="mx-auto min-h-[calc(100vh-74px)] max-w-[1500px] px-5 pb-20 pt-14 md:px-10 md:pt-20">
        <div className="max-w-xl">
          <p className="font-display text-5xl font-bold uppercase leading-[0.8] tracking-[-0.07em] text-[#a9b65b] md:text-7xl">Website</p>
          <h1 className="mt-1 font-display text-6xl font-bold italic leading-[0.8] tracking-[-0.08em] text-[#f1ead6] md:text-8xl">Sitemap</h1>
        </div>

        <div className="relative mx-auto mt-24 max-w-[1200px] md:mt-28">
          <div className="mx-auto flex w-fit items-center border-2 border-[#a9b65b] bg-[#a9b65b] px-7 py-3 font-display text-xl font-bold tracking-[-0.04em] text-[#151b11] shadow-[5px_5px_0_#0a0e08]">LOOP<span className="text-[#f1ead6]">.</span></div>
          <div className="mx-auto h-10 w-px bg-[#a9b65b]" />
          <div className="hidden h-px bg-[#a9b65b] md:block" />
          <div className="grid gap-8 md:grid-cols-5 md:gap-5">
            {columns.map((column, index) => (
              <section key={column.title} className="relative flex flex-col items-center">
                <div className="absolute -top-8 hidden h-8 w-px bg-[#a9b65b] md:block" />
                <a href={`#${column.title.toLowerCase()}`} className="z-10 flex h-12 w-full items-center justify-center border-2 border-[#a9b65b] bg-[#a9b65b] text-[11px] font-bold uppercase tracking-[0.06em] text-[#151b11] transition-all hover:bg-[#f1ead6] hover:text-[#151b11]">{column.title}</a>
                <div className="flex w-full flex-col items-center">
                  {column.items.map((item) => (
                    <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="relative mt-9 flex min-h-12 w-full items-center justify-center border border-[#a9b65b]/55 bg-[#222d19] px-3 text-center text-sm text-[#f1ead6]/90 transition-all hover:border-[#a9b65b] hover:bg-[#a9b65b] hover:text-[#151b11]">
                      <span className="absolute -top-9 left-1/2 h-9 w-px -translate-x-1/2 bg-[#a9b65b]/70" />
                      {item}
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-20 flex max-w-[1200px] items-center justify-between border-t border-[#f1ead6]/15 pt-5 text-[9px] uppercase tracking-[0.18em] text-[#f1ead6]/45"><span>LOOP / Campaign website architecture</span><span>01 — 05</span></div>
      </section>
    </main>
  )
}
