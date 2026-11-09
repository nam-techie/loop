/** Official supplied PNG silhouettes, colored through their original alpha masks. */
export function BrandLogo({ emblem = false }: { emblem?: boolean }) {
  return <span className={`brand-lockup${emblem ? ' brand-lockup-footer' : ''}`} aria-hidden="true">
    {emblem && <span className="brand-emblem" />}
    <span className="brand-wordmark" />
  </span>
}
