'use client'

import { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';
import Modal from '@/components/AISearchModal';

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
  const [distance, setDistance] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://app.ticketmaster.com/discovery/v2/events?apikey=jeDSqSiRUMcWRAiZARvvODGYfAh8uHPG&size=200');
        const data = await response.json();
        setEvents(data._embedded.events);
        setFilteredEvents(data._embedded.events);
      } catch (err) {
        setError('Failed to fetch events. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
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
        center: { lat: 20, lng: 0 }, // Center of the world
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

        const marker = new google.maps.Marker({
          position,
          map,
          title: event.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="color: #FFFFFF; background-color: #1a1a1a; padding: 15px; max-width: 300px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
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
                    if (result?.routes[0]?.legs[0]?.distance?.text) {
                      setDistance(result.routes[0].legs[0].distance.text);
                    }
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
  }, [filteredEvents, userLocation]);

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocale(e.target.value);
    filterEvents(e.target.value, searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterEvents(selectedLocale, e.target.value);
  };

  const filterEvents = (locale: string, search: string) => {
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
  };

  return (
    <div className="min-h--[90vh] mt-20 bg-black w-full p-4 text-blue-500">
      <div className="mx-auto mt-4">
      <div className='flex flex-col sm:flex-row justify-between items-center mb-4 w-full'>
  <input
    ref={searchInputRef}
    type="text"
    placeholder="Search for a place"
    className="p-2 border border-blue-300 rounded mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
  />
  <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto" onClick={openModal}>
    Search Using AI
  </Button>
</div>
     
        <div>
          {userLocation && (
          <p className="mt-2 text-blue-600">
            Your selected location: Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}
          </p>
        )}
        {distance && (
          <p className="mt-2 text-blue-600">
            Distance to event: {distance}
          </p>
        )}
        </div>
        <div ref={mapRef} className="h-[calc(100vh-200px)] w-full rounded-lg overflow-hidden mb-4" />
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        
        {loading && <p className="text-blue-600">Loading events...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}