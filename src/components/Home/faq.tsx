'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: "What makes UNI so special?",
    answer: "Think of UNI as having a friend who knows about every event, concert, and hot spot in your city, but with next-level precision. Our discovery map shows you everything happening around you in real-time, while our smart guest lists let you see exactly who's going and how well you'll vibe with them based on shared interests and connections. Plus, you can just ask our Experience Engine to find exactly what you're looking for, like 'rooftop bars with a college crowd tonight' or 'concerts under $50 this weekend' - no more FOMO, no more wrong scenes"
  },
  {
    question: "Is UNI free?",
    answer: "Yes! UNI is completely free to use. Find events, discover places, and connect with people - all at no cost."
  },
  {
    question: "How is UNI different from other social/event apps? ",
    answer: "While other apps just show you events, UNI shows you everything happening around you AND helps you find your perfect crowd. Our AI-powered discovery makes finding the right scene as easy as asking 'where should I go tonight?'"
  },
  {
    question: "How do I sign up?",
    answer: <div>"Signing up for the UNI app is a breeze, all you've got to do is click here <br /> <Link className='text-blue-500' href={'https://form.typeform.com/to/Mk0sQjuc'}>here</Link>  , and once you fill out the form you'll be signed up for our waitlist!"</div>
  }
]

const BackgroundSVG = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  const circles = useRef([...Array(50)].map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    radius: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2
  })))

  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#000" />
      <g filter="url(#glow)">
        {circles.current.map((circle, i) => {
          const translateX = useTransform(mouseX, [0, window.innerWidth], [-5, 5])
          const translateY = useTransform(mouseY, [0, window.innerHeight], [-5, 5])

          return (
            <motion.circle
              key={i}
              cx={`${circle.x}%`}
              cy={`${circle.y}%`}
              r={circle.radius}
              fill="#0066cc"
              opacity={0.3}
              style={{
                x: translateX,
                y: translateY,
              }}
            >
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur={`${circle.duration}s`}
                repeatCount="indefinite"
              />
            </motion.circle>
          )
        })}
      </g>
    </svg>
  )
}

interface FAQItemProps {
  question: string;
  answer: any;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen, index }: FAQItemProps) => (
  <motion.div
    initial={false}
    animate={{ backgroundColor: isOpen ? 'rgba(0, 102, 204, 0.1)' : 'rgba(0, 0, 0, 0)' }}
    transition={{ duration: 0.3 }}
    className="mb-4 rounded-lg overflow-hidden relative"
  >
    <motion.button
      className="flex justify-between items-center w-full p-4 text-left"
      onClick={toggleOpen}
    >
      <span className="font-medium text-blue-300 text-sm sm:text-base md:text-lg">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
      </motion.div>
    </motion.button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div className="p-4 text-blue-200 text-xs sm:text-sm md:text-base relative">
            {answer}
            <svg className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 opacity-10" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0066cc" strokeWidth="4">
                <animate
                  attributeName="r"
                  from="40"
                  to="45"
                  dur="1.5s"
                  begin={`${index * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(event.clientX - rect.left)
        mouseY.set(event.clientY - rect.top)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (!mounted) return null

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-blue-300 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <BackgroundSVG mouseX={mouseX} mouseY={mouseY} />
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-blue-500 relative z-10 text-center"
      >
        UNI FAQ
      </motion.h1>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative z-10"
      >
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={activeIndex === index}
            toggleOpen={() => setActiveIndex(activeIndex === index ? null : index)}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  )
}