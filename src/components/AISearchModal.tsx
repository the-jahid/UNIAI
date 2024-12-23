'use client'

import { useState } from "react"
import { z } from "zod"
import { ChatOpenAI } from "@langchain/openai"
import { RunnableSequence } from "@langchain/core/runnables"
import { StructuredOutputParser } from "langchain/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Search, X, Calendar, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input"
import CoverFlow from "./Home/coverFlow"
import { FlipWords } from "./ui/flip-words"

interface AISearchModalProps {
  setEventsdrilling: (events: Event[]) => void
}

interface Event {
  id: string
  name: string
  dates: { start: { localDate: string } }
  images: Array<{ url: string; width: number; height: number }>
  _embedded: {
    venues: Array<{
      name: string
      city: { name: string }
      country: { name: string }
      location: { latitude: string; longitude: string }
    }>
  }
}

const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  dates: z.object({
    start: z.object({
      localDate: z.string(),
    }),
  }),
  images: z.array(
    z.object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
  ),
  _embedded: z.object({
    venues: z.array(
      z.object({
        name: z.string(),
        city: z.object({
          name: z.string(),
        }),
        country: z.object({
          name: z.string(),
        }),
        location: z.object({
          latitude: z.string(),
          longitude: z.string(),
        }),
      })
    ),
  }),
});

const schema = z.array(eventSchema).max(5);

const parser = StructuredOutputParser.fromZodSchema(schema)

const promptTemplate = PromptTemplate.fromTemplate(
  `
  You are an advanced AI model trained to extract structured information about real future events from user queries.
  It will give event result from 2024 december to 2025 december dont use other dates
  Your task is to parse the user's text and return an array of up to 5 real event objects in the following format:

  Event Object Format:
  - id: string (unique identifier for the event)
  - name: string (real event name)
  - dates: 
    - start: 
      - localDate: string (in YYYY-MM-DD format, must be a future date)
  - images: 
    - url: string (use "https://s1.ticketm.net/dam/c/df8/81eadad8-4449-412e-a2b1-3d8bbb78edf8_106181_RECOMENDATION_16_9.jpg" for all events)
    - width: number (use 1024 as default)
    - height: number (use 576 as default)
  - _embedded: 
    - venues: 
      - name: string (real venue name)
      - city: 
        - name: string (real city name)
      - country: 
        - name: string (real country name)
      - location: 
        - latitude: string (approximate latitude)
        - longitude: string (approximate longitude)

  Ensure all information is real and accurate, and all dates are in the future. If you can't find real information for all 5 events, return fewer events.
  Use your knowledge to provide real event names, future dates, and locations.

  User's text: {userText}

  {format_instructions}

  Extracted information:
  `
);

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  modelName: 'gpt-4',
  temperature: 0.2
})

const chain = RunnableSequence.from([
  promptTemplate,
  chatModel,
  parser
])

export default function AISearchModal() {
  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  const words = ["exciting", "popular", "upcoming", "trending", "unmissable"];
  // placeholders and vanish input
  const placeholders = [
 "Music festivals in Europe next summer?",
"Tech conferences in Silicon Valley in 2024?",
"Upcoming art exhibitions in New York?",
"Food festivals in Asia in 2025?",
"Sports events in Australia next year?",
  ];
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello world')
    setIsLoading(true)
    try {
      const response = await chain.invoke({
        userText: userText,
        format_instructions: parser.getFormatInstructions(),
      })
      setEvents(response)
      
    } catch (error) {
      console.error('Error:', error)
    }
    setIsLoading(false)
  };

  return (
    <>
     
     
            <Card className="w-full border-0 max-w-8xl bg-black text-white h-[80vh]">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">AI Event Search</CardTitle>
                <CardDescription className="text-blue-100 text-center">Enter your event search query and let AI find real future events for you</CardDescription>
              </CardHeader>
              <CardContent>

                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={(e) => setUserText(e.target.value)}
                  onSubmit={onSubmit}
                />
                  {isLoading && (
                    <div className="flex justify-center items-center mt-5">
                      <h2>Looking for events...</h2>
                      <Loader2 className="animate-spin h-8 w-8 text-white" />
                    </div>
                  )}
                  
                  {
                    events.length == 0 &&  <div className="mt-20 flex justify-center items-center px-4">
                    <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                      Discover
                      <FlipWords words={words} /> <br />
                      events with Aceternity UI
                    </div>
                  </div>
}
                 
                  
                  {
                  events.length > 0 && <CoverFlow vevents={events} />
                  }
               
              </CardContent>
              
            </Card>
      
    </>
  )
}

