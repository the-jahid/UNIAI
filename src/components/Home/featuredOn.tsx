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
    <section className="w-full bg-black py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="bg-clip-text text-white text-center bg-gradient-to-b from-blue-400 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-8 relative z-20 font-bold tracking-tight mb-8 md:mb-12">
          Featured on
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center p-2 md:p-4">
              <div className="relative w-full h-16 md:h-20 flex items-center justify-center">
                <Image
                  src={logo.url || "/placeholder.svg"}
                  alt={`${logo.name} logo`}
                  fill
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 20vw"
                  className="object-contain max-w-full max-h-full opacity-80 hover:opacity-100 transition-opacity"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
