"use client";

import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import React from "react";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";

interface TripReservationProps {
    tripId: string;
    tripStartDate: Date;
    tripEndDate: Date;
    maxGuests: number;
    pricePerDay: number;
}

interface TripReservationForm {
    guests: number;
    startDate: Date | null;
    endDate: Date | null;
}

const TripReservation = ({ tripId, maxGuests, tripStartDate, tripEndDate, pricePerDay }: TripReservationProps) => {
    const { register,
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm<TripReservationForm>() // npm install react-hook-form para formulario

    const onSubmit = async (data: TripReservationForm) => {
        const response = await fetch("/api/trips/check", {
          method: "POST",
          body: Buffer.from(
            JSON.stringify({
              startDate: data.startDate,
              endDate: data.endDate,
              tripId,
            })
          ),
        });

        const res = await response.json();

        console.log({ res });
        
    }

    const startDate = watch("startDate")
    const endDate = watch("endDate") // caso a data inicial foi selecionada ele salva a data minima relativa ao q foi selecionada 

    return (
        <div className="flex flex-col px-5">
            <div className="flex gap-4">
                <Controller
                    name="startDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Data inicial é obrigatória",
                        },
                    }}
                    control={control}
                    render={({ field }) =>
                        <DatePicker
                            error={!!errors?.startDate}
                            errorMessage={errors?.startDate?.message}
                            selected={field.value}
                            placeholderText="Data Inicial"
                            minDate={tripStartDate}
                            onChange={field.onChange}
                            className="w-full" />}
                />
                <Controller
                    name="endDate"
                    rules={{
                        required: {
                            value: true,
                            message: "Data final é obrigatória",
                        },
                    }}
                    control={control}
                    render={({ field }) =>
                        <DatePicker
                            error={!!errors?.endDate}
                            errorMessage={errors?.endDate?.message}
                            selected={field.value}
                            placeholderText="Data final"
                            maxDate={tripEndDate}
                            minDate={startDate ?? tripStartDate}
                            onChange={field.onChange}
                            className="w-full" />}
                />
            </div>

            <Input {...register("guests", {
                required: {
                    value: true,
                    message: "Número de hóspedes é obrigatório",
                }, // esse campo sera obrigatorio no input

            })} placeholder={`Número de hóspedes (máx: ${maxGuests})`}
                className="mt-4"
                error={!!errors.guests}
                errorMessage={errors?.guests?.message} />

            <div className="flex justify-between mt-3">
                <p className="font-medium text-sm text-primaryDarker"> Total:</p>
                <p className="font-medium text-sm text-primaryDarker">
                {startDate && endDate ? `R$${differenceInDays(endDate, startDate) * pricePerDay}` ?? 1 : "R$0"}
                </p>
            </div>
            <div className="w-full pb-10 border-b border-grayLighter">
                <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full">Reservar agora</Button>
            </div>

        </div>
    );
};

export default TripReservation;