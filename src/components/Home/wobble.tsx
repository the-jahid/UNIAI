"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full  relative">

<WobbleCard
  containerClassName="col-span-1 lg:col-span-2 h-full bg-black min-h-[500px] lg:min-h-[300px]  lg:p-8 rounded-lg shadow-lg relative overflow-hidden"
  className=""
>
  <div className="w-full lg:max-w-md">
    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
      Discover Your World
    </h2>
    <p className="mt-4 text-left text-sm md:text-base lg:text-lg text-neutral-200">
      With UNI, your digital explorations turn into real-life adventures. Our interactive discovery map connects you to people, places, and events nearby or across the globe. Express yourself and explore with ease!
    </p>
  </div>
  <Image
    src="/38801B08-60EB-4140-A1D2-AE6670390283.png"
    width={700}
    height={500}
    alt="linear demo image"
    className=" lg:absolute lg:-right-[25%]  lg:-top-12 filter lg:-z-20 object-contain rounded-2xl"
  />
</WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Match & Mingle
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        UNI does the magic, finding events, people, and job opportunities that are perfectly tailored to you. No more endless scrolling-just perfect matches!
       
        </p>
        <Image
          src="/9DF64E3F-140B-4BA2-AB0A-D416FA0B1E63.png"
          width={700}
          height={500}
          alt="linear demo image"
          className="lg:absolute  lg:-right-[10%]   -z-30 filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Make $100K+ Behind The Wheel
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        Unlock the potential to earn $100k by driving. Join our platform to find lucrative driving opportunities and maximize your earnings.
       
        </p>

        <Image src={'/1B287805-B157-4EAA-BCF2-590FEC73FD43.png'} width={300} height={100} alt="100k" />
      </WobbleCard>
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-black min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Luxury Rides, at Budget Prices
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          Once you’ve nailed down your dream destination or just need a quick lift, booking your ride is as smooth as butter! You can tweak all the fancy settings to suit your vibe. Each journey is packed with a treasure trove of safety features, and guess what? Compared to Uber, our rides are a wallet-friendly 15% cheaper on average

          </p>
        </div>
        <Image
          src="/4A413952-4DDC-4C22-92BD-309488D854E5.png"
          width={700}
          height={500}
          alt="linear demo image"
          className="lg:absolute  lg:-right-[10%]  filter -bottom-10 object-contain rounded-2xl -z-20"
        />
      </WobbleCard>
     
      {/* <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-black min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
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
      </WobbleCard> */}
    </div>
  );
}
