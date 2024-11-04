'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const eventTypes = ['concert', 'sports']
const concertGenres = ['Hip Hop', 'Pop', 'Jazz', 'Country', 'Rock', 'Alternative', 'Latino', 'K-Pop']
const artists = [
  'Taylor Swift', 'Beyoncé', 'Kendrick Lamar', 'Ariana Grande', 'Post Malone',
  'Rod Wave', 'Tyler The Creator', 'GloRilla', 'Bruno Mars', 'Zach Bryan',
  'Ken Carson', 'Chappell Roan', 'Queen', 'Michael Jackson', 'Morgan Wallen',
  'Eminem', 'Playboi Carti', 'Travis Scott', 'Shaboozey', 'Future',
  'Metro Boomin', 'Megan Thee Stallion', 'The Weeknd', 'Lil Baby', 'Bad Bunny',
  'Billie Eilish', 'Rolling Stones', 'Led Zepelin', 'Doja Cat', 'Olivia Rodrigo',
  'Harry Styles', 'Gunna', 'Young Thug', 'Sabrina Carpenter', 'Rihanna',
  'Cardi B', 'Drake', 'Dua Lipa', 'SZA', 'J Balvin',
  'Ed Sheeran', 'Justin Bieber', 'Lizzo', 'BTS'
]
const venueSizes = ['Small clubs', 'Large arenas', 'Outdoor']
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  'Anywhere'
]
const sports = ['Basketball', 'Football', 'Baseball', 'Hockey', 'Soccer']
const eventPreferences = ['Live games', 'Watch parties', 'Playoffs']
const seatingPreferences = ['Family-friendly', 'Energetic fan zone']
const placeTypes = ['Dining', 'Entertainment', 'Relaxation', 'Shopping', 'Exploring']
const atmospheres = ['Casual', 'Romantic', 'Adventurous', 'Quiet', 'Festive']
const companions = ['Solo', 'Family', 'Friends', 'Date', 'Children']
const cuisines = ['Italian', 'Japanese', 'Vegan']
const activities = ['Movies', 'Bowling', 'Art Galleries']
const budgets = ['$', '$$', '$$$', '$$$$']
const distances = ['Less than 5 miles', '5-10 miles', 'Over 10 miles']
const specialRequirements = ['Wheelchair Access', 'Pet-Friendly', 'Vegetarian Options', 'Child-Friendly']
const timeConstraints = ['Less than an hour', 'A couple of hours', 'Half a day', 'No rush']
const visitFrequencies = ['Special Occasion', 'Routine Outing', 'First Time', 'Rarely']
const weatherPreferences = ['Indoor', 'Outdoor', 'No preference']
const culturalPreferences = ['Live Music', 'Sports', 'Art', 'Theater', 'None']

export default function Component({ isOpen, onClose }: ModalProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    selectedOption: '',
    eventType: '',
    concertGenre: '',
    selectedArtists: [] as string[],
    isLocalShow: false,
    venueSize: '',
    selectedState: '',
    date: undefined as Date | undefined,
    sport: '',
    favoriteTeam: '',
    eventPreference: '',
    seatingPreference: '',
    placeType: '',
    atmosphere: '',
    companion: '',
    cuisine: '',
    activity: '',
    dislikes: '',
    budget: '',
    distance: '',
    specialRequirement: '',
    timeConstraint: '',
    previousExperience: '',
    visitFrequency: '',
    weatherPreference: '',
    culturalPreference: '',
  })

  if (!isOpen) return null

  const handleInputChange = (field: string, value: string | string[] | boolean | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === renderSteps().length - 1) {
      console.log(formData)
      onClose()
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const renderSteps = () => [
    // Step 0: Initial question
    <div key="initial" className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-300">Are you looking for an event or a place to go?</h3>
      <RadioGroup value={formData.selectedOption} onValueChange={(value) => handleInputChange('selectedOption', value)} className="space-y-3">
        {['event', 'place to go', 'either'].map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} className="border-blue-500" />
            <Label htmlFor={option} className="text-white capitalize">{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>,

    // Step 1: Event type or place type
    <div key="type" className="mb-6">
      {formData.selectedOption === 'event' || formData.selectedOption === 'either' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">What type of event are you interested in?</h3>
          <RadioGroup value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)} className="space-y-3">
            {eventTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} className="border-blue-500" />
                <Label htmlFor={type} className="text-white capitalize">{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">What kind of place are you looking for?</h3>
          <Select value={formData.placeType} onValueChange={(value) => handleInputChange('placeType', value)}>
            <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
              <SelectValue placeholder="Select place type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {placeTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
    </div>,

    // Step 2: Concert genre or sport
    <div key="genre-sport" className="mb-6">
      {formData.eventType === 'concert' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">What genre of concert are you interested in?</h3>
          <Select value={formData.concertGenre} onValueChange={(value) => handleInputChange('concertGenre', value)}>
            <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {concertGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : formData.eventType === 'sports' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">What's your favorite sport?</h3>
          <Select value={formData.sport} onValueChange={(value) => handleInputChange('sport', value)}>
            <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
              <SelectValue placeholder="Select a sport" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {sports.map((sport) => (
                <SelectItem key={sport} value={sport}>{sport}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : null}
    </div>,

    // Step 3: Artists selection or team selection
    <div key="artists-team" className="mb-6">
      {formData.eventType === 'concert' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Select 3 of these artists who are your favorite</h3>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {artists.map((artist) => (
              <div key={artist} className="flex items-center space-x-2">
                <Checkbox
                  id={artist}
                  checked={formData.selectedArtists.includes(artist)}
                  onCheckedChange={(checked) => {
                    const newArtists = checked
                      ? [...formData.selectedArtists, artist].slice(0, 3)
                      : formData.selectedArtists.filter((a) => a !== artist)
                    handleInputChange('selectedArtists', newArtists)
                  }}
                  className="border-blue-500"
                />
                <label
                  htmlFor={artist}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                >
                  {artist}
                </label>
              </div>
            ))}
          </div>
        </>
      ) : formData.eventType === 'sports' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Who's your favorite team?</h3>
          <Input
            type="text"
            value={formData.favoriteTeam}
            onChange={(e) => handleInputChange('favoriteTeam', e.target.value)}
            placeholder="Enter your favorite team"
            className="w-full bg-gray-800 text-white border-blue-500"
          />
        </>
      ) : null}
    </div>,

    // Step 4: Local shows or travel / Event preferences
    <div key="local-travel" className="mb-6">
      {formData.eventType === 'concert' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Are you looking for local shows or are you willing to travel for concerts?</h3>
          <RadioGroup value={formData.isLocalShow ? 'yes' : 'no'} onValueChange={(value) => handleInputChange('isLocalShow', value === 'yes')} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" className="border-blue-500" />
              <Label htmlFor="yes" className="text-white">Yes, local shows only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" className="border-blue-500" />
              <Label htmlFor="no" className="text-white">No, I'm willing to travel</Label>
            </div>
          </RadioGroup>
        </>
      ) : formData.eventType === 'sports' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Are you looking for live games, watch parties, or specific events like playoffs?</h3>
          <Select value={formData.eventPreference} onValueChange={(value) => handleInputChange('eventPreference', value)}>
            <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
              <SelectValue placeholder="Select event preference" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {eventPreferences.map((pref) => (
                <SelectItem key={pref} value={pref}>{pref}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : null}
    </div>,

    // Step 5: Venue size / Seating preference
    <div key="venue-seating" className="mb-6">
      {formData.eventType === 'concert' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">What's your preferred venue size?</h3>
          <Select value={formData.venueSize} onValueChange={(value) => handleInputChange('venueSize', value)}>
            <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
              <SelectValue placeholder="Select venue size" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {venueSizes.map((size) => (
                
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : formData.eventType === 'sports' ? (
        <>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Would you prefer family-friendly seating or a more energetic fan zone?</h3>
          <Select value={formData.seatingPreference} onValueChange={(value) => handleInputChange('seatingPreference', value)}>
            <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
              <SelectValue placeholder="Select seating preference" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {seatingPreferences.map((pref) => (
                <SelectItem key={pref} value={pref}>{pref}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      ) : null}
    </div>,

    // Step 6: State selection
    <div key="state" className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-300">Select the state you want the {formData.eventType || 'place'} to be in</h3>
      <Select value={formData.selectedState} onValueChange={(value) => handleInputChange('selectedState', value)}>
        <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white">
          {states.map((state) => (
            <SelectItem key={state} value={state}>{state}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>,

    // Step 7: Date selection
    <div key="date" className="mb-6">
      <h3 className="text-xl font-semibold mb-4 text-blue-300">How soon do you want to go?</h3>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal bg-gray-800 text-white border-blue-500",
              !formData.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-800">
          <Calendar
            mode="single"
            selected={formData.date}
            onSelect={(date) => handleInputChange('date', date)}
            initialFocus
            className="bg-gray-800 text-white"
          />
        </PopoverContent>
      </Popover>
    </div>,

    // Additional steps for places
    ...(formData.selectedOption === 'place to go' || formData.selectedOption === 'either' ? [
      // Atmosphere
      <div key="atmosphere" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">What kind of atmosphere suits your mood right now?</h3>
        <Select value={formData.atmosphere} onValueChange={(value) => handleInputChange('atmosphere', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select atmosphere" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {atmospheres.map((atm) => (
              <SelectItem key={atm} value={atm}>{atm}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Companion
      <div key="companion" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Who will be accompanying you?</h3>
        <Select value={formData.companion} onValueChange={(value) => handleInputChange('companion', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select companion" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {companions.map((comp) => (
              <SelectItem key={comp} value={comp}>{comp}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Cuisine or Activity
      <div key="cuisine-activity" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">
          {formData.placeType === 'Dining' ? "Any specific cuisine you're interested in today?" : "Any specific activity you're interested in today?"}
        </h3>
        <Select 
          value={formData.placeType === 'Dining' ? formData.cuisine : formData.activity} 
          onValueChange={(value) => handleInputChange(formData.placeType === 'Dining' ? 'cuisine' : 'activity', value)}
        >
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder={`Select ${formData.placeType === 'Dining' ? 'cuisine' : 'activity'}`} />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {(formData.placeType === 'Dining' ? cuisines : activities).map((item) => (
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Dislikes
      <div key="dislikes" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Anything you want to avoid?</h3>
        <Input
          type="text"
          value={formData.dislikes}
          onChange={(e) => handleInputChange('dislikes', e.target.value)}
          placeholder="Enter any dislikes"
          className="w-full bg-gray-800 text-white border-blue-500"
        />
      </div>,

      // Budget
      <div key="budget" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">What's your budget for this outing?</h3>
        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select budget" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {budgets.map((budget) => (
              <SelectItem key={budget} value={budget}>{budget}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Distance
      <div key="distance" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">How far are you comfortable traveling for this?</h3>
        <Select value={formData.distance} onValueChange={(value) => handleInputChange('distance', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select travel distance" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {distances.map((dist) => (
              <SelectItem key={dist} value={dist}>{dist}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Special Requirements
      <div key="special-requirements" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Any special requirements we should know about?</h3>
        <Select value={formData.specialRequirement} onValueChange={(value) => handleInputChange('specialRequirement', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select special requirement" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {specialRequirements.map((req) => (
              <SelectItem key={req} value={req}>{req}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Time Constraints
      <div key="time-constraints" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">How much time do you have for this outing?</h3>
        <Select value={formData.timeConstraint} onValueChange={(value) => handleInputChange('timeConstraint', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select time constraint" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {timeConstraints.map((time) => (
              <SelectItem key={time} value={time}>{time}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Previous Experiences
      <div key="previous-experiences" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Have you recently visited a place you loved and want something similar?</h3>
        <RadioGroup value={formData.previousExperience} onValueChange={(value) => handleInputChange('previousExperience', value)} className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="prev-yes" className="border-blue-500" />
            <Label htmlFor="prev-yes" className="text-white">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="prev-no" className="border-blue-500" />
            <Label htmlFor="prev-no" className="text-white">No, looking for something new</Label>
          </div>
        </RadioGroup>
        {formData.previousExperience === 'yes' && (
          <Input
            type="text"
            value={formData.previousExperience}
            onChange={(e) => handleInputChange('previousExperience', e.target.value)}
            placeholder="Describe the place"
            className="w-full mt-4 bg-gray-800 text-white border-blue-500"
          />
        )}
      </div>,

      // Frequency of Visits
      <div key="visit-frequency" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Is this a special occasion or more of a routine outing for you?</h3>
        <Select value={formData.visitFrequency} onValueChange={(value) => handleInputChange('visitFrequency', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select visit frequency" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {visitFrequencies.map((freq) => (
              <SelectItem key={freq} value={freq}>{freq}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Weather Considerations
      <div key="weather" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Considering the weather today, would you prefer an indoor or outdoor setting?</h3>
        <Select value={formData.weatherPreference} onValueChange={(value) => handleInputChange('weatherPreference', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select weather preference" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {weatherPreferences.map((pref) => (
              <SelectItem key={pref} value={pref}>{pref}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,

      // Cultural Preferences
      <div key="cultural" className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-300">Looking for any specific cultural themes or experiences?</h3>
        <Select value={formData.culturalPreference} onValueChange={(value) => handleInputChange('culturalPreference', value)}>
          <SelectTrigger className="w-full bg-gray-800 text-white border-blue-500">
            <SelectValue placeholder="Select cultural preference" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white">
            {culturalPreferences.map((pref) => (
              <SelectItem key={pref} value={pref}>{pref}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>,
    ] : [])
  ]

  const steps = renderSteps()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto border border-blue-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-300">UNI AI Dev Guide</h2>
        {steps[step]}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={step === 0 ? onClose : handleBack}
            className="w-full mr-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            {step === 0 ? 'Close' : 'Back'}
          </Button>
          <Button
            className="w-full ml-2 bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleNext}
            disabled={!formData.selectedOption && step === 0}
          >
            {step === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}