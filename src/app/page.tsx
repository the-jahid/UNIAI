'use client'

import CircularGallery from "@/components/Home/circularGallery";
import { ContainerScrollDemo } from "@/components/Home/containerScroll";
import FAQ from "@/components/Home/faq";
import FeaturesSectionDemo from "@/components/Home/Feature";
import FeaturedOn from "@/components/Home/featuredOn";
import Footer from "@/components/Home/footer";

import { HeroParallaxDemo } from "@/components/Home/newHero";
import { UniSignupForm } from "@/components/Home/uni-signup-form";
;

export default function Home() {
  return (
      <div>
          <HeroParallaxDemo />
          {/* <ContainerScrollDemo /> */}
       
           <div style={{ height: '600px', position: 'relative' }}>
            <h2 className="text-white text-center font-bold text-6xl" >Your Onestop For Everything Lifestyle & IRL Culture</h2>
           <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
           </div>
          {/* <Waitlist /> */}
          {/* <UniSignupForm /> */}
          <FeaturesSectionDemo />

        

          <FAQ />
          <FeaturedOn />
          <Footer />
      </div>
  );
}






