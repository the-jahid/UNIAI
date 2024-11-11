'use client'

import { useEffect, useState, useRef, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from "@/components/ui/button";
import { ModalBody, ModalContent, ModalFooter, ModalTrigger, Modal } from '@/components/ui/animated-modal';
import AISearchModal from '@/components/AISearchModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input';
import { Car, DollarSign, Train, Zap } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import CoverFLow from '@/components/Home/coverFlow';

interface Event {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
    };
  };
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  _embedded: {
    venues: Array<{
      name: string;
      city: {
        name: string;
      };
      country: {
        name: string;
      };
      location: {
        latitude: string;
        longitude: string;
      };
    }>;
  };
}

export default function MapDemo() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocale, setSelectedLocale] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isFromVirginia, setIsFromVirginia] = useState<boolean | null>(null);
  const [virginiaEvents, setVirginiaEvents] = useState<Event[]>([]);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const costCalculatorRef = useRef<HTMLDivElement>(null);

  const [animateSavings, setAnimateSavings] = useState(false)
  const [calculatedCosts, setCalculatedCosts] = useState<{ uniTripCost: number | null, uberCost: number | null, savings: number | null } | null>(null)

  const calculateUniTripCost = (distance: number) => {
    return 0.75 * distance + 0.25
  }

  const calculateUberCost = (distance: number) => {
    return 1.25 * distance + 1
  }

  const handleCalculateCosts = useCallback(() => {
    if (distance !== null) {
      const uniTripCost = calculateUniTripCost(distance)
      const uberCost = calculateUberCost(distance)
      const savings = uberCost - uniTripCost
      setCalculatedCosts({ uniTripCost, uberCost, savings })
      setAnimateSavings(true)
      setTimeout(() => setAnimateSavings(false), 1000)
    }
  }, [distance])

  useEffect(() => {
    if (calculatedCosts?.savings !== null) {
      setAnimateSavings(true)
      const timer = setTimeout(() => setAnimateSavings(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [calculatedCosts])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url = 'https://app.ticketmaster.com/discovery/v2/events?apikey=jeDSqSiRUMcWRAiZARvvODGYfAh8uHPG&size=200';
        if (isFromVirginia) {
          url += '&stateCode=VA';
        }
        const response = await fetch(url);
        const data = await response.json();
        const fetchedEvents = data._embedded.events;
        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
        if (isFromVirginia) {
          setVirginiaEvents(fetchedEvents.slice(3, 20));
        }
      } catch (err) {
        setError('Failed to fetch events. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (isFromVirginia !== null) {
      fetchEvents();
    }
  }, [isFromVirginia]);

  const setEventsdrilling = useCallback((newEvents: Event[]) => {
    setEvents(newEvents);
    setFilteredEvents(newEvents);
  }, []);

  useEffect(() => {
    if (!mapRef.current || filteredEvents.length === 0) return;

    const loader = new Loader({
      apiKey: 'AIzaSyDmbN2ilMByGmeavAI0FSxyCgyK6Ei_wjc',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: 20, lng: 0 },
        zoom: 2,
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
      });

      mapInstanceRef.current = map;

      const bounds = new google.maps.LatLngBounds();

      filteredEvents.forEach((event) => {
        const venue = event._embedded.venues[0];
        const position = {
          lat: parseFloat(venue.location.latitude),
          lng: parseFloat(venue.location.longitude),
        };

        bounds.extend(position);

        const markerImage = {
          url: event.images[0].url,
          scaledSize: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(25, 25),
          shape: {
            coords: [25, 25, 25],
            type: 'circle'
          },
          optimized: false
        };

        const marker = new google.maps.Marker({
          position,
          map,
          icon: markerImage,
          title: event.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="color: #FF; background-color: #1a1a1a; padding: 15px; max-width: 300px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
              <h3 style="font-weight: bold; margin-bottom: 10px; font-size: 1.2em;">${event.name}</h3>
              <div style="display: flex; justify-content: center; margin-bottom: 10px;">
                ${event.images.slice(0, 1).map(img => `
                  <img src="${img.url}" alt="${event.name}" style="width: 100%; height: auto; border-radius: 10px; object-fit: cover;">
                `).join('')}
              </div>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${event.dates.start.localDate}</p>
              <p style="margin: 5px 0;"><strong>Venue:</strong> ${venue.name}</p>
              <p style="margin: 5px 0;"><strong>City:</strong> ${venue.city.name}</p>
              <p style="margin: 5px 0;"><strong>Country:</strong> ${venue.country.name}</p>
              <button id="start-journey-${event.id}" style="background-color: #007BFF; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px; width: 100%; font-size: 1em;">Start Journey</button>
            </div>
          `,
        });
        marker.addListener('click', () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setZoom(10);
          }
          mapInstanceRef.current!.setCenter(position);
          infoWindow.open(map, marker);
      
          google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
            document.getElementById(`start-journey-${event.id}`)?.addEventListener('click', () => {
              if (userLocation) {
                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(map);
      
                const request = {
                  origin: userLocation,
                  destination: position,
                  travelMode: google.maps.TravelMode.DRIVING
                };
      
                directionsService.route(request, (result, status) => {
                  if (status === 'OK') {
                    directionsRenderer.setDirections(result);
                    if (result?.routes[0]?.legs[0]?.distance?.value) {
                      setDistance(result.routes[0].legs[0].distance.value / 1000); // Convert meters to kilometers
                    }
                    if (result?.routes[0]?.legs[0]?.duration?.value) {
                      setDuration(Math.round(result.routes[0].legs[0].duration.value / 60));
                    }
                    handleCalculateCosts();
                    costCalculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }
                });
              } else {
                alert('Please set your location first by clicking on the map.');
              }
            });
          });
        });
      });

      map.fitBounds(bounds);

      const input = searchInputRef.current!;
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          alert('No details available for input: ' + place.name);
          return;
        }

        setUserLocation(place.geometry.location.toJSON());
        map.setCenter(place.geometry.location);
        map.setZoom(10);

        new google.maps.Marker({
          position: place.geometry.location,
          map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#0000FF',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8
          }
        });
      });

      map.addListener('click', async (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          setUserLocation(e.latLng.toJSON());

          new google.maps.Marker({
            position: e.latLng,
            map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: '#0000FF',
              fillOpacity: 1,
              strokeWeight: 0,
              scale: 8
            }
          });
        }
      });
    });
  }, [filteredEvents, userLocation, handleCalculateCosts]);

  const handleLocaleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocale(e.target.value);
    filterEvents(e.target.value, searchTerm);
  }, [searchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterEvents(selectedLocale, e.target.value);
  }, [selectedLocale]);

  const filterEvents = useCallback((locale: string, search: string) => {
    let filtered = events;
    if (locale) {
      filtered = filtered.filter(event => 
        event._embedded.venues[0].country.name.toLowerCase() === locale.toLowerCase()
      );
    }
    if (search) {
      filtered = filtered.filter(event => 
        event.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  }, [events]);

  const inputVariants = {
    blur: { scale: 1, opacity: 1 },
    focus: { scale: 1.05, opacity: 1 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="min-h--[90vh] mt-20 bg-black w-full p-4 text-blue-500">
      {isFromVirginia === null && (
        <div className="mb-4 text-center">
          <p className="text-lg mb-2">Are you from Virginia?</p>
          <div className="space-x-4">
            <Button onClick={() => setIsFromVirginia(true)}>Yes</Button>
            <Button onClick={() => setIsFromVirginia(false)}>No</Button>
          </div>
        </div>
      )}
      <div className="mx-auto mt-4">
        
      
        {isFromVirginia && <CoverFLow vevents={virginiaEvents} /> }
        <div className='flex flex-col sm:flex-row justify-between items-center mb-4 w-full'>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search for a place"
            className="p-2 border border-blue-300 rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
          />
          <Modal>
            <ModalTrigger className="bg-blue-500 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
              <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                Search with AI
              </span>
              <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                ✈️
              </div>
            </ModalTrigger>
            <ModalBody>
              <ModalContent>
                <AISearchModal setEventsdrilling={setEventsdrilling} />
              </ModalContent>
            </ModalBody>
          </Modal>
        </div>
        <div ref={mapRef} className="h-[calc(100vh-200px)] w-full rounded-lg overflow-hidden mb-4" />

        <div ref={costCalculatorRef}>
          <Card className="w-full bg-gray-800/50 border-blue-400/30 shadow-xl backdrop-blur-sm">
            <CardHeader className="relative overflow-hidden pb-10">
              <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
              <CardTitle className="text-5xl font-bold text-center text-blue-100 relative z-10 mt-6">
                Ride Cost Comparison
              </CardTitle>
              <p className="text-blue-200 text-center mt-2 relative z-10">Compare UNI TRIP vs Uber and see your savings</p>
            </CardHeader>
            <CardContent className="relative px-8 pb-8">
              <div className="grid gap-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="distance" className="text-blue-200 mb-2 block text-sm uppercase tracking-wide">Distance (mi)</Label>
                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur" animate="blur">
                      <Input
                        id="distance"
                        type="number"
                        value={distance ?? ''}
                        onChange={(e) => setDistance(parseFloat(e.target.value))}
                        className="bg-gray-700/50 border-blue-400/30 text-white text-lg rounded-lg focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        placeholder="Enter distance"
                      />
                    </motion.div>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleCalculateCosts} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      Calculate Costs
                    </Button>
                  </div>
                </div>

                {distance !== null && (
                  <div className="text-center text-blue-200">
                    <p>Total Distance: {distance.toFixed(2)} mi</p>
                    {duration !== null && <p>Total Duration: {duration} minutes</p>}
                  </div>
                )}

                <AnimatePresence>
                  {calculatedCosts && (
                    <motion.div
                      key="results"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={cardVariants}
                    >
                      <div className="grid sm:grid-cols-2 gap-6 mt-8">
                        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-none overflow-hidden">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-semibold text-white flex items-center justify-center">
                              <Train className="mr-2" /> UNI TRIP
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <motion.p 
                              className="text-4xl font-bold text-center text-blue-100"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
                            >
                              ${calculatedCosts.uniTripCost?.toFixed(2)}
                            </motion.p>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-none overflow-hidden">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-semibold text-white flex items-center justify-center">
                              <Car className="mr-2" /> Uber
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <motion.p 
                              className="text-4xl font-bold text-center text-purple-100"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.4 }}
                            >
                              ${calculatedCosts.uberCost?.toFixed(2)}
                            </motion.p>
                          </CardContent>
                        </Card>
                      </div>

                      <motion.div
                        className="mt-12 text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <h2 className="text-3xl font-bold mb-4 text-blue-200">Your Savings</h2>
                        <div className="flex items-center justify-center">
                          <DollarSign className="text-green-400 mr-1" size={48} />
                          <motion.span 
                            className="text-6xl font-bold text-green-400"
                            animate={{ scale: animateSavings ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.5 }}
                          >
                            {calculatedCosts.savings?.toFixed(2)}
                          </motion.span>
                        </div>
                        <p className="mt-4 text-xl text-blue-200">by choosing UNI TRIP!</p>
                      </motion.div>

                      <motion.div
                        className="mt-10 flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                      >
                        <Zap className="text-yellow-400 animate-pulse" size={48} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {loading && <p className="text-blue-600">Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}