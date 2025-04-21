import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: ReactNode}) {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, []);
  
  return children;
}