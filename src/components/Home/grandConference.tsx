'use client'

import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const GradientBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900 to-black" />
)

const BlurryUpperSection = () => (
    <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black to-transparent backdrop-blur-md" />
  );

const CloudSVG = () => (
  <svg viewBox="0 0 1440 320" className="w-full absolute top-0 left-0">
    <defs>
      <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stopColor="#000000" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <motion.path 
      fill="url(#cloudGradient)"
      d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </svg>
)

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-blue-400 rounded-full"
    initial={{ opacity: 0, y: 100 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [-20, -40, -60, -80],
      x: [0, 10, -10, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatType: "loop",
    }}
  />
)


const IconSVG = ({ d }: { d: string }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start({ pathLength: 1, opacity: 1 })
    }
  }, [controls, inView])

  return (
    <svg viewBox="0 0 24 24" className="w-16 h-16 mb-4" ref={ref}>
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      <motion.path
        fill="none"
        stroke="url(#iconGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={d}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  )
}

const benefitItems = [
  { icon: "M20 12V22H4V12", title: "Visionary Speaker" },
  { icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Worldwide Events" },
  { icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7", title: "Level-up Your Skills" },
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "Help Find Your Tribe" },
]

export default function Component() {
  return (
    <div className=" relative overflow-hidden text-white font-sans">
      <GradientBackground />
      <BlurryUpperSection />
      <CloudSVG />
      
      {[...Array(10)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} />
      ))}
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <motion.p 
          className="text-center mb-2 text-blue-300 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Magic is believing in yourself.
        </motion.p>
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          What you will get?
          <motion.span 
            className="block h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-2"
            initial={{ width: 0 }}
            animate={{ width: "64%" }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {benefitItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
            >
              <IconSVG d={item.icon} />
              <h3 className="font-semibold text-blue-300 text-lg">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </main>

      
    </div>
  )
}