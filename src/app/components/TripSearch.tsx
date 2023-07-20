"use client"

import React from "react";
import Input from "@/components/Input";
import DatePicker from "@/components/DatePicker";
import CurrencyInput from "@/components/CurrencyInput";
import Button from "@/components/Button";

const TripSearch = () => {
    return (
        <div className="container mx-auto p-5 bg-search-background bg-center bg-no-repeat bg-cover">
            <h1 className="font-semibold text-2xl text-center">Econtre sua próxima <span className="text-primary" > Viagem!</span></h1>

            <div className="flex flex-col gap-4 mt-5">
                <Input placeholder="Aonde você quer ir?" />

                <div className="flex gap-4">
                    <DatePicker placeholderText="Data de ida" onChange={() => {}}className="w-full"/>
                    <CurrencyInput placeholder="Orçamento"/>
                </div>

                <Button>
                    Buscar
                </Button>
            </div>
        </div>
    )
}

export default TripSearch;