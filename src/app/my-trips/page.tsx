'use client'

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Prisma, TripReservation } from "@prisma/client";

import UserReservationItem from "./components/UserReservationItem";
import Link from "next/link";
import Button from "@/components/Button";

const MyTrips = () => {
    const [reservations, setReservations] = useState<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >([]);// tipo list([]) TripReservation
    const { status, data } = useSession();
    const router = useRouter();
    console.log(data); // data são as informações do user q esta logado.. dentro dele email, id, iamge, name


    const fetchReservations = async () => {
        const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`);
        const json = await response.json();
        setReservations(json);
    };


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }


        fetchReservations();
    }, [status]);
    return (
        <div className="container mx-auto p-5">
            <h1 className="font-semibold text-primaryDarker text-xl">Minhas Viagens</h1>
            {reservations.length > 0 ? reservations?. map((reservation) => (
                <UserReservationItem fetchReservations={fetchReservations} key={reservation.id} reservation={reservation}/>
            )): (
                <div className="flex flex-col">
                    <p className="font-medium text-primaryDarker">Você ainda não tem nenhuma reserva</p>
                    <Link href="/">
                    <Button className="w-full mt-2">Fazer reserva</Button>
                    </Link>
                </div>
            )}
        </div>
    )

};

export default MyTrips;