"use client"

import React from "react";
import Input from "@/components/Input";
import DatePicker from "@/components/DatePicker";
import CurrencyInput from "@/components/CurrencyInput";
import Button from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface TripSearchForm {
    text: string;
    startDate: Date | null;
    budget: number;
}

const TripSearch = () => {
    const router = useRouter();
    const { control, formState: { errors }, register, handleSubmit } = useForm<TripSearchForm>(); // Register: This method allows you to register an input or select element and apply validation rules to React Hook Form

    const onSubmit = (data: TripSearchForm) => {
        router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`)
    };

    return ( // apenas para desktop e acima -> lg:
        <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28">
            <h1 className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">Econtre sua próxima <span className="text-primary" > Viagem!</span></h1>

            <div className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[1300px] lg:mx-auto lg:p-4 lg:mt-12 lg:bg-opacity-20 lg:rounded-lg">
                <Input
                    placeholder="Onde você quer ir?"
                    error={!!errors.text}
                    errorMessage={errors.text?.message}
                    {...register('text', {
                        required: {
                            value: true,
                            message: "Text obrigatório",
                        }
                    })} />

                <div className="flex gap-4 lg:w-full">
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) =>
                            <DatePicker
                            className="w-full"
                                selected={field.value}
                                placeholderText="Data final"
                                minDate={new Date()} // data de hj
                                onChange={field.onChange}
                                 />}
                    />

                    <Controller
                        name="budget"
                        control={control}
                        render={({ field }) =>
                            <CurrencyInput placeholder="Orçamento"
                            className="w-full"
                                allowDecimals={false}
                                onValueChange={(value) => field.onChange(value) as any}
                                value={field.value}
                                onBlur={field.onBlur} />}
                    />
                </div>

                <Button onClick={() => handleSubmit(onSubmit)()} className="w-full lg:h-fit">
                    Buscar
                </Button>
            </div>
        </div>
    )
}

export default TripSearch;