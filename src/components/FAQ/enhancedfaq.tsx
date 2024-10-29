'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const faqs = [
  {
    question: "What if I change my mind?",
    answer: "No problem! We're confident you'll love our product. We offer a 14-day money-back guarantee, no questions asked."
  },
  {
    question: "Is your product eco-friendly?",
    answer: "It sure is. We're 100% biodegradable and sustainable. Plus, we're Leaping Bunny certified."
  },
  {
    question: "Do you offer any discounts?",
    answer: "Although we don't currently have any active coupon codes, we occasionally run seasonal sales – join our newsletter to stay updated!"
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
}

const expandVariants: Variants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: { opacity: 1, height: 'auto', transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] } },
}

export default function EnhancedFAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen relative   text-blue-300 p-8 flex flex-col items-center justify-center">

      <Image src={'/question.png'} width={400} height={400} alt='faq' className='absolute top-0 left-0 -z-10' />
      <motion.h1 
        className="text-5xl md:text-6xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Frequently Asked Questions
      </motion.h1>
      <motion.div 
        className="w-full max-w-3xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="rounded-xl overflow-hidden shadow-lg"
          >
            <motion.button
              className="w-full text-left p-6 bg-gray-800 flex justify-between items-center transition-colors duration-300 hover:bg-gray-700"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl font-semibold">{faq.question}</span>
              <motion.span
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
              {expandedIndex === index && (
                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="bg-gray-700 p-6 rounded-b-xl"
                >
                  <p className="text-lg">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-semibold mb-6">Still Need Help? We're Here!</h2>
        <motion.button 
          className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: ['0px 0px 0px 0px rgba(59, 130, 246, 0.5)', '0px 0px 20px 10px rgba(59, 130, 246, 0.2)'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          Contact Us Now
        </motion.button>
      </motion.div>
    </div>
  )
}