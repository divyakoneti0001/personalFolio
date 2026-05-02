import { useRef, useEffect } from 'react'
import './Work.css'

const projects = [
  {
    id: 1,
    title: 'AI Automation Workflow',
    category: 'AI · Automation',
    desc: 'Replaced manual ticket triage by bridging Cursor with Jira and GitHub via the Model Context Protocol — turning the editor into an autonomous agent that reads, plans, and acts across the entire dev stack.',
    tags: ['MCP', 'Cursor', 'Jira', 'GitHub'],
    accent: 'linear-gradient(135deg, #818cf8, #38bdf8)',
    link: 'https://divyakoneti.substack.com/p/level-up-cursor-building-an-autonomous',
  },
  {
    id: 2,
    title: 'Visual Site Editor',
    category: 'Frontend · No-Code',
    desc: 'A drag-and-drop editor that lets anyone personalize their website without touching code — drop in countdown timers, image carousels, and product grids, then update live content on the fly.',
    tags: ['React', 'TypeScript', 'DnD Kit', 'CMS'],
    accent: 'linear-gradient(135deg, #38bdf8, #00d4aa)',
    link: 'https://help.moengage.com/hc/en-us/articles/360016569831-Create-a-Web-Personalization-Campaign#h_01HXA339NJ708G8EV9VY4XXJQT',
  },
  {
    id: 3,
    title: 'Personalised YouTube',
    category: 'Frontend · UI/UX',
    desc: 'A YouTube mock-up where the interface adapts to your taste and mood — pick a theme and watch the entire viewing experience transform around you.',
    tags: ['React', 'CSS Themes', 'JavaScript', 'Figma'],
    accent: 'linear-gradient(135deg, #00d4aa, #818cf8)',
    link: '#',
  },
  {
    id: 4,
    title: 'Task Organizer',
    category: 'Productivity · Frontend',
    desc: 'A Kanban-style task organizer that makes managing work intuitive — drag tasks across columns, track progress at a glance, and keep everything in order.',
    tags: ['React', 'DnD Kit', 'JavaScript', 'CSS'],
    accent: 'linear-gradient(135deg, #818cf8, #00d4aa)',
    link: 'https://kanban-board-ten-livid.vercel.app/',
  },
]

export default function Work() {
  const gridRef = useRef(null)

  // Single observer on the grid — reveals all cards via CSS nth-child delays
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add('work__grid--visible')
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    )
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" className="work">
      <div className="section-label">Work</div>
      <h2 className="work__heading">
        Selected <span className="gradient-text">Projects</span>
      </h2>
      <p className="work__sub">A few things I've built — from idea to deployment.</p>

      <div ref={gridRef} className="work__grid">
        {projects.map((p) => (
          <div key={p.id} className="glass-card project-card">
            <div className="project-card__accent" style={{ background: p.accent }} />
            <div className="project-card__body">
              <p className="project-card__category">{p.category}</p>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>
              <div className="project-card__tags">
                {p.tags.map((t) => (
                  <span key={t} className="glass-tag glass-tag--sm">{t}</span>
                ))}
              </div>
              <a href={p.link} className="project-card__link" target="_blank" rel="noreferrer">
                View Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
