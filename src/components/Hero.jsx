import { useRef, useEffect } from 'react'
import './Hero.css'

export default function Hero() {
  const contentRef = useRef(null)

  useEffect(() => {
    let raf = null
    const update = () => {
      const sy = window.scrollY
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${sy * 0.35}px) translateZ(0)`
        contentRef.current.style.opacity = String(Math.max(0, 1 - sy / 550))
      }
      raf = null
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); raf && cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="hero">

      <div ref={contentRef} className="hero__content">
        <p className="hero__eyebrow">Hello, I'm</p>
        <h1 className="hero__title">
          Divya <span className="hero__title-accent">Koneti</span>
        </h1>
        <p className="hero__subtitle">
          Full-Stack Developer & Creative Technologist
        </p>
        <p className="hero__desc">
          I craft digital experiences that live at the intersection of design and engineering —
          clean code, thoughtful interfaces, and ideas that matter.
        </p>
        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  )
}
