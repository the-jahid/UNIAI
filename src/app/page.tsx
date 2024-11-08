'use client'

import { CardSpotlightDemo } from "@/components/Home/cardSpotlight";
import { ContainerScrollDemo } from "@/components/Home/containerScroll";
import Coverflow from "@/components/Home/coverFlow";
import FAQ from "@/components/Home/faq";
import FeaturesSectionDemo from "@/components/Home/Feature";

import Footer from "@/components/Home/footer";
import GrandConference from "@/components/Home/grandConference";
import Hero from "@/components/Home/hero";

import Marketing from "@/components/Home/marketiing";
import { HeroParallaxDemo } from "@/components/Home/newHero";
import { WobbleCardDemo } from "@/components/Home/wobble";


export default function Home() {
  return (
      <div>
         {/* <Hero /> */}
         <HeroParallaxDemo />
         <ContainerScrollDemo />
         <WobbleCardDemo />
        {/* <GrandConference />  */}
        {/* <CardSpotlightDemo /> */}
        <FeaturesSectionDemo />
        {/* <Coverflow /> */}
        {/* <Marketing /> */}
        {/* <LampDemo /> */}
        <FAQ />
        <Footer />
      </div>
  );
}
