import { useState, useEffect } from 'react'
import './Navbar.css'

const links = ['About', 'Services', 'Work', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(id)
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__bar">
        <div
          className="navbar__logo"
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false) }}
        >
          Divya Koneti
        </div>

        <ul className="navbar__links">
          {links.map((link) => (
            <li key={link}>
              <button
                className={`navbar__link ${active === link ? 'navbar__link--active' : ''}`}
                onClick={() => scrollTo(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <ul className="navbar__menu">
        {links.map((link) => (
          <li key={link}>
            <button
              className={`navbar__menu-link ${active === link ? 'navbar__menu-link--active' : ''}`}
              onClick={() => scrollTo(link)}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
