import { PlaceholdersAndVanishInputDemo } from '@/components/FAQ/aiSearch'
import EnhancedFAQ from '@/components/FAQ/enhancedfaq'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'


import React from 'react'

const FAQ = () => {
  return (
    <div className='mt-20' >
      <PlaceholdersAndVanishInputDemo />
      <EnhancedFAQ />
      <ShootingStars />
      <StarsBackground />
    </div>
  )
}

export default FAQ