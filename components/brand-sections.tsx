import Image from 'next/image'
import { contactChannels, photo } from '@/lib/catalog'

export function AboutSection() {
  return <section id="about" className="section about-section" aria-labelledby="about-title">
    <p className="eyebrow">03 / THIS IS LOOP</p>
    <h2 id="about-title">LESS ROUTINE<br /><span>MORE OUTSIDE</span></h2>
    <div className="about-grid"><p className="lead">We believe a change of scenery can change your whole day.</p><p className="body-copy">LOOP lives between the trail and the everyday. A brand concept for people who find expression in movement — and room for discovery in the familiar. You don’t have to go far to find a different perspective.</p></div>
    <figure className="about-photo"><Image src={photo('6686')} alt="The Warm White LOOP shirt surrounded by forest" fill sizes="90vw" /><figcaption>Movement, on your own terms.</figcaption></figure>
    <div className="about-principles">
      <div><p className="eyebrow">01 / THE INSPIRATION</p><h3>Trail spirit</h3><p>Fresh air. Different terrain. A little room to discover what’s around the next corner.</p></div>
      <div><p className="eyebrow">02 / THE EXPRESSION</p><h3>Everyday instinct</h3><p>A distinctive silhouette that belongs to your own rhythm, wherever your day takes you.</p></div>
      <div><p className="eyebrow">03 / THE POINT OF VIEW</p><h3>Your own way</h3><p>The stops, the detours, the unexpected. Make a familiar route feel like yours again.</p></div>
    </div>
  </section>
}

const faqs = [
  ['What is the Field Collection?', 'One long-sleeve silhouette, explored in two expressions: Forest and Warm White. A visual study of trail spirit and everyday style.'],
  ['How can I explore the collection?', 'Just keep scrolling. Each photograph appears in sequence, followed by the LOOP story and our contact information. Scroll back any time to revisit a look.'],
  ['What comes next?', 'More perspectives, more stories from outside. Get in touch to hear about the next chapter of LOOP.'],
]

export function ContactSection() {
  return <section id="contact" className="section contact-section" aria-labelledby="contact-title">
    <p className="eyebrow">04 / LET’S FIND COMMON GROUND</p>
    <h2 id="contact-title">STAY IN<br /><span>THE LOOP</span></h2>
    <div className="contact-grid"><div><h3>See you out there</h3><p className="body-copy">Questions about the collection or what comes next? Get in touch by phone or email.</p>{contactChannels.map(channel => <div className="contact-channel" key={channel.name}><span>{channel.name}</span>{channel.url ? <a href={channel.url}>{channel.label ?? 'Get in touch ↗'}</a> : <span>Coming soon</span>}</div>)}</div><div className="faq-list"><p className="eyebrow">A FEW THINGS TO KNOW</p>{faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></div>
  </section>
}
