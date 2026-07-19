import { useEffect, useRef } from 'react'

/**
 * ScrollReveal — wraps children in an IntersectionObserver that adds
 * the `.visible` class when the element enters the viewport.
 * Usage: <ScrollReveal className="reveal" delay={0.2}>...</ScrollReveal>
 */
const ScrollReveal = ({ children, className = 'reveal', delay = 0, threshold = 0.12, style = {} }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (delay) el.style.transitionDelay = `${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

export default ScrollReveal
