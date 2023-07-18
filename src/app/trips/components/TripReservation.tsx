"use client";

import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import React from "react";
import { Trip } from "@prisma/client";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
    trip: Trip;
}

interface TripReservationForm {
    guests: number;
    startDate: Date | null;
    endDate: Date | null;
}

const TripReservation = ({ trip }: TripReservationProps) => {
    const { register, handleSubmit, formState: { errors }, control, } = useForm<TripReservationForm>() // npm install react-hook-form para formulario

    const onSubmit = (data: any) => {
        console.log({ data });

    }

    return (
        <div className="flex flex-col px-5">
            <div className="flex gap-4">
                <Controller
                    name="startDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Data inicial obrigatória",
                        },
                    }}
                    control={control}
                    render={({ field }) =>
                        <DatePicker
                            error={!!errors?.startDate}
                            errorMessage={errors?.startDate?.message}
                            selected={field.value}
                            placeholderText="Data Inicial"
                            onChange={field.onChange}
                            className="w-full" />}
                />
                <Controller
                    name="endDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Data final obrigatória",
                        },
                    }}
                    control={control}
                    render={({ field }) =>
                        <DatePicker
                            error={!!errors?.endDate}
                            errorMessage={errors?.endDate?.message}
                            selected={field.value}
                            placeholderText="Data final"
                            onChange={field.onChange}
                            className="w-full" />}
                />
            </div>

            <Input {...register("guests", {
                required: {
                    value: true,
                    message: "Número de hóspedes é obrigatório",
                }, // esse campo sera obrigatorio no input

            })} placeholder={`Número de hóspedes (máx: ${trip.maxGuests})`}
                className="mt-4"
                error={!!errors.guests}
                errorMessage={errors?.guests?.message} />

            <div className="flex justify-between mt-3">
                <p className="font-medium text-sm text-primaryDarker"> Total:</p>
                <p className="font-medium text-sm text-primaryDarker"> R$2500</p>
            </div>
            <div className="w-full pb-10 border-b border-grayLighter">
                <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full">Reservar agora</Button>
            </div>

        </div>
    );
};

export default TripReservation;