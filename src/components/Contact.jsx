import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__orb" />
      <div className="section-label">Contact</div>
      <h2 className="contact__heading">
        Let's <span className="gradient-text">build something</span> together
      </h2>
      <p className="contact__sub">
        Whether it's a new project, a collaboration, or just a chat — my inbox is always open.
      </p>
      <div className="glass-card contact__card">
        <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
          <div className="contact__row">
            <div className="contact__field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="contact__field">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div className="contact__field">
            <label>Message</label>
            <textarea rows={5} placeholder="Tell me about your project..." />
          </div>
          <button type="submit" className="btn btn--primary contact__submit">
            Send Message
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
      <div className="contact__socials">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
        <span className="contact__dot" />
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
        <span className="contact__dot" />
        <a href="mailto:divyakoneti0001@gmail.com" className="social-link">Email</a>
      </div>
    </section>
  )
}
