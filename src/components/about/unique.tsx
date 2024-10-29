'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useAnimation } from 'framer-motion'

const words = `UNI was born out of a desire to simplify life and boost meaningful connections. We saw how people were paying more for rides, yet gig workers were earning less. That didn't sit right with us, so we set out to create a solution that empowers everyone.

We're not just a social app or a rideshare service—we're a community. UNI bridges the gap between connecting online and making those connections come to life, whether it's through events, travel, or work opportunities. Every interaction is designed to be seamless, personalized, and rewarding.

At UNI, we believe in fairness, freedom, and fun. From the moment you open the app, our goal is to make life easier, more exciting, and more rewarding for you. Let's create your journey together!`

export default function TransparentBlueSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div 
      ref={containerRef}
      className="relative flex flex-col lg:flex-row justify-center items-center text-center p-4 md:p-8 lg:p-20 min-h-screen"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
      }}
    >
      <motion.div 
        className="w-full lg:w-1/2 mb-8 lg:mb-0"
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } }
        }}
      >
        <Image 
          src="https://i.ibb.co.com/D8DgxQR/jorge-gordo-W2-UH8-Ld-D3-Tc-unsplash.jpg" 
          width={800}
          height={600}
          alt="Crowd at a nighttime event with colorful stage lights"
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </motion.div>
      <motion.div 
        className="w-full lg:w-1/2 lg:pl-12"
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4 } }
        }}
      >
        <TextGenerateEffect words={words} />
      </motion.div>
    </motion.div>
  )
}

function TextGenerateEffect({ words }: { words: string }) {
  const [renderedText, setRenderedText] = useState('')
  const containerRef = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const animateText = (index: number) => {
      setRenderedText(words.slice(0, index))
      if (index < words.length) {
        timeoutId = setTimeout(() => animateText(index + 1), 20)
      }
    }
    if (isInView) {
      animateText(0)
    }
    return () => clearTimeout(timeoutId)
  }, [words, isInView])

  return (
    <motion.p
      ref={containerRef}
      className="text-base md:text-lg lg:text-xl text-blue-500 leading-relaxed"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }}
    >
      {renderedText}
    </motion.p>
  )
}