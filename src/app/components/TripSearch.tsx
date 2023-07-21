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

    return (
        <div className="container mx-auto p-5 bg-search-background bg-center bg-no-repeat bg-cover">
            <h1 className="font-semibold text-2xl text-center">Econtre sua próxima <span className="text-primary" > Viagem!</span></h1>

            <div className="flex flex-col gap-4 mt-5">
                <Input
                placeholder="Onde você quer ir?"
                error={!! errors.text}
                errorMessage={errors.text?.message}
                {...register('text', {required: {
                    value: true,
                    message: "Text obrigatório",
                }})} />

                <div className="flex gap-4">
                <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) =>
                        <DatePicker
                            selected={field.value}
                            placeholderText="Data final"
                            minDate={new Date()} // data de hj
                            onChange={field.onChange}
                            className="w-full" />}
                />

<Controller
                    name="budget"
                    control={control}
                    render={({ field }) =>
                    <CurrencyInput placeholder="Orçamento"
                    onValueChange={(value) => field.onChange(value) as any}
                    value={field.value}
                    onBlur={field.onBlur}/>}
                />
                </div>

                <Button onClick={() => handleSubmit(onSubmit)()}>
                    Buscar
                </Button>
            </div>
        </div>
    )
}

export default TripSearch;