'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false)
      }

      // Update scroll progress
      setScrollProgress((currentScrollY / totalHeight) * 100)

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-30 backdrop-blur-md transition-all duration-300 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <div className="w-10 h-10 bg-sky-400 rounded-full"></div>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-sky-400"></div>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-sky-400 -translate-y-2"></div>
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-sky-400 translate-y-2"></div>
                </div>
                <span className="text-2xl font-bold text-white">UNI</span>
              </div>

              <nav className="hidden md:flex space-x-6 items-center">
                <Link href="/" className="text-white hover:text-sky-400 transition-colors">Home</Link>
                <Link href="/about" className="text-white hover:text-sky-400 transition-colors">About Us</Link>
                <Link href="/features" className="text-white hover:text-sky-400 transition-colors">Feature</Link>
                <Link href="/faq" className="text-white hover:text-sky-400 transition-colors">FAQ</Link>
                <Link href="/events" className="text-white hover:text-sky-400 transition-colors">Events</Link>
                <SignedOut>
                  <SignInButton>
                   <Button className="bg-sky-500 hover:bg-sky-600 text-white">Get Started</Button>
                  </SignInButton>
                 
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </nav>

              <button 
                className="md:hidden text-white" 
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isMenuOpen ? 'close' : 'open'}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    exit={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden mt-4 flex flex-col space-y-4"
                >
          <Link href="/" className="text-white hover:text-sky-400 transition-colors">Home</Link>
                <Link href="/about" className="text-white hover:text-sky-400 transition-colors">About Us</Link>
                <Link href="/features" className="text-white hover:text-sky-400 transition-colors">Feature</Link>
                <Link href="/faq" className="text-white hover:text-sky-400 transition-colors">FAQ</Link>
                <SignedOut>
                  <SignInButton>
                   <Button className="bg-sky-500 hover:bg-sky-600 text-white">Get Started</Button>
                  </SignInButton>
                 
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full hidden md:block"></div>
          <div className="absolute top-4 right-4 w-3 h-3 bg-sky-400 rounded-full hidden md:block"></div>

          {/* Scroll Progress Indicator */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-sky-500"
            style={{ width: `${scrollProgress}%` }}
            initial={{ width: '0%' }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </motion.header>
      )}
    </AnimatePresence>
  )
}