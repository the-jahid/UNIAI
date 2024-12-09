"use client";
import Image from "next/image";

import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `UNI was born out of a desire to simplify life and boost meaningful connections. We saw how people were paying more for rides, yet gig workers were earning less. That didn’t sit right with us, so we set out to create a solution that empowers everyone.
 

We’re not just a social app or a rideshare service—we’re a community. UNI bridges the gap between connecting online and making those connections come to life, whether it’s through events, travel, or work opportunities. Every interaction is designed to be seamless, personalized, and rewarding.
 

At UNI, we believe in fairness, freedom, and fun. From the moment you open the app, our goal is to make life easier, more exciting, and more rewarding for you. Let’s create your journey together!`

export function AboutHero() {
  return <div className="relative flex flex-col lg:flex-row justify-center items-center text-center p-10 lg:p-20">
  <Image 
    src={'/freepik_br_12000575-0c2a-4ee4-a60a-bcfdeca6486e.png'} 
    width={500}
    height={400}
    alt="about_image"
    className=" w-full lg:w-auto"
  />
  <div className="mt-10 lg:mt-0 lg:ml-10 text-center lg:text-left">
  <h1 className="text-blue-500 text-2xl lg:text-4xl font-bold">ABOUT UNI-AI</h1>
  <TextGenerateEffect words={words} />
</div>
</div>
}
