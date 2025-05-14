// "use client"

// import { useEffect, useRef, useState } from "react"
// import Image from "next/image"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
//   type CarouselApi,
// } from "@/components/ui/carousel"
// import { Card, CardContent } from "@/components/ui/card"
// import Autoplay from "embla-carousel-autoplay"

// const featuredLogos = [
//   { name: "TechCrunch", url: "/cbs-converted.png" },
//   { name: "Forbes", url: "/LOGODMV.png" },
//   { name: "Wired", url: "/wusa-9-tv.svg" },
//   { name: "Wired", url: "/36B2D3EF-B64D-4858-9B75-2013244BB9C3.png" },
//   { name: "Wired", url: "/FC7BCBC6-5656-427E-A853-353CCF685111.png" },

// ]

// const FeaturedOn = () => {
//   const [api, setApi] = useState<CarouselApi>()
//   const [current, setCurrent] = useState(0)
//   const [count, setCount] = useState(0)
//   const autoplayRef = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))

//   useEffect(() => {
//     if (!api) {
//       return
//     }

//     setCount(api.scrollSnapList().length)
//     setCurrent(api.selectedScrollSnap() + 1)

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1)
//     })
//   }, [api])

//   return (
//     <section className="py-12 bg-black ">
//       <div className="container mx-auto px-4 ">
//         <h2 className="text-3xl font-bold text-center mb-8 text-white">Featured On</h2>
//         <Carousel
//           setApi={setApi}
//           plugins={[autoplayRef.current]}
//           opts={{
//             align: "start",
//             loop: true,
//           }}
//           className="w-full max-w-5xl mx-auto"
//         >
//           <CarouselContent>
//             {featuredLogos.map((logo, index) => (
//               <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 ">
//                 <div className="p-1 ">
//                   <Card >
//                     <CardContent className="flex border-blue-500 bg-black items-center justify-center p-6 aspect-video">
//                       <Image
//                         src={logo.url || "/placeholder.svg"}
//                         alt={`${logo.name} logo`}
//                         width={200}
//                         height={80}
//                         className="max-w-full h-auto object-contain"
//                       />
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//         <div className="flex justify-center mt-4">
//           <span className="text-sm text-gray-500">
//             {current} / {count}
//           </span>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default FeaturedOn




import Image from "next/image"

export default function FeaturedOn() {
  const logos = [
  { name: "TechCrunch", url: "/cbs-converted.png" },
  { name: "Forbes", url: "/LOGODMV.png" },
  { name: "Wired", url: "/wusa-9-tv.svg" },
  { name: "Wired", url: "/36B2D3EF-B64D-4858-9B75-2013244BB9C3.png" },
  { name: "Wired", url: "/FC7BCBC6-5656-427E-A853-353CCF685111.png" },
  ]

  return (
    <section className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="bg-clip-text text-white text-center bg-gradient-to-b from-blue-400 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight mb-10">
         Featured on
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center">
              <div className="h-12 relative flex items-center justify-center">
                <Image
                  src={logo.url || "/placeholder.svg"}
                  alt={`${logo.name} logo`}
                  width={160}
                  height={48}
                  className="object-contain max-h-28 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
































