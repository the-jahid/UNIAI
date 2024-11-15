import { ChatOpenAI } from "@langchain/openai";

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
    sales: {
        public: {
            startDateTime: string;
            startTBD: boolean;
            startTBA: boolean;
            endDateTime: string;
        };
    };
}

export const AIEventSearch = async (textObject: any) => {
    const { artists, atmosphere, companion, date,  purpose, state } = textObject;

 
   

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=jeDSqSiRUMcWRAiZARvvODGYfAh8uHPG&stateCode=${state}&size=100`);
    const data = await response.json();

    if (data._embedded && data._embedded.events) {
        const events = data._embedded.events;

        // Filter events by the specified end date
        const filteredEvents = events.filter((event: Event) => {
            const eventEndDate = new Date(event.sales.public.endDateTime);
            const endDateObj = new Date(date);
            return eventEndDate <= endDateObj;
        });
       
        return filteredEvents;
    } else {
        return [];
    }
};