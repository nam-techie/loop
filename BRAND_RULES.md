# LOOP Brand Rules



## Source of truth

Use the latest approved HEX values below. Forest Voltage was updated by the user to #033224, superseding the original board green.

- Forest Voltage: #033224 / primary backgrounds and identity.

- Blaze Punch: #FD3E00 / accents, primary actions and active indicators.

- Warm Off-White: #F2F0E8 / readable text and visual breathing room.

- Shadow Whisper: #010101 / text on orange and deep image overlays.

Only these interface colors are allowed; natural photography and transparent blends are permitted. Small text on green is off-white. Orange buttons use black labels, never green or off-white labels.



## Typography

Use exactly two font families: **AVEGA** is the primary font for every heading (h1 through h6), including collection and FAQ headings, plus the brand wordmark. **Roboto Slab** is the secondary font for all non-heading text: paragraphs, navigation, campaign labels, ticker text, prices, buttons, inputs, selects, forms, FAQs and utility labels. Never override a heading with the body font. Child spans inherit their heading font. Roboto (sans-serif), Arial, Impact and other substitute fonts must not be introduced. Both approved fonts are self-hosted in public/fonts. AVEGA uses the authentic italic design without synthetic bold or additional skew.

Sources: https://www.1001fonts.com/avega-font.html and https://fonts.google.com/specimen/Roboto+Slab . The free AVEGA download is licensed for personal use only; obtain the appropriate commercial/web license before commercial publication. Roboto Slab's Apache 2.0 license is included alongside its files. AVEGA is now integrated; it is no longer awaiting an asset.

Headings must wrap intentionally and stay readable at 390px. Keep English copy throughout. This is a collection showcase; do not show prices.



## Art direction

Trail spirit meets everyday fashion. Editorial asymmetry, oversized type, natural forest photography, orange accents and generous spacing. No invented performance tests, sustainability certifications or manufacturing claims.

Source photographs stay unchanged in image/. Publish only selected optimized derivatives. Forest: 6693, 6809, 6768. Warm White: 6674, 6686, 6532. Do not turn different photographs of one shirt into unrelated products.



## Structure and behavior
One landing page at /, in this order: #home, #collections, #about, #contact. All essential content is discoverable by native scrolling; section links are optional shortcuts. Old /collections, /about and /contact URLs redirect to their corresponding anchors. No prices, sizes, bag, cart or checkout.
Collections is a sequential scroll story: each interval holds its image for the first 52%, then blends continuously into the next over the remaining 48%; after the last image the document continues into About. Reverse scrolling revisits earlier images. No carousel buttons, thumbnail clicks, wheel interception, scroll locking or mandatory interaction. The ordered collectionFrames array controls images and story length, supporting 5, 6, 10 or more photographs without layout changes.
Contact answers are always expanded, rather than hidden in accordions. Unavailable channels say Coming soon.

## Motion and responsive behavior
On a fresh Home document entry, play a timed, cinematic introduction on Shadow Whisper #010101. Do not show a green background or a visible Skip intro button. Reveal the supplied 6693 product photograph through a narrow vertical opening that expands; retain deep shadows behind the words. A fine Blaze Punch trail curve draws behind the text and the official orange wordmark appears as a restrained signature. AVEGA text "ADAPT TO TRAIL" in Warm Off-White and "MAKE FOR YOU" in Blaze Punch rise with staggered 3D rotation, settle briefly, then roll away. Expand the opening and dissolve directly into the existing Home in approximately 3.8 seconds after a bounded font wait. Keep the supplied wording, four interface colors and two font families. Use existing photography only; no flashing, audio, loading percentages or mandatory click/scroll. Escape remains available as a keyboard dismissal. Release scrolling/focus on completion; bypass section deep links and restored reading positions. Section navigation never replays the intro. No-JavaScript rendering goes directly to the site; retain a short failure timeout. The explicitly requested opening runs independently of the system motion setting, as does the existing Home choreography.
Home is a section-local scroll campaign: a full-bleed forest/product opening recedes into Shadow Whisper, eight editorial photographs gather, gently rotate into a staggered horizontal strip, then travel across the viewport before Collections. Use native sticky positioning, CSS perspective/transforms and requestAnimationFrame; no WebGL, animation library, wheel interception or nested horizontal scrolling. campaignFrames controls its selected photographs, captions and focal points. Additional optimized sources: 6489, 6558, 6754 and 6718. On mobile, adapt card dimensions, spacing and type to the viewport. Per the owner's explicit direction, Home keeps its scroll-driven gathering, rotation and horizontal movement even when the browser reports reduced motion; do not silently replace this with a static grid. Keep the expressive angled overlap. The Blaze Punch ribbon sits at the bottom of the black gallery throughout its scroll sequence. Screens below 650px height and browsers without JavaScript show a complete photo grid. Other sections retain their reduced-motion behavior. Use only the supplied photography unless new images are approved.
Collections uses a native sticky frame below the header, with an adaptive caption and counter. Images use contain to preserve the complete photograph. On mobile the caption sits above the image; scrolling/touch follows the same sequence. Short landscape screens below 560px height and browsers without JavaScript see every photograph in normal vertical flow.
Collection transitions keep the outgoing photo visible behind the incoming photo, with a subtle vertical hand-off and an 85ms visual catch-up on normal-motion devices. Progress is continuous and reverses with scroll. Never hide the outgoing image before the incoming image covers it. Reduced motion removes translation and zoom; only the opacity dissolve remains, with a shorter 55ms visual settling time to soften wheel ticks. Native page scrolling remains unchanged. No autoplay media, percentage loaders, audio or hijacked wheel/touch events; the timed Home text intro above is explicitly approved.

## Acceptance
Verify native downward/upward scrolling through all collection images before About, frame count scaling, resize/orientation changes and no-JS flow. Check all sections at 320/390/768/1024/1440px and short landscape. No clipped headings, horizontal overflow, obscured captions or mandatory clicks. Verify redirect anchors, two real font families and no commerce UI. Run scroll regression tests, TypeScript and production build.

## Forest color conversion

Web source of truth: HEX #033224 / RGB (3, 50, 36). Formula-based CMYK approximation: C94 M0 Y28 K80 (percent). This is not an ICC-profile conversion; print-ready CMYK must use the printer-specified ICC profile and paper conditions. CSS uses RGB/HEX to display the approved web color.

## Official logo assets
Use lg2.png (wordmark) in the header and lg1.png (emblem) alongside the wordmark in the footer. Their published copies live under public/images/brand. Preserve their shape; Both the wordmark and emblem must use Blaze Punch #FD3E00 in the header and footer. CSS alpha masks map both supplied assets to the shared --orange token; do not use off-white or an independently chosen orange for logos. Crop the supplied canvas through CSS framing rather than changing the original artwork. The logo is an image asset, while AVEGA remains the heading font.

## Approved logo and headline update
Use image/logo/LOOP.png as the complete footer logo, including its original emblem, wordmark and tagline proportions. Publish an unchanged copy as public/images/brand/loop-full.png and use an alpha mask with Blaze Punch #FD3E00. Header and intro retain the orange wordmark. All display headings and collection titles omit terminal periods. The full TO TRAIL phrase in the Home heading is orange. Paragraph punctuation remains normal.
