/** The supplied LOOP lockup, shared by the header, intro, and footer. */
export function BrandLogo({ emblem = false }: { emblem?: boolean }) {
  return <span className={emblem ? 'brand-new brand-new-footer' : 'brand-new'} aria-hidden="true" />
}
