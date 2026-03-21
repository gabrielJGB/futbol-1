// @ts-nocheck

import { useEffect, useState } from "preact/hooks";
import { useLocation } from 'preact-iso'
import { fetcher } from "@/utils/fetcher";
import { MdStadium } from 'react-icons/md'
import { BiCalendar } from "react-icons/bi";
import { MapPin } from "lucide-preact";
import { Loading } from "@/components/common";
import { usePlayer } from '@/hooks/usePlayer';
import PlayerHeader from '@/components/player/PlayerHeader';
import BottomTabs from '@/components/player/BottomTabs';
import LastGames from "@/components/player/LastGames";
import Trophies from "@/components/player/Trophies";
import Transfers from "@/components/player/Transfers";
import Stats from "@/components/player/Stats";


const Player = ({ name }) => {


    const { player, isLoading, notFound, error } = usePlayer(name);

    if (!name) return <p></p>;
    if (isLoading) return <div class={"md:col-start-2 col-start-1"}>
        <Loading />
    </div>;
    if (error) return <p>Error de conexión con la API.</p>;
    if (notFound) return <p>Jugador "{name}" no encontrado.</p>;

    /**
     * HEADER: name, age, playerDetails[], nationalityName, position{}, contractUntil
     * PALMARÉS: trophies.categories[] // [clubes,internacional]
     * 
     * ULTIMOS PARTIDOS: lastMatches[]
     * 
     * ESTADISTICAS: careerStats.seasons[] // (temporadas disponibles (.key))
     * primer render: careerStats.seasons[0] // (temporada actual)
     * 
     * Stats endpoint (temporada):
     * stats.tables[] // [clubes,internacional] 
     * 
     * CARRERA: transfers[]
     */


    useEffect(() => {
        document.title = name + " - Fútbol 1"
    }, [])





    return (
        <div class={"flex flex-col md:gap-0 gap-3 md:col-start-2 col-start-1  text-white bg-background/70 shadow-black shadow-lg border-x-[1px] border-borderc relative  overflow-x-auto  md:mx-20 mx-0 md:mt-3 pb-20 min-h-screen"}>
            <PlayerHeader name={name} />

            <div class={"order-2 grid grid-cols-1 gap-2 md:mx-3 pt-2  mx-2 pb-40"}>
                <LastGames name={name} />
                <Stats name={name} />
                <Trophies name={name} />
                <Transfers name={name} />

            </div>
            <BottomTabs name={name} />
        </div>
    )
}

export default Player


