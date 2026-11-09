import { Campaign } from '@/components/campaign'
import { CollectionShowcase } from '@/components/collection-showcase'
import { AboutSection, ContactSection } from '@/components/brand-sections'

export default function Page() {
  return <>
    <Campaign />
    <div className="ticker" aria-hidden="true">MOVE YOUR WAY ↗ ADAPT TO TRAIL ↗ MOVE YOUR WAY ↗</div>
    <CollectionShowcase />
    <AboutSection />
    <ContactSection />
  </>
}
