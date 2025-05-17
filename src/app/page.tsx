'use client'

import CircularGallery from "@/components/Home/circularGallery";
import { ContainerScrollDemo } from "@/components/Home/containerScroll";
import FAQ from "@/components/Home/faq";
import FeaturesSectionDemo from "@/components/Home/Feature";
import FeaturedOn from "@/components/Home/featuredOn";
import Footer from "@/components/Home/footer";

import { HeroParallaxDemo } from "@/components/Home/newHero";
import { UniSignupForm } from "@/components/Home/uni-signup-form";
import { BackgroundLines } from "@/components/ui/background-lines";


export default function Home() {
  return (
      <div>
          <HeroParallaxDemo />
          {/* <ContainerScrollDemo /> */}
       
           <div style={{ height: '600px', position: 'relative', marginTop: '40px', marginBottom:'200px' }}>
         
              <h2 className="bg-clip-text text-white text-center bg-gradient-to-b from-blue-400 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Your Onestop For Everything Lifestyle & IRL Culture
        </h2>
        <BackgroundLines>
          <h2></h2>
        </BackgroundLines>
           <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
           </div>
          {/* <Waitlist /> */}
          {/* <UniSignupForm /> */}
          <FeaturesSectionDemo />

          <div data-tf-live="01JG3BA4YR505J4BX4FN9K0G6W"></div><script src="//embed.typeform.com/next/embed.js"></script>

          <FAQ />
          <FeaturedOn />
          <Footer />
      </div>
  );
}






