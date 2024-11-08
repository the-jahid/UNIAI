'use client'

import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Calendar, Check, Music2, Trophy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { AIEventSearch } from '@/lib/aiSearch'

const musicGenres = [
  'Hip Hop',
  'Pop',
  'Jazz',
  'Country',
  'Rock',
  'Alternative',
  'Latino',
  'K-Pop',
]

const artists = [
  'Taylor Swift',
  'Beyoncé',
  'Kendrick Lamar',
  'Ariana Grande',
  'Post Malone',
  'Rod Wave',
  'Tyler The Creator',
  'GloRilla',
  'Bruno Mars',
  'Zach Bryan',
  'Ken Carson',
  'Chappell Roan',
  'Queen',
  'Michael Jackson',
  'Morgan Wallen',
  'Eminem',
  'Playboi Carti',
  'Travis Scott',
  'Shaboozey',
  'Future',
  'Metro Boomin',
  'Megan Thee Stallion',
  'The Weeknd',
  'Lil Baby',
  'Bad Bunny',
  'Billie Eilish',
  'Rolling Stones',
  'Led Zeppelin',
  'Doja Cat',
  'Olivia Rodrigo',
  'Harry Styles',
  'Gunna',
  'Young Thug',
  'Sabrina Carpenter',
  'Rihanna',
  'Cardi B',
  'Drake',
  'Dua Lipa',
  'SZA',
  'J Balvin',
  'Ed Sheeran',
  'Justin Bieber',
  'Lizzo',
  'BTS',
]

const states = [
  'Anywhere',
  'AD',
  'AI',
  'AR',
  'AU',
  'AT',
  'AZ',
  'BS',
  'BH',
  'BB',
  'BE',
  'BM',
  'BR',
  'BG',
  'CA',
  'CL',
  'CN',
  'CO',
  'CR',
  'HR',
  'CY',
  'CZ',
  'DK',
  'DO',
  'EC',
  'EE',
  'FO',
  'FI',
  'FR',
  'GE',
  'DE',
  'GH',
  'GI',
  'GB',
  'GR',
  'HK',
  'HU',
  'IS',
  'IN',
  'IE',
  'IL',
  'IT',
  'JM',
  'JP',
  'KR',
  'LV',
  'LB',
  'LT',
  'LU',
  'MY',
  'MT',
  'MX',
  'MC',
  'ME',
  'MA',
  'NL',
  'AN',
  'NZ',
  'ND',
  'NO',
  'PE',
  'PL',
  'PT',
  'RO',
  'RU',
  'LC',
  'SA',
  'RS',
  'SG',
  'SK',
  'SI',
  'ZA',
  'ES',
  'SE',
  'CH',
  'TW',
  'TH',
  'TT',
  'TR',
  'UA',
  'AE',
  'UY',
  'VE',
];

const sports = ['Basketball', 'Football', 'Baseball', 'Hockey', 'Soccer']
const venueTypes = ['Small Clubs', 'Large Arenas', 'Outdoor']
const eventTypes = ['Live Games', 'Watch Parties', 'Playoffs']
const seatingTypes = ['Family-Friendly', 'Fan Zone']

export default function Component(setEventsdrilling:any) {
  const [step, setStep] = React.useState(1)
  const [eventType, setEventType] = React.useState<'concert' | 'sports' | null>(null)
  const [selectedArtists, setSelectedArtists] = React.useState<string[]>([])
  const [isFormComplete, setIsFormComplete] = React.useState(false)

  const form = useForm({
    defaultValues: {
      eventType: '',
      genre: '',
      favoriteArtists: [] as string[],
      willTravel: '',
      venueSize: '',
      state: '',
      date: undefined as Date | undefined,
      sport: '',
      eventCategory: '',
      seatingPreference: '',
    },
  })

  const onSubmit = (data: any) => {
    
    setIsFormComplete(true)
  }

  const SearchEvents = (texts:any) => {
      const data = AIEventSearch(texts)
  }

  const handleArtistSelection = (artist: string, checked: boolean) => {
    if (checked && selectedArtists.length < 3) {
      const newSelectedArtists = [...selectedArtists, artist]
      setSelectedArtists(newSelectedArtists)
      form.setValue('favoriteArtists', newSelectedArtists)
    } else if (!checked) {
      const newSelectedArtists = selectedArtists.filter((a) => a !== artist)
      setSelectedArtists(newSelectedArtists)
      form.setValue('favoriteArtists', newSelectedArtists)
    }
  }

  const getFieldsForCurrentStep = () => {
    switch (step) {
      case 1:
        return ['eventType']
      case 2:
        return eventType === 'concert' ? ['genre'] : ['sport']
      case 3:
        return eventType === 'concert' ? ['favoriteArtists'] : ['eventCategory', 'seatingPreference']
      case 4:
        return eventType === 'concert' ? ['willTravel', 'venueSize'] : ['state']
      case 5:
        return eventType === 'concert' ? ['state'] : ['date']
      case 6:
        return ['date']
      default:
        return []
    }
  }

  return (
    <div className="w-full rounded-md bg-gradient-to-b from-[#000033] to-black p-4 sm:p-6">
      <div className="mx-auto max-w-lg space-y-6 sm:space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Find Your Perfect Event</h1>
          <p className="text-sm sm:text-base text-blue-300">
            Tell us what you&apos;re interested in and we&apos;ll help you find the best events
          </p>
        </div>

        <div className="flex justify-center space-x-1 sm:space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn(
                'h-1 sm:h-2 w-8 sm:w-12 rounded-full',
                step >= i ? 'bg-blue-500' : 'bg-blue-900/20'
              )}
            />
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {step === 1 && (
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-base sm:text-lg text-white">
                      What types of events are you looking for?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value)
                          setEventType(value as 'concert' | 'sports')
                        }}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="relative">
                          <RadioGroupItem
                            value="concert"
                            id="concert"
                            className="peer sr-only"
                          />
                          <label
                            htmlFor="concert"
                            className="flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 border-blue-900 bg-blue-950/50 p-4 sm:p-6 hover:bg-blue-900/20 hover:text-blue-300 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                          >
                            <Music2 className="mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                            <span className="text-base sm:text-lg font-semibold">Concert</span>
                          </label>
                        </div>
                        <div className="relative">
                          <RadioGroupItem
                            value="sports"
                            id="sports"
                            className="peer sr-only"
                          />
                          <label
                            htmlFor="sports"
                            className="flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 border-blue-900 bg-blue-950/50 p-4 sm:p-6 hover:bg-blue-900/20 hover:text-blue-300 peer-data-[state=checked]:border-blue-500 [&:has([data-state=checked])]:border-blue-500"
                          >
                            <Trophy className="mb-2 h-6 w-6 sm:h-8 sm:w-8" />
                            <span className="text-base sm:text-lg font-semibold">Sports</span>
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 2 && eventType === 'concert' && (
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base sm:text-lg text-white">
                      What&apos;s your favorite genre?
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border-blue-900 bg-blue-950/50">
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {musicGenres.map((genre) => (
                          <SelectItem key={genre} value={genre.toLowerCase()}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 3 && eventType === 'concert' && (
              <FormField
                control={form.control}
                name="favoriteArtists"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base sm:text-lg text-white">
                      Select 3 of your favorite artists
                      <span className="ml-2 text-sm text-blue-400">
                        ({selectedArtists.length}/3 selected)
                      </span>
                    </FormLabel>
                    <div className="grid max-h-[300px] sm:max-h-[400px] grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto rounded-lg border border-blue-900 bg-blue-950/50 p-4">
                      {artists.map((artist) => (
                        <div key={artist} className="flex items-center space-x-2">
                          <Checkbox
                            id={artist}
                            checked={selectedArtists.includes(artist)}
                            disabled={
                              !selectedArtists.includes(artist) &&
                              selectedArtists.length >= 3
                            }
                            onCheckedChange={(checked) =>
                              handleArtistSelection(artist, checked === true)
                            }
                          />
                          <label
                            htmlFor={artist}
                            className="text-sm text-white hover:text-blue-300"
                          >
                            {artist}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 4 && eventType === 'concert' && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="willTravel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg text-white">
                        Are you willing to travel for concerts?
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="border-blue-900 bg-blue-950/50">
                            <SelectValue placeholder="Select your preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No, local shows only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="venueSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg text-white">
                        What&apos;s your preferred venue size?
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="border-blue-900 bg-blue-950/50">
                            <SelectValue placeholder="Select venue size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {venueTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {step === 2 && eventType === 'sports' && (
              <FormField
                control={form.control}
                name="sport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base sm:text-lg text-white">
                      What&apos;s your favorite sport?
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border-blue-900 bg-blue-950/50">
                          <SelectValue placeholder="Select a sport" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sports.map((sport) => (
                          <SelectItem key={sport} value={sport.toLowerCase()}>
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {step === 3 && eventType === 'sports' && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="eventCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg text-white">
                        What type of event are you looking for?
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="border-blue-900 bg-blue-950/50">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seatingPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base sm:text-lg text-white">
                        What&apos;s your seating preference?
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="border-blue-900 bg-blue-950/50">
                            <SelectValue placeholder="Select seating preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {seatingTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {((step === 4 && eventType === 'sports') || (step === 5 && eventType === 'concert')) && (
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base sm:text-lg text-white">
                      Select your preferred state
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border-blue-900 bg-blue-950/50">
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase()}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {((step === 5 && eventType === 'sports') || (step === 6 && eventType === 'concert')) && (
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base sm:text-lg text-white">
                      When do you want to go?
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full border-blue-900 bg-blue-950/50 pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="border-blue-500 bg-blue-950/50 text-blue-300 hover:bg-blue-900/50 hover:text-blue-200"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={() => {
                  form.handleSubmit(onSubmit)()
                  if (
                    (eventType === 'concert' && step === 6) ||
                    (eventType === 'sports' && step === 5)
                  ) {
                    setIsFormComplete(true)
                  } else {
                    setStep((s) => s + 1)
                  }
                }}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {(eventType === 'concert' && step === 6) || (eventType === 'sports' && step === 5)
                  ? 'Submit'
                  : 'Next'}
              </Button>
            </div>
          </form>
        </Form>
        {isFormComplete && (
          <Button
            onClick={() =>  SearchEvents(form.getValues())}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Search Events
          </Button>
        )}
      </div>
    </div>
  )
}