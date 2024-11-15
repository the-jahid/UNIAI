'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, Calendar } from 'lucide-react'
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { AIEventSearch } from "@/lib/aiSearch"

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const artists = [
  'Taylor Swift', 'Beyoncé', 'Kendrick Lamar', 'Ariana Grande',
  'Post Malone', 'Rod Wave', 'Tyler The Creator', 'GloRilla',
  'Bruno Mars', 'Zach Bryan', 'Ken Carson', 'Chappell Roan',
  'Queen', 'Michael Jackson', 'Morgan Wallen', 'Eminem',
  'Playboi Carti', 'Travis Scott', 'Shaboozey', 'Future',
  'Metro Boomin', 'Megan Thee Stallion', 'The Weeknd', 'Lil Baby',
  'Bad Bunny', 'Billie Eilish', 'Rolling Stones', 'Led Zepelin',
  'Doja Cat', 'Olivia Rodrigo', 'Harry Styles', 'Gunna',
  'Young Thug', 'Sabrina Carpenter', 'Rihanna', 'Cardi B',
  'Drake', 'Dua Lipa', 'SZA', 'J Balvin', 'Ed Sheeran',
  'Justin Bieber', 'Lizzo', 'BTS',' Destroy Lonely', 'Jelly Roll'
]

const purposes = ['Dining', 'Entertainment', 'Relaxation', 'Shopping', 'Exploring']
const atmospheres = ['Casual', 'Romantic', 'Adventurous', 'Quiet', 'Festive']
const companions = ['Solo', 'Family', 'Friends', 'Date', 'Children']

interface AISearchModalProps {
  setEventsdrilling: (events: any) => void;
}
export default function Component({ setEventsdrilling }: AISearchModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedState, setSelectedState] = useState("")
  const [selectedArtists, setSelectedArtists] = useState<string[]>([])
  const [selectedPurpose, setSelectedPurpose] = useState("")
  const [selectedAtmosphere, setSelectedAtmosphere] = useState("")
  const [selectedCompanion, setSelectedCompanion] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleArtistSelection = (artist: string) => {
    setSelectedArtists(prev => {
      if (prev.includes(artist)) {
        return prev.filter(a => a !== artist)
      }
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, artist]
    })
  }

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-white">Select your state</DialogTitle>
              <DialogDescription className="text-blue-200">
                Choose the state you're currently in
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-5 gap-2 max-h-[400px] overflow-y-auto p-2">
              {states.map((state) => (
                <Button
                  key={state}
                  variant={selectedState === state ? "default" : "outline"}
                  className={`w-full ${selectedState === state ? 'bg-blue-600 text-white' : 'bg-blue-900 text-white hover:bg-blue-800'}`}
                  onClick={() => setSelectedState(state)}
                >
                  {state}
                </Button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-white">Select your favorite artists</DialogTitle>
              <DialogDescription className="text-blue-200">
                Choose 3 artists from the list below
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto p-2">
              {artists.map((artist) => (
                <Button
                  key={artist}
                  variant={selectedArtists.includes(artist) ? "default" : "outline"}
                  className={`w-full relative ${selectedArtists.includes(artist) ? 'bg-blue-600 text-white' : 'bg-blue-900 text-white hover:bg-blue-800'}`}
                  onClick={() => handleArtistSelection(artist)}
                  disabled={selectedArtists.length >= 3 && !selectedArtists.includes(artist)}
                >
                  {artist}
                  {selectedArtists.includes(artist) && (
                    <Check className="w-4 h-4 absolute right-2" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-white">What brings you out today?</DialogTitle>
              <DialogDescription className="text-blue-200">
                Select the main purpose of your outing
              </DialogDescription>
            </DialogHeader>
            <RadioGroup value={selectedPurpose} onValueChange={setSelectedPurpose}>
              {purposes.map((purpose) => (
                <div
                  key={purpose}
                  className="flex items-center space-x-2 rounded-lg border border-blue-600 p-4 cursor-pointer"
                  onClick={() => setSelectedPurpose(purpose)}
                >
                  <RadioGroupItem value={purpose} id={purpose} className="border-blue-400 text-blue-400" />
                  <Label htmlFor={purpose} className="text-white">{purpose}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      case 4:
        return (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-white">What atmosphere suits your mood?</DialogTitle>
              <DialogDescription className="text-blue-200">
                Choose the vibe you're looking for
              </DialogDescription>
            </DialogHeader>
            <RadioGroup value={selectedAtmosphere} onValueChange={setSelectedAtmosphere}>
              {atmospheres.map((atmosphere) => (
                <div
                  key={atmosphere}
                  className="flex items-center space-x-2 rounded-lg border border-blue-600 p-4 cursor-pointer"
                  onClick={() => setSelectedAtmosphere(atmosphere)}
                >
                  <RadioGroupItem value={atmosphere} id={atmosphere} className="border-blue-400 text-blue-400" />
                  <Label htmlFor={atmosphere} className="text-white">{atmosphere}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      case 5:
        return (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-white">Who will be accompanying you?</DialogTitle>
              <DialogDescription className="text-blue-200">
                Select who you'll be spending time with
              </DialogDescription>
            </DialogHeader>
            <RadioGroup value={selectedCompanion} onValueChange={setSelectedCompanion}>
              {companions.map((companion) => (
                <div
                  key={companion}
                  className="flex items-center space-x-2 rounded-lg border border-blue-600 p-4 cursor-pointer"
                  onClick={() => setSelectedCompanion(companion)}
                >
                  <RadioGroupItem value={companion} id={companion} className="border-blue-400 text-blue-400" />
                  <Label htmlFor={companion} className="text-white">{companion}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      case 6:
        return (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-white">When do you want to go?</DialogTitle>
              <DialogDescription className="text-blue-200">
                Select a date or choose 'Whenever'
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-blue-900 text-white border-blue-600 hover:bg-blue-800">
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-blue-900 border-blue-600">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate ?? undefined}
                    onSelect={(day) => setSelectedDate(day ?? null)}
                    initialFocus
                    className="bg-blue-900 text-white"
                  />
                </PopoverContent>
              </Popover>
              <Button
                variant={selectedDate === null ? "default" : "outline"}
                onClick={() => setSelectedDate(null)}
                className={selectedDate === null ? 'bg-blue-600 text-white' : 'bg-blue-900 text-white border-blue-600 hover:bg-blue-800'}
              >
                Whenever
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedState !== ""
      case 2:
        return selectedArtists.length === 3
      case 3:
        return selectedPurpose !== ""
      case 4:
        return selectedAtmosphere !== ""
      case 5:
        return selectedCompanion !== ""
      case 6:
        return true // Always allow proceeding from date selection
      default:
        return false
    }
  }

  const handleSearch = async () => {
    const searchData = {
      state: selectedState,
      artists: selectedArtists,
      purpose: selectedPurpose,
      atmosphere: selectedAtmosphere,
      companion: selectedCompanion,
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Whenever"
    }
  
    const result =await  AIEventSearch(searchData)
    setEventsdrilling(result)
    setShowResults(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">Start AI Search</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black text-white border-blue-600">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`h-2 w-full mx-1 rounded-full ${
                    stepNumber === step
                      ? "bg-blue-600"
                      : stepNumber < step
                      ? "bg-blue-400"
                      : "bg-blue-900"
                  }`}
                />
              ))}
            </div>
            {getStepContent()}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                disabled={step === 1}
                className="bg-blue-900 text-white border-blue-600 hover:bg-blue-800"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  if (step === 6) {
                    handleSearch()
                  } else {
                    setStep((prev) => prev + 1)
                  }
                }}
                disabled={!canProceed()}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {step === 6 ? "Search" : "Continue"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <DialogHeader>
              <DialogTitle className="text-white">Search Complete</DialogTitle>
              <DialogDescription className="text-blue-200">
                Check the map for the search results.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => {
                setOpen(false)
                setStep(1)
                setShowResults(false)
                setSelectedState("")
                setSelectedArtists([])
                setSelectedPurpose("")
                setSelectedAtmosphere("")
                setSelectedCompanion("")
                setSelectedDate(null)
              }}
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            >
              Start New Search
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}