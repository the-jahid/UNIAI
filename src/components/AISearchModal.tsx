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

export default function AISearchModal({ setEventsdrilling }: AISearchModalProps) {
  const [userText, setUserText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const response = await chain.invoke({
        userText: userText,
        format_instructions: parser.getFormatInstructions(),
      })
      setEvents(response)
      setEventsdrilling(response)
    } catch (error) {
      console.error('Error:', error)
    }
    setIsLoading(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black text-white hover:bg-blue-700"
      >
        <Search className="mr-2 h-4 w-4" /> Open AI Event Search
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <Card className="w-full max-w-4xl bg-black text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">AI Event Search</CardTitle>
                <CardDescription className="text-blue-100">Enter your event search query and let AI find real future events for you</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea 
                    value={userText} 
                    onChange={(e) => setUserText(e.target.value)} 
                    className="min-h-[100px] bg-white text-blue-900 placeholder-blue-400"
                    placeholder="Enter your event search query here... (e.g., 'Music festivals in Europe next summer')"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-blue-600 hover:bg-blue-100"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching for events...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search Events
                      </>
                    )}
                  </Button>
                </form>
                {events.length > 0 && (
                  <ScrollArea className="h-[400px] mt-4">
                    <div className="space-y-4">
                      {events.map((event) => (
                        <Card key={event.id} className="bg-black text-white">
                          <CardContent className="p-4">
                            <h3 className="text-lg font-semibold">{event.name}</h3>
                            <p className="text-sm text-blue-200">
                              <Calendar className="inline-block mr-1 h-4 w-4" />
                              {new Date(event.dates.start.localDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-blue-200">
                              <MapPin className="inline-block mr-1 h-4 w-4" />
                              {event._embedded.venues[0].name}, {event._embedded.venues[0].city.name}, {event._embedded.venues[0].country.name}
                            </p>
                            
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
              <CardFooter className="justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="bg-white text-blue-600 hover:bg-blue-100"
                >
                  <X className="mr-2 h-4 w-4" /> Close
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

