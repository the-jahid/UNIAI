'use client'

import { ContainerScrollDemo } from "@/components/Home/containerScroll";
import FAQ from "@/components/Home/faq";

import FeaturesSectionDemo from "@/components/Home/Feature";

import Footer from "@/components/Home/footer";

import { HeroParallaxDemo } from "@/components/Home/newHero";
import Waitlist from "@/components/Home/waitlist";
import AdvancedCarousel from "@/components/Home/wobble";



export default function Home() {
  return (
      <div>
         {/* <Hero /> */}
         <HeroParallaxDemo />
         <ContainerScrollDemo />
         <AdvancedCarousel />
          {/* <GrandConference />  */}
          {/* <CardSpotlightDemo /> */}
          <Waitlist />
          <FeaturesSectionDemo />
          {/* <Coverflow /> */}
          {/* <Marketing /> */}
          {/* <LampDemo /> */}
          <FAQ />
        <Footer />
      </div>
  );
}
