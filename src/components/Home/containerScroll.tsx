"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

export function ContainerScrollDemo() {
  return (
  

         
      <ContainerScroll
        titleComponent={
          <>
<h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-blue-400 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
  ‘Unlock the City – <br /> Discover Hidden
  Gems and
  New Friends’
</h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-white font-semibold dark:text-neutral-400 text-center">
      Explore the city's best-kept secrets and make new connections along the way. Join us to uncover hidden gems, meet new friends, and experience the city like never before.
      </p>
          </>
        }
      >
        <Image
          src={`/12.png`}
          alt="hero"
          height={800}
          width={900}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
   
 
  );
}
