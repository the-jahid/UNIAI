
"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BackgroundLines } from "./background-lines";
import { Button } from "./button";
import { Apple, AppleIcon, PlaySquare } from "lucide-react";
import { RiAppleLine } from "react-icons/ri";
import { IoLogoGooglePlaystore } from "react-icons/io5";
export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[250vh] lg:h-[300vh]  overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])
  return (
<BackgroundLines>
  <div className="flex flex-col lg:flex-row items-center justify-center">
  <div className="relative mx-auto py-20 md:py-40 px-4 w-full lg:w-1/2 z-50">
  <h1 className="text-4xl  lg:text-7xl font-bold text-white text-center lg:text-left">
  Discover <br /> Connect <br /> Experience
  </h1>
  
  <h4 className="text-white text-lg md:text-xl lg:text-3xl text-center lg:text-left mt-2">
  Find What’s Moving. See Who’s Going
  </h4>

 
  <div className="flex flex-col sm:flex-row justify-center lg:justify-start mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
      <button className="px-6 py-3 font-medium text-white border-2 border-blue-500 rounded-full flex items-center justify-center space-x-2 hover:bg-blue-500 transition-colors duration-300">
        <RiAppleLine />
        <span>Coming Soon To App Store </span>
      </button>
      <button className="px-6 py-3 font-medium text-white border-2 border-blue-500 rounded-full flex items-center justify-center space-x-2 hover:bg-blue-500 transition-colors duration-300">
      <IoLogoGooglePlaystore />
        <span>Coming Soon to Play Store</span>
      </button>
    </div>
</div>
    <motion.div
      className="w-full lg:w-1/2 relative mt-10 lg:mt-0"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ perspective: 10000 }}
    >
      <motion.div
        className="absolute inset-0 bg-sky-400 rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 80, 180],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      />
      <motion.div
        className="relative cursor-move"
        style={{
          rotateX,
          rotateY,
        }}
        drag
        dragConstraints={{ left: 100, right: 100, top: 100, bottom: 100 }}
        dragElastic={0.1}
      >
        <Image
          src="/freepik_br_12000575-0c2a-4ee4-a60a-bcfdeca6486e.png"
          width={600}
          height={600}
          alt="UNI App Screenshot"
          className="rounded-3xl shadow-2xl transform -rotate-6 scale-90"
        />
      </motion.div>
      <motion.div
        className="absolute top-1/2 -left-20 w-40 h-40 border-2 border-dashed border-sky-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  </div>
</BackgroundLines>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
 
      <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
 
  );
};
