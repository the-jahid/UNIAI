'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from 'framer-motion'
import { Car, DollarSign, Train, Clock, MapPin } from 'lucide-react'
import CoverFlow from '@/components/Home/coverFlow'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'
import AISearchModal from '@/components/AISearchModal'

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

interface RideOption {
  name: string
  icon: React.ReactNode
  eta: string
  price: number
  description: string
}

export default function RideRequestWithEvents() {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCostCalculator, setShowCostCalculator] = useState(false)

  const [isfromVirginia, setIsfromVirginia] = useState(false)
  const [virginiaEvents, setVirginiaEvents] = useState<Event[]>([])

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const originInputRef = useRef<HTMLInputElement>(null)
  const destinationInputRef = useRef<HTMLInputElement>(null)
  const costCalculatorRef = useRef<HTMLDivElement>(null)

  const rideOptions: RideOption[] = [
    { name: 'Moto', icon: <Train className="w-6 h-6" />, eta: '6 mins away', price: 229.02, description: 'Faster' },
    { name: 'UberX', icon: <Car className="w-6 h-6" />, eta: '7 mins away', price: 465.21, description: 'Affordable everyday rides' },
    { name: 'Premier', icon: <Car className="w-6 h-6" />, eta: '7 mins away', price: 583.74, description: 'Comfortable sedans, top-quality drivers' },
  ]

  const eventsDrilling = (newEvents: Event[]) => {

   
    setEvents(newEvents)
   
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = 'https://app.ticketmaster.com/discovery/v2/events?apikey=jeDSqSiRUMcWRAiZARvvODGYfAh8uHPG&size=200';
     
        const response = await fetch(url);
        const data = await response.json();
        const fetchedEvents = data._embedded.events;
        setEvents(fetchedEvents);
      
        if (isfromVirginia) {
          url += '&stateCode=VA';
          const response = await fetch(url);
          const data = await response.json();
          const fetchedEvents = data._embedded.events;
          setVirginiaEvents(fetchedEvents.slice(3, 20));
        }
      } catch (err) {
        setError('Failed to fetch events. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    
      fetchEvents();
   
  }, []);

  useEffect(() => {
    const virginiaFetchEvents = async () => {
      try {
        let url = 'https://app.ticketmaster.com/discovery/v2/events?apikey=jeDSqSiRUMcWRAiZARvvODGYfAh8uHPG&size=200';
        url += '&stateCode=VA';
        const response = await fetch(url);
        const data = await response.json();
        const fetchedEvents = data._embedded.events;
        setVirginiaEvents(fetchedEvents.slice(3, 20));
      
       
      } catch (err) {
        setError('Failed to fetch events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
      virginiaFetchEvents();
  }, [isfromVirginia])

  useEffect(() => {
    if (!mapRef.current || events.length === 0) return

    const loader = new Loader({
      apiKey: 'AIzaSyDmbN2ilMByGmeavAI0FSxyCgyK6Ei_wjc',
      version: 'weekly',
      libraries: ['places'],
    })

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: 37.4316, lng: 78.6569 },
        zoom: 4,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      })

      mapInstanceRef.current = map

      const bounds = new google.maps.LatLngBounds()

      events.forEach((event) => {
        const venue = event._embedded.venues[0]
        const position = {
          lat: parseFloat(venue.location.latitude),
          lng: parseFloat(venue.location.longitude),
        }

        bounds.extend(position)

        const markerImage = {
          url: event.images[0].url,
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 20),
        }

        const marker = new google.maps.Marker({
          position,
          map,
          icon: markerImage,
          title: event.name,
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="max-width: 300px; color: #333;">
              <h3 style="font-weight: bold; margin-bottom: 10px;">${event.name}</h3>
              <img src="${event.images[0].url}" alt="${event.name}" style="width: 100%; height: auto; margin-bottom: 10px;">
              <p><strong>Date:</strong> ${event.dates.start.localDate}</p>
              <p><strong>Venue:</strong> ${venue.name}</p>
              <p><strong>City:</strong> ${venue.city.name}</p>
              <button id="start-journey-${event.id}" style="background-color: #3b82f6; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">Start Journey</button>
            </div>
          `,
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
          setSelectedEvent(event)
        })

        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          document.getElementById(`start-journey-${event.id}`)?.addEventListener('click', () => {
            if (userLocation) {
              const directionsService = new google.maps.DirectionsService()
              const directionsRenderer = new google.maps.DirectionsRenderer()
              directionsRenderer.setMap(map)
    
              const request = {
                origin: userLocation,
                destination: position,
                travelMode: google.maps.TravelMode.DRIVING
              }
    
              directionsService.route(request, (result, status) => {
                if (status === 'OK') {
                  directionsRenderer.setDirections(result)
                  if (result?.routes[0]?.legs[0]?.distance?.value) {
                    setDistance(result.routes[0].legs[0].distance.value / 1000)
                  }
                  if (result?.routes[0]?.legs[0]?.duration?.value) {
                    setDuration(Math.round(result.routes[0].legs[0].duration.value / 60))
                  }
               
                  costCalculatorRef.current?.scrollIntoView({ behavior: 'smooth' })
                }
              })
            } else {
              alert('Please set your location first by clicking on the map.')
            }
          })
        })
      })

      map.fitBounds(bounds)

      const setupAutocomplete = (inputRef: React.RefObject<HTMLInputElement>, setLocation: (location: google.maps.LatLngLiteral) => void) => {
        const input = inputRef.current!
        const autocomplete = new google.maps.places.Autocomplete(input)
        autocomplete.bindTo('bounds', map)

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          if (!place.geometry || !place.geometry.location) {
            alert('No details available for input: ' + place.name)
            return
          }

          setLocation(place.geometry.location.toJSON())
          map.setCenter(place.geometry.location)
          map.setZoom(15)

          new google.maps.Marker({
            position: place.geometry.location,
            map,
          })
        })
      }

      setupAutocomplete(originInputRef, setUserLocation)
    })
  }, [events, userLocation])

  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        google.maps.event.trigger(mapInstanceRef.current, 'resize')
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const calculateCost = useCallback(() => {
    if (userLocation && selectedEvent) {
      const directionsService = new google.maps.DirectionsService()
      const directionsRenderer = new google.maps.DirectionsRenderer()
      directionsRenderer.setMap(mapInstanceRef.current!)

      const destination = {
        lat: parseFloat(selectedEvent._embedded.venues[0].location.latitude),
        lng: parseFloat(selectedEvent._embedded.venues[0].location.longitude),
      }

      const request = {
        origin: userLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      }

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result)
          if (result?.routes[0]?.legs[0]?.distance?.value) {
            setDistance(result.routes[0].legs[0].distance.value / 1000)
          }
          if (result?.routes[0]?.legs[0]?.duration?.value) {
            setDuration(Math.round(result.routes[0].legs[0].duration.value / 60))
          }
          setShowCostCalculator(true)
        }
      })
    } else {
      alert('Please set your location and select an event first.')
    }
  }, [userLocation, selectedEvent])

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  const uniCost = duration ? (duration * 0.75).toFixed(2) : null
  const uberCost = distance !== null && duration !== null
    ? ((distance * 0.621371 * 1) + (duration * 0.15) + 1).toFixed(2)
    : null
  const uniDriverEarnings = uniCost
  const uberDriverEarnings = uberCost ? (parseFloat(uberCost) * 0.5).toFixed(2) : null

  return (
    <>
   
    <div className="min-h-screen bg-black text-white p-4 mt-20">
  
      <Card className="w-full max-w-8xl mx-auto bg-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-400">Find Your Vibe, Book a Ride</CardTitle>
          <p className='text-white font-semibold text-center' >Estimate your trip cost</p>
        </CardHeader>
        <CardContent className='  flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 items-stretch'>
          <div className="space-y-4 flex-1">
          <div className="text-center my-4">
  <p className="text-lg font-semibold text-white mb-2">Are you from Virginia?</p>
  <div className="flex justify-center space-x-4">
    <button
      onClick={() => setIsfromVirginia(true)}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
    >
      YES
    </button>
    <button
      onClick={() => setIsfromVirginia(false)}
      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
    >
      NO
    </button>
  </div>
</div>
            <div>
              <Label htmlFor="origin" className="text-sm font-medium text-gray-300">Enter location</Label>
              <Input
                id="origin"
                ref={originInputRef}
                type="text"
                placeholder="Enter your location"
                className="w-full mt-1 bg-gray-700 text-white border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="destination" className="text-sm font-medium text-gray-300">Enter destination</Label>
              <Input
                id="destination"
                ref={destinationInputRef}
                type="text"
                placeholder="Enter your destination"
                className="w-full mt-1 bg-gray-700 text-white border-gray-600"
                value={selectedEvent ? selectedEvent._embedded.venues[0].name : ''}
                readOnly
              />
            </div>
            <Button onClick={calculateCost} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Calculate cost
            </Button>
           <AISearchModal setEventsdrilling={eventsDrilling} />

          </div>

          <AnimatePresence>
            {showCostCalculator && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
                className="flex-1 bg-gray-700 p-4 rounded-lg text-white"
                ref={costCalculatorRef}
              >
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Trip Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                    <span>Total Distance: {distance ? `${(distance * 0.621371).toFixed(2)} miles` : 'Calculating...'}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-5 h-5 mr-2 text-blue-400" />
                    <span>Estimated Duration: {duration ? `${duration} minutes` : 'Calculating...'}</span>
                  </div>
                  <ComparisonItem
                    icon={<DollarSign className="w-5 h-5 text-green-400" />}
                    label="Total Cost"
                    uniValue={uniCost}
                    uberValue={uberCost}
                  />
                  <ComparisonItem
                    icon={<Car className="w-5 h-5 text-purple-400" />}
                    label="Driver Earnings"
                    uniValue={uniDriverEarnings}
                    uberValue={uberDriverEarnings}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={mapRef} className="h-[300px] lg:min-h-[60vh] lg:h-auto w-full rounded-lg my-4 lg:flex-1 order-first lg:order-last" />
        </CardContent>
      </Card>
      {isfromVirginia && <CoverFlow vevents={virginiaEvents} />}
      {loading && <p className="text-center text-gray-400 mt-4">Loading events...</p>}
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
    </div>
    </>
  )
}

interface ComparisonItemProps {
  icon: React.ReactNode
  label: string
  uniValue: string | null
  uberValue: string | null
}

function ComparisonItem({ icon, label, uniValue, uberValue }: ComparisonItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center text-sm font-semibold">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-900 p-3 rounded-lg">
          <p className="text-xs font-medium text-white">Uni</p>
          <p className="text-sm font-bold text-white">
            {uniValue ? `$${uniValue}` : 'Calculating...'}
          </p>
        </div>
        <div className="bg-black p-3 rounded-lg">
          <p className="text-xs font-medium text-white-300">Uber</p>
          <p className="text-sm font-bold text-orange-100">
            {uberValue ? `$${uberValue}` : 'Calculating...'}
          </p>
        </div>
      </div>
    </div>
  )
}