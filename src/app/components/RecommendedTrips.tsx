import React from "react";
import { prisma } from "@/lib/prisma";
import TripItem from "@/components/TripItem";

async function getTrips() {
    const trips = await prisma.trip.findMany({})

    return trips;
}

const RecommendedTrips = async () => {
    const data = await getTrips()

    return (
        <div className="container mx-auto p-5">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-grayLighter"></div>
                <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Destinos recomendados</h2>
                <div className="w-full h-[1px] bg-grayLighter"></div>
            </div>
            <div className="flex flex-col items-center mt-5 gap-5">
                {data.map((trips) => (
                    <TripItem key={trips.id} trip={trips} />
                ))}
            </div>
        </div>
    )
}

export default RecommendedTrips;
