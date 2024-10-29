

import { LayoutGridDemo } from "@/components/about/LayoutGrid"
import { AboutHero } from "@/components/about/textgenerate"
import TransparentBlueSection from "@/components/about/unique"
import { SparklesCore } from "@/components/ui/sparkles"

const AboutUs = () => {
  return (
    <div className=" mt-20 relative w-full  flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="w-full absolute inset-0 ">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />


      </div>
      <AboutHero />
      
    </div>
  )
}

export default AboutUs
