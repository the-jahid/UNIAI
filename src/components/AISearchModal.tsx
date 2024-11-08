"use client"

import { useState } from "react"
import { Calendar, MapPin } from "lucide-react"
import Event from "./event"
import Place from "./place"

export default function AISearchModal(setEventsdrilling:any) {
  const [selectedOption, setSelectedOption] = useState<"event" | "place" | null>(null)

  const handleOptionSelect = (option: "event" | "place") => {
    setSelectedOption(option)
  }

  return (
    <div className="min-h-[40vh]   bg-gradient-to-b from-[#000033] to-black  flex items-center justify-center p-4 ">
      
        {!selectedOption && 
          <div className="space-y-6">
            <h2 className="text-4xl font-medium text-white text-center">Are you looking for an event or a place to go?</h2>
            <p className="text-zinc-400 text-center">This ensures you receive more accurate recommendations</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleOptionSelect("event")}
                className="bg-blue-700 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-blue-500 hover:border-purple-500 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-black/30 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <span className="text-white text-lg">Event</span>
              </button>
              <button
                onClick={() => handleOptionSelect("place")}
                className="bg-blue-700 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-blue-500 hover:border-purple-500 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-black/30 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <span className="text-white text-lg">Place to go</span>
              </button>
            </div>
          </div>
         }

        {
          selectedOption == 'event' && <Event setEventsdrilling={setEventsdrilling} />
        }
        
        {
          selectedOption == 'place' && <Place setEventsdrilling={setEventsdrilling} />
        }
        

        
    </div>
  )
}