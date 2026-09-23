import './Services.css'

const services = [
  {
    title: 'Developer',
    tagline: 'Building things that work.',
    desc: 'I write clean, thoughtful code across the stack — from crafting interfaces to architecting the systems behind them.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 14 8 24l10 10" />
        <path d="M30 14l10 10-10 10" />
        <path d="M27 10 21 38" />
      </svg>
    ),
  },
  {
    title: 'Artist',
    tagline: 'Seeing beyond the screen.',
    desc: 'Sketching, painting, and visual exploration that feeds how I think about design, composition, and colour.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M24 8C13 8 6 15.5 6 24c0 6 4 9 8 9 2 0 3-1 3-3 0-1.5-1-2-1-3.5 0-2 2-3.5 4.5-3.5H28c6 0 12-3.5 12-11 0-4-6-7-16-7Z" />
        <circle cx="16" cy="19" r="2" />
        <circle cx="24" cy="15" r="2" />
        <circle cx="32" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: 'Photographer',
    tagline: 'Framing moments that last.',
    desc: 'Travel and street photography — chasing light, colour, and the small details most people walk past.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <rect x="6" y="16" width="36" height="24" rx="2" />
        <path d="m17 16 3-6h8l3 6" />
        <circle cx="24" cy="28" r="7" />
        <circle cx="35" cy="21" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Sports',
    tagline: 'Discipline off the clock.',
    desc: 'Staying active keeps me sharp — the same focus and consistency I bring to a match carries into my work.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 8v32M8 24h32M12.5 12.5c6 6 17 6 23 0M12.5 35.5c6-6 17-6 23 0" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="section-label">Services</div>

      <div className="services__grid">
        {services.map((s) => (
          <div key={s.title} className="glass-card service-card">
            <div className="service-card__icon">{s.icon}</div>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__tagline">{s.tagline}</p>
            <p className="service-card__desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
