import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-blue-400 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
  ‘Unlock the City – <br /> Discover Hidden
  Gems and
  New Friends’
</h2>
<p className="max-w-xl mx-auto text-sm md:text-lg text-white font-semibold dark:text-neutral-400 text-center">
      Explore the city's best-kept secrets and make new connections along the way. Join us to uncover hidden gems, meet new friends, and experience the city like never before.
      </p>
             
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          src="/12.png"
          alt="Hero image"
          width={500}
          height={500}
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        />
      </div>
    </div>
  )
}

