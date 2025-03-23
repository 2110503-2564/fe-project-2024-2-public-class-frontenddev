'use client'
import { useReducer } from "react";
import Card from "@/components/Card";
import Link from "next/link";

export default function CardPanel() {
    const defaultVenue = new Map([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]);

    const cardReducer = (
        venueList: Map<string, number>,
        action: { type: string; venueName: string; rating?: number }
    ) => {
        switch(action.type) {
            case 'add': {
                const newVenueList = new Map(venueList);
                newVenueList.set(action.venueName, action.rating ?? 0);
                return newVenueList;
            }
            case 'remove': {
                const newVenueList = new Map(venueList);
                newVenueList.delete(action.venueName);
                return newVenueList;
            }
            default:
                return venueList;
        }
    };

    const [venueList, dispatch] = useReducer(cardReducer, defaultVenue);

    const mockVenueRepo = [
        {vid:"001", name:"The Bloom Pavilion", image:"/img/bloom.jpg"},
        {vid:"002", name:"Spark Space", image:"/img/sparkspace.jpg"},
        {vid:"003", name:"The Grand Table", image:"/img/grandtable.jpg"},
    ]

    return (
        <div>
            <div
                className="flex flex-wrap justify-around gap-4 m-5"
            >
                {
                    mockVenueRepo.map((venueItem)=>(
                        <Link href={`/venue/${venueItem.vid}`} className="w-1/5">
                        <Card 
                        venueName={venueItem.name}
                        imgSrc={venueItem.image}
                        rating={venueList.get(`${venueItem.name}`) || 0}
                        onRatingChange={(venue: string, rating: number) => dispatch({type: 'add', venueName: venue, rating})}
                        />
                        </Link>
                    ))
                }
            </div>
            
            <div className="w-full text-xl font-medium mb-4">
                Venue List with Rating: {venueList.size}
            </div>
            <div className="p-4">
                {Array.from(venueList).map(([venueName, rating]) => (
                    <div 
                        key={venueName}
                        data-testid={venueName}
                        onClick={() => dispatch({type: 'remove', venueName: venueName})}
                        className="cursor-pointer"
                    >
                        {venueName}: {rating}
                    </div>
                ))}
            </div>
        </div>
    );
}
