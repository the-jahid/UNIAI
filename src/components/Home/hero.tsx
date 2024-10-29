"use client"

import { useEffect, useState } from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'

const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }))
  }, [controls])

  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className={`inline-block ${className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          custom={index}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

const BackgroundSVG = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
      </filter>
    </defs>
    <g filter="url(#goo)">
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 100 + "%"}
          cy={Math.random() * 100 + "%"}
          r={Math.random() * 50 + 10}
          fill={`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`}
          animate={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </g>
  </svg>
)

const Hero = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const [isDragging, setIsDragging] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) {
      const rect = event.currentTarget.getBoundingClientRect()
      x.set(event.clientX - rect.left - rect.width / 2)
      y.set(event.clientY - rect.top - rect.height / 2)
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center overflow-hidden relative">
      <BackgroundSVG />
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center relative z-10">
        <motion.div 
          className="lg:w-1/2 z-10 mb-10 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative">
            <motion.div 
              className="absolute -left-4 -top-4 w-72 h-72 bg-purple-700 rounded-full opacity-50 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 10,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
              }}
            />
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <AnimatedText text="Your Journey," />
              <br />
              <AnimatedText text="Your Connections" />
              <br />
              <AnimatedText text="— UNI" className="text-purple-400" />
            </h1>
          </div>
          <motion.h2 
            className="text-3xl lg:text-4xl font-semibold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Brings It All Together!
          </motion.h2>
          <motion.p 
            className="text-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Link Up, Ride Out, and Own Your Journey with UNI!
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full text-lg">
              Get Started
            </Button>
          </motion.div>
        </motion.div>
        <motion.div 
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        //   onMouseMove={handleMouseMove}
          style={{ perspective: 10000 }}
        >
          <motion.div 
            className="absolute inset-0 bg-sky-400 rounded-full opacity-50 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 80, 180],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
          />
          <motion.div
            className="relative cursor-move"
            style={{
              rotateX,
              rotateY,
            }}
            drag
            dragConstraints={{ left: 100, right: 100, top: 100, bottom: 100 }}
            dragElastic={0.1}
            // onDragStart={() => setIsDragging(true)}
            // onDragEnd={() => setIsDragging(false)}
            // whileDrag={{ scale: 1.1 }}
          >
            <Image
              src="/First-start-1-1100x843.png"
              width={600}
              height={600}
              alt="UNI App Screenshot"
              className="rounded-3xl shadow-2xl transform -rotate-6 scale-90"
            />
          </motion.div>
          <motion.div 
            className="absolute top-1/2 -left-20 w-40 h-40 border-2 border-dashed border-sky-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero