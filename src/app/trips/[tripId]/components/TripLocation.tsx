import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

interface TripLocationProps {
    location: string;
    locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
    return (
        <div className="p-5 lg:mt-12 lg:p-0 lg:pb-20">
            <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">Localização</h2>
            <div className="relative h-[280px] w-full lg:hidden">
                <Image className="rounded-lg shadow-md" src="/map-mobile.png" alt={location} fill style={{
                    objectFit: "cover"
                }} />
            </div>
            <div className="relative h-[480px] w-full hidden lg:block">
                <Image className="rounded-lg shadow-md" src="/map-desktop.png" alt={location} fill style={{
                    objectFit: "cover"
                }} />
            </div>

            <p className="text-primaryDarker text-sm font-semibold mt-3 lg:text-base lg:mt-5">{location}</p>
            <p className="text-xs text-primaryDarker mt-2 leading-5 lg:text-sm lg:mt-4">{locationDescription}</p>
            <Button variant="outlined" className="w-full mt-5">Ver no Google Maps</Button>
        </div>
    )
}

export default TripLocation;