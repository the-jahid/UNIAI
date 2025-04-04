'use client'

import { ContainerScrollDemo } from "@/components/Home/containerScroll";
import FAQ from "@/components/Home/faq";
import FeaturesSectionDemo from "@/components/Home/Feature";
import FeaturedOn from "@/components/Home/featuredOn";
import Footer from "@/components/Home/footer";
import HeroSection from "@/components/Home/newb";
import { HeroParallaxDemo } from "@/components/Home/newHero";
import { UniSignupForm } from "@/components/Home/uni-signup-form";
import Waitlist from "@/components/Home/waitlist";
import AdvancedCarousel from "@/components/Home/wobble";

export default function Home() {
  return (
      <div>
          <HeroParallaxDemo />
          <ContainerScrollDemo />
       
          <AdvancedCarousel />
          {/* <Waitlist /> */}
          <UniSignupForm />
          <FeaturesSectionDemo />
          
          <FAQ />
          <FeaturedOn />
          <Footer />
      </div>
  );
}






