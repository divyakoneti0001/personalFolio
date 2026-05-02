import { useEffect, useRef, useState } from 'react'

// Drives scroll-dependent React state (only for hero opacity/fade — used sparingly).
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrollY(window.scrollY); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrollY
}

// Directly writes transform to a DOM node — zero React re-renders in the hot path.
// speed > 0 moves element up as user scrolls down (typical parallax feel).
export function useDirectParallax(speed = 0.12) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false
    const update = () => {
      const rect = el.getBoundingClientRect()
      const centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2
      el.style.transform = `translateY(${centerOffset * speed}px) translateZ(0)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}

// For orb blobs: moves by raw scroll offset * speed.
export function useOrbParallax(speed = 0.2) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ticking = false
    const update = () => {
      el.style.transform = `translateY(${window.scrollY * speed}px) translateZ(0)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  return ref
}
