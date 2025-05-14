'use client'

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion"

const slides = [
  {
    title: "Discover Your World",
    description: "Discover Events, New People, and Places to Go Near You",
    image: "https://i.ibb.co/h11PLr1J/1920x1080-See-Your-City-Mapped-Out-Web-V2.webp",
    alt: "discover"
  },
  {
    title: "Match & Mingle",
    description: "Tell it & You Get it: Get Matched Up With Events & Places to Go That Match Your Vibe",
    image: "https://i.ibb.co/cXpmpH0w/1920x1080-No-Matter-How-Specific-Mob-V1-1.webp",
    alt: "m&m"
  },
  
  {
    title: "Know Your Crowd Before You Go",
    description: "See who's attending and your compatibility score with each person. Connect with people who share your interests, go to your school, or match your vibe",
    image: "https://i.ibb.co/zWCHXzhs/manage-ur-memories-desktop.jpg",
    alt: "know"
  }
]

export default function AdvancedCarousel() {
  const [[page, direction], setPage] = React.useState([0, 0])
  const [progress, setProgress] = React.useState(0)

  const index = wrap(0, slides.length, page)

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 6000)

    return () => clearInterval(timer)
  }, [page])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 0
        }
        return prevProgress + (100 / (6000 / 100))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-black items-center h-[70vh] md:h-screen flex flex-col p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden">
      <div className="w-full max-w-7xl relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <div className="flex flex-col gap-4 sm:gap-6 text-white p-4 sm:p-6 md:p-8 mt-8">
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <motion.h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {slides[index].title}
                </motion.h2>
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl  text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {slides[index].description}
                </motion.p>
              </div>
              <div className="relative aspect-[10/9] md:aspect-[25/9] w-full max-w-6xl mx-auto">
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[48px] overflow-hidden border-4 sm:border-6 md:border-8 border-white">
                  <motion.img
                    src={slides[index].image}
                    alt={slides[index].alt}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-full max-w-7xl mt-4 sm:mt-6 md:mt-8">
        <div className="bg-white/30 h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  )
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    }
  }
}

