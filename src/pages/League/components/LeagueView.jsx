import { useState, useEffect, useRef } from "preact/hooks";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";

import LeagueInfo from './sections/LeagueInfo'
import Stats from './sections/Stats'
import TablesAndFixtures from './sections/TablesAndFixtures'
import Teams from './sections/Teams'
import History from './sections/History'

import league from '../../../../LEAGUE_LIB.json'
import games from '../../../../LEAGUE_GAMES.json'
import { round } from "../signals";
import Brackets from "./sections/Brackets";
import Loading from "../../../components/Loading";





const LeagueView = ({ leagueId }) => {


    const { data: league, error: leagueError } = useSWR(
        leagueId ? `https://corsproxy.io/?https://api.promiedos.com.ar/league/tables_and_fixtures/${leagueId}` : null,
        fetcher, {
        revalidateOnFocus: false,
        refreshInterval:30000,
    }
    );

    


    const { data: games, isLoading: gamesLoading, error: gamesError } = useSWR(
        // @ts-ignore
        leagueId && round.value?.key ? `https://corsproxy.io/?https://api.promiedos.com.ar/league/games/${leagueId}/${round.value.key}` : null,
        fetcher, {
        revalidateOnMount: true,
        revalidateOnFocus: false,
        refreshInterval:30000,
    }
    );


    if (leagueError || gamesError) return <p>Error al cargar datos</p>;

    if (!league) return (
        <div class={"w-full md:col-start-2 mt-5 "}>
            <Loading />
        </div>
    )




    useEffect(() => {
        if (league) {
            if (("games" in league)) {
                // @ts-ignore
                let x = league.games.filters.find(round => round.selected)

                if (x != undefined) {
                    round.value = x
                } else {
                    x = league.games?.filters.find(round => round.key === "latest")
                    round.value = x
                }
            }

        }
    }, [league])


    const sections = [
        {
            "id": "section-4",
            "name": "Llaves",
            "component": (name, league, games) => (<Brackets league={league} />)
        },

        {
            "id": "section-0",
            "name": "Tablas y fixture",
            "component": (name, league, games) => (<TablesAndFixtures name={name} league={league} games={games} gamesLoading={gamesLoading} />)
        },
        {
            "id": "section-1",
            "name": "Estadísticas",
            "component": (name, league, games) => (<Stats league={league} />)
        },
        {
            "id": "section-3",
            "name": "Campeones",
            "component": (name, league, games) => (<History name={name} league={league} games={games} />)
        },
    ]


    return (
        <div class="bg-background shadow-black shadow-lg border-x-[1px] border-borderc relative col-start-2  overflow-x-auto   text-white  font-sans  pb-20 md:mx-12">


            {/* <div class="fixed bottom-0 left-0 w-full bg-black/85 backdrop-blur-sm border-b border-[#333] z-50">
                <div class="overflow-x-auto items-center flex flex-row md:justify-center gap-4 md:gap-8 py-2">

                    {sections.map((section) => (
                        <button
                            key={section.id}
                            // onClick={() => { scrollToSection(section.id) 
                            //     console.log(active,section.id)
                            // }}
                            class={`py-2 px-2 whitespace-nowrap cursor-pointer text-sm md:text-base font-medium transition pb-1 text-[#C2E213] border-b-2 border-[#C2E213]`}
                        >
                            {section.name}
                        </button>
                    ))}
                </div>
            </div> */}


            <LeagueInfo league={league} />

            <div class={"flex flex-col gap-3 md:px-6 px-1"}>
                {
                    sections.map((section, i) => (

                        <section
                            // @ts-ignore
                            // ref={(el) => (sectionRefs.current[`section-${i}`] = el)}
                            class={"  "}
                            id={`section-${i}`}
                            key={i}
                        >
                            {section.component(section.name, league, games)}
                        </section>
                    ))

                }
            </div>

        </div>
    );
};

export default LeagueView;
