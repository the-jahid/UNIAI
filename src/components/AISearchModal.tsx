'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Calendar, Compass, Music, Palette, Theater, X } from 'lucide-react'
import { AIEventSearch } from '@/lib/aiSearch'

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const purposes = ['Dining', 'Entertainment', 'Relaxation', 'Shopping', 'Exploring']
const experiences = ['Live Music', 'Sports', 'Art', 'Theater', 'None']

interface AISearchModalProps {
  setEventsdrilling: (events: any) => void;
}

export default function Component({ setEventsdrilling }: AISearchModalProps) {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, watch, setValue } = useForm()
  const [stars, setStars] = useState<{ x: number; y: number; opacity: number; size: number }[]>([])

  useEffect(() => {
    const newStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random(),
      size: Math.random() * 2 + 1,
    }))
    setStars(newStars)
  }, [])

  const onSubmit = async (data: any) => {
    const result = await AIEventSearch(data)
    setEventsdrilling(result)
  }

  const fadeInOut = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000033] to-black p-4 flex items-center justify-center overflow-hidden relative">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
          }}
        />
      ))}
      <Card className="w-full max-w-3xl bg-black/30 backdrop-blur-xl border-gray-800 overflow-hidden">
        <div className="p-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative">
            {[1, 2, 3, 4].map((number) => (
              <div key={number} className="flex items-center relative z-10">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white ${
                    step >= number ? 'bg-purple-600' : 'bg-gray-700'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: step === number ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {number}
                </motion.div>
              </div>
            ))}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-purple-600 -translate-y-1/2"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" {...fadeInOut} className="space-y-4">
                  <h2 className="text-3xl font-bold text-white mb-6">Select your state</h2>
                  <Select onValueChange={(value) => setValue('state', value)}>
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent >
                      {states.map((state) => (
                        <SelectItem key={state} value={state} className="text-black">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" {...fadeInOut} className="space-y-4">
                  <h2 className="text-3xl font-bold text-white mb-6">What are you looking for?</h2>
                  <RadioGroup onValueChange={(value) => setValue('lookingFor', value)}>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'event', label: 'Event', icon: Calendar },
                        { value: 'place', label: 'Place to go', icon: MapPin },
                        { value: 'either', label: 'Either', icon: Compass },
                      ].map(({ value, label, icon: Icon }) => (
                        <Label
                          key={value}
                          className="flex flex-col items-center justify-center p-6 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors text-white"
                        >
                          <RadioGroupItem value={value} className="sr-only" />
                          <Icon className="w-8 h-8 mb-2" />
                          <span className="text-lg">{label}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" {...fadeInOut} className="space-y-4">
                  <h2 className="text-3xl font-bold text-white mb-6">What brings you out today?</h2>
                  <RadioGroup onValueChange={(value) => setValue('purpose', value)}>
                    <div className="grid grid-cols-3 gap-4">
                      {purposes.map((purpose) => (
                        <Label
                          key={purpose}
                          className="flex flex-col items-center justify-center p-6 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors text-white"
                        >
                          <RadioGroupItem value={purpose.toLowerCase()} className="sr-only" />
                          <span className="text-lg">{purpose}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" {...fadeInOut} className="space-y-4">
                  <h2 className="text-3xl font-bold text-white mb-6">Looking for any specific experiences?</h2>
                  <RadioGroup onValueChange={(value) => setValue('experience', value)}>
                    <div className="grid grid-cols-3 gap-4">
                      {experiences.map((experience) => (
                        <Label
                          key={experience}
                          className="flex flex-col items-center justify-center p-6 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors text-white"
                        >
                          <RadioGroupItem value={experience.toLowerCase()} className="sr-only" />
                          {experience === 'Live Music' && <Music className="w-8 h-8 mb-2" />}
                          {experience === 'Sports' && <Compass className="w-8 h-8 mb-2" />}
                          {experience === 'Art' && <Palette className="w-8 h-8 mb-2" />}
                          {experience === 'Theater' && <Theater className="w-8 h-8 mb-2" />}
                          {experience === 'None' && <X className="w-8 h-8 mb-2" />}
                          <span className="text-lg">{experience}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              >
                Previous
              </Button>
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-purple-600 text-white hover:bg-purple-700"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-purple-600 text-white hover:bg-purple-700"
                >
                  Search
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}