import { Campaign } from '@/components/campaign'
import { CollectionShowcase } from '@/components/collection-showcase'
import { AboutSection, ContactSection } from '@/components/brand-sections'

export default function Page() {
  return <>
    <Campaign />
    <CollectionShowcase />
    <AboutSection />
    <ContactSection />
  </>
}
