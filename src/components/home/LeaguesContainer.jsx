// @ts-nocheck
import React from 'react';
import { useEffect } from "react";
import { useState } from "preact/hooks";
import { Link } from 'preact-router/match';
import { getDailyStats } from '@/utils/helper';
import { sortByDate } from '@/signals/home';

import {
    GameCard,
    LeagueCard,
    DailyStats,
    LeaguesLogos,
    FilterButtons,
    SortedGames,
    LoadingLeagues,
    CalendarEvents

} from '@/components/home';
import { useHome } from '@/hooks/useHome';



const LeaguesContainer = ({ date }) => {

    const { data, isLoading } = useHome(date)

    if (isLoading)
        return <LoadingLeagues />

    const leagues = data.leagues

    return (

        <div class={"flex flex-col gap-8 w-full mt-2 mb-2"}>

            {
                leagues.length === 0 &&
                <div class={"w-full text-center text-3xl font-semibold mt-4"}>Sin partidos</div>
            }


            {
                !sortByDate.value ?
                    leagues
                        .map((league, i) => (<LeagueCard key={league.id} league={league} />))
                    :
                    <SortedGames leagues={leagues} />
            }

            <CalendarEvents date={date} />

        </div>

    )

}

export default LeaguesContainer

