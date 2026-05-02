import './App.css'
import SceneryBackground from './components/SceneryBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Travel from './components/Travel'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <SceneryBackground />
      <div className="app">
        <Navbar />
        <Hero />
        <About />
        <Work />
        <Travel />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
