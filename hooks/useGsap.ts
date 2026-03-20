import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useFadeInUp(options: { delay?: number; duration?: number } = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.8,
          delay: options.delay ?? 0,
          ease: 'power3.out',
        }
      )
    }
  }, [options])

  return ref
}

export function useStaggerAnimation(options: { delay?: number; staggerDelay?: number } = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      const children = ref.current.querySelectorAll('.stagger-item')
      gsap.fromTo(
        children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: options.delay ?? 0,
          stagger: options.staggerDelay ?? 0.1,
          ease: 'power3.out',
        }
      )
    }
  }, [options])

  return ref
}

export function useHoverGlow() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

    const handleMouseEnter = () => {
      gsap.to(element, {
        boxShadow: '0 0 25px rgba(91, 142, 120, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        boxShadow: '0 0 15px rgba(91, 142, 120, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return ref
}

export function useScrollReveal(options: { once?: boolean } = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

    const element = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            element,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            }
          )

          if (options.once !== false) {
            observer.unobserve(element)
          }
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options])

  return ref
}

export function useTypewriter(text: string, speed: number = 50) {
  const ref = useRef<HTMLElement>(null)
  const textRef = useRef('')

  useEffect(() => {
    if (!ref.current || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      if (ref.current) ref.current.textContent = text
      return
    }

    const element = ref.current
    let index = 0
    textRef.current = ''
    element.textContent = ''

    const interval = setInterval(() => {
      if (index < text.length) {
        textRef.current += text[index]
        element.textContent = textRef.current
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return ref
}
