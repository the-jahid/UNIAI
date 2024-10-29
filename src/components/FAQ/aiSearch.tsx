"use client";

import Image from "next/image";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";


export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
//     <Vortex
//     backgroundColor="black"
//     className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
//   >
    
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4 relative">
      <Image src={'/q-and-a-about-loan.png'} width={400} height={400} alt='faq' className='absolute bottom-0 right-0 -z-10' />
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-blue-200">
      Got Questions? We’re Here to Help Get You Started With Our Product.
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
    // </Vortex>
  );
}



