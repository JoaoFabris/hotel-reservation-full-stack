"use client";

import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import React from "react";
import { Trip } from "@prisma/client";
import Button from "@/components/Button";

interface TripReservationProps {
    trip: Trip;
}


const TripReservation = ({ trip }: TripReservationProps) => {
    return (
        <div className="flex flex-col px-5">
            <div className="flex gap-4">
                <DatePicker placeholderText="Data de Início" onChange={() => { }} className="w-full" />
                <DatePicker placeholderText="Data Final" onChange={() => { }} className="w-full" />
            </div>

            <Input placeholder={`Número de hóspedes (máx: ${trip.maxGuests})`} className="mt-4" />

            <div className="flex justify-between mt-3">
                <p className="font-medium text-sm text-primaryDarker"> Total:</p>
                <p className="font-medium text-sm text-primaryDarker"> R$2500</p>
            </div>
            <div className="w-full pb-10 border-b border-grayLighter">
                <Button className="mt-3 w-full">Reservar agora</Button>
            </div>

        </div>
    );
};

export default TripReservation;