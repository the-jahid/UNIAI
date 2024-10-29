"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full py-20 relative">
      <Image src={'/couple-discussing-about-pick-of-income-for-savings.png'} width={400} height={400} alt='faq' className='absolute -top-40 right-0 -z-10' />
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-black min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Discover Your World
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          With UNI, your digital explorations turn into real-life adventures. Our interactive discovery map connects you to people, places, and events nearby or across the globe. Express yourself and explore with ease!

          </p>
        </div>
        <Image
          src="/subscribe.svg"
          width={700}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Match & Mingle
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        UNI does the magic, finding events, people, and job opportunities that are perfectly tailored to you. No more endless scrolling-just perfect matches!
       
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-black min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          On Demand Rides,
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          No Surpries
Hop on a ride instantly, no price surges ever. Customize your travel experience, whether you're headed around the block or across town. UNI keeps it smooth and affordable, always
Earn on Your Terms
          </p>
        </div>
        <Image
          src="/followers.png"
          width={400}
          height={500}
          alt="linear demo image"
          className="absolute right-10 -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
