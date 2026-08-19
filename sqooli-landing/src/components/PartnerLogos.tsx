import bunisha from '../assets/images/partners/actual/bunisha.webp'
import ilotbet from '../assets/images/partners/actual/ilotbet.webp'
import monsa from '../assets/images/partners/actual/monsa.webp'
import aliexpress from '../assets/images/partners/actual/aliexpress.webp'
import pollbrand from '../assets/images/partners/actual/pollbrand.webp'
import radioAfrica from '../assets/images/partners/actual/radio-africa.webp'
import '../styles/components/partner-logos.css'

const partners = [
  { name: 'Bunisha', image: bunisha },
  { name: 'iLOTBET', image: ilotbet },
  { name: 'Monsa', image: monsa },
  { name: 'AliExpress', image: aliexpress },
  { name: 'Pollbrand', image: pollbrand },
  { name: 'Radio Africa Group', image: radioAfrica }
]

export default function PartnerLogos({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`actual-partner-strip${compact ? ' actual-partner-strip--compact' : ''}`}>
      <p>Join the list of our amazing partners</p>
      <div className="actual-partner-logos" aria-label="Sqooli partners">
        {partners.map(partner => (
          <div className="actual-partner-logo" key={partner.name}>
            <img src={partner.image} alt={partner.name} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    </div>
  )
}
