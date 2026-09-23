import { useRef, useEffect } from 'react'
import './About.css'

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python',
  'Next.js', 'Tailwind', 'Javascript'
]

export default function About() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    let raf = null
    const update = () => {
      if (leftRef.current) {
        const rect = leftRef.current.getBoundingClientRect()
        const c = (rect.top + rect.height / 2) - window.innerHeight / 2
        leftRef.current.style.transform = `translateY(${c * -0.04}px) translateZ(0)`
      }
      if (rightRef.current) {
        const rect = rightRef.current.getBoundingClientRect()
        const c = (rect.top + rect.height / 2) - window.innerHeight / 2
        rightRef.current.style.transform = `translateY(${c * 0.035}px) translateZ(0)`
      }
      raf = null
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); raf && cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="about" className="about">
      <div className="section-label">About</div>

      <div className="about__inner">
        <div ref={leftRef} className="about__left">
          <div className="glass-card about__card">
            <div className="about__avatar">
              <img src="/avatar.jpg" alt="Divya Koneti" className="about__avatar-photo" />
            </div>
            <h2 className="about__name">Divya Koneti</h2>
            <p className="about__role">Software Developer</p>
            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-num">7+</span>
                <span className="about__stat-label">Years Exp</span>
              </div>
              <div className="about__stat-divider" />
              <div className="about__stat">
                <span className="about__stat-num">20+</span>
                <span className="about__stat-label">Projects</span>
              </div>
              <div className="about__stat-divider" />
              <div className="about__stat">
                <span className="about__stat-num">10+</span>
                <span className="about__stat-label">Clients</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={rightRef} className="about__right">
          <h2 className="about__heading">
            Building things that <span className="gradient-text">feel alive</span>
          </h2>
          <p className="about__bio">
            I'm a passionate developer who loves turning complex problems into elegant,
            human-centered solutions. With a background spanning frontend craft, backend architecture,
            and everything in between, I bring ideas from concept to production.
          </p>
          <p className="about__bio">
            When I'm not coding, you'll find me exploring art, clicking photos, or obsessing over typography and motion design.
          </p>

          <div className="about__skills">
            <p className="about__skills-label">Technologies I work with</p>
            <div className="about__skills-grid">
              {skills.map((skill) => (
                <div key={skill} className="glass-tag">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
