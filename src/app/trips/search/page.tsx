'use client'

import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Trips = () => {
    const [trips, setTrips] = React.useState<Trip[]>([])
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTrips = async () => {
          const response = await fetch(
            `/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}` // budget não possui '??' pois ele tem q passar como undefined, nao como boleano caso eu passe '??'.
          );

          const data = await response.json();
          setTrips(data);

        };

        fetchTrips();
      }, []);


    return (
        <div className="container mx-auto items-center flex flex-col p-5">
        <h1 className="text-primaryDarker font-semibold text-xl">Hospedagens encontradas</h1>
        <h2 className="text-grayPrimary font-medium mb-5">{trips.length > 0 ? 'Listamos as melhores viagens para você': 'Não encontramos nada!'}</h2>
        <div className="flex flex-col gap-4">
        {trips?.map(trip => <TripItem key={trip.id} trip={trip} />)}
        </div>
    </div>
    )

};

export default Trips;