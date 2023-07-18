import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

interface TripLocationProps {
    location: string;
    locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
    return (
        <div className="p-5">
            <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>
            <div className="relative h-[280px] w-full">
                <Image className="rounded-lg shadow-md" src="/map-mobile.png" alt={location} fill style={{
                    objectFit: "cover"
                }} />
            </div>

            <p className="text-primaryDarker text-sm font-semibold mt-3">{location}</p>
            <p className="text-xs text-primaryDarker mt-2 leading-5">{locationDescription}</p>
            <Button variant="outlined" className="w-full mt-5">Ver no Google Maps</Button>
        </div>
    )
}

export default TripLocation;