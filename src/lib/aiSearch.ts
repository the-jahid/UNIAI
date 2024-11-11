// experience
// : 
// "art"
// lookingFor
// : 
// "place"
// purpose
// : 
// "entertainment"
// state
// : 
// "DE"

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
export const AIEventSearch = async (textObject:any) => {  

    const {experience,lookingFor, purpose, state} = textObject
   
     const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=jeDSqSiRUMcWRAiZARvvODGYfAh8uHPG&stateCode=${state}&size=${100}`);
    const data = await response.json();

    if (data._embedded && data._embedded.events) {
        return data._embedded.events;
      } else {
        return [];
      }
}

