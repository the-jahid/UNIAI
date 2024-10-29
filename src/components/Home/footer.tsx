'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Instagram, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const WaveMesh = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path 
        fill="#0099ff" 
        fillOpacity="0.2" 
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      >
        <animate
          attributeName="d"
          dur="10s"
          repeatCount="indefinite"
          values="
            M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,128L48,154.7C96,181,192,235,288,234.7C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </path>
    </svg>
  </div>
)

interface AnimatedCircleProps {
  x: string;
  y: string;
  size: string;
  color: string;
}

const AnimatedCircle: React.FC<AnimatedCircleProps> = ({ x, y, size, color }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      x, y,
      width: size,
      height: size,
      backgroundColor: color,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.7, 0.9, 0.7],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
)

export default function Footer() {
  return (
    <footer className="relative bg-black text-white py-12 px-6 overflow-hidden">
      <WaveMesh />
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div>
          <motion.img
            src="/mom-and-son.png"
            alt="Mom and Son"
            className="w-24 h-24 mb-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            info@poolrides.com
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            unibizinquiries@gmail.com
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Fairfax, VA, 22030
          </motion.p>
        </div>
        
        <div>
          <motion.h3
            className="text-xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore
          </motion.h3>
          <motion.div
            className="h-1 w-12 bg-blue-500 mb-4"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
{['Home', 'About', 'Features', 'FAQ'].map((item, index) => {
            const href = item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`;
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.8 }}
              >
                <Link href={href} className="block mb-2 text-white hover:text-sky-400 transition-colors">
                  {item}
                </Link>
              </motion.div>
            );
          })}  </div>
        
        <div>
          <motion.h3
            className="text-xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Follow
          </motion.h3>
          <motion.div
            className="h-1 w-12 bg-blue-500 mb-4"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <div className="flex space-x-4">
            <motion.a
              href="#"
              className="text-white hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="text-white hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={24} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}