// @ts-nocheck
import { useState } from "preact/hooks";
import { Link } from 'preact-router/match'
import React from 'react'
import GameCard from './GameCard'
import LeagueCard from './LeagueCard'
import { getDailyStats, getSortedArr } from '../../../utils/helper'
import DailyStats from './DailyStats'
import LeaguesLogos from './LeaguesLogos'
import FilterButtons from './FilterButtons'
import { selectedButton } from '../../../signals/signals'
import { useEffect } from "react";

const LeagueList = ({ leagues }) => {

    const [sortByDate, setSortByDate] = useState(false)
    const stats = getDailyStats(leagues)
    const sortedGames = getSortedArr(leagues)
    const gamesArr = leagues.map(x => x.games).flat().map(a => a.status.enum)



    const getCondition = (g) => {
        if (selectedButton.value === -1)
            return true
        else if (selectedButton.value === 0)
            return g.status.enum === 1

        else if (selectedButton.value === 1)
            return (g.status.enum == 2)

        else if (selectedButton.value === 2)
            return g.status.enum === 3
    }

    useEffect(() => {
        setSortByDate(false)
    }, [])



    return (
        <div class={"flex flex-col gap-2 w-full md:py-1 pt-2 px-1  shadow-lg shadow-black bg-background border-[1px] border-borderc "}>

            <DailyStats stats={stats} />
            <FilterButtons gamesArr={gamesArr} />
            <div
                class={`text-xs flex-1 text-center  py-2 rounded  cursor-pointer shadow shadow-gray-900 transition-colors hover:bg-[#2d330e] hover:text-white ${sortByDate ? "bg-[#C2E213] text-black" : "bg-gray-900 text-gray-400"}`}
                onClick={() => setSortByDate(prev => !prev)}
            >Ordenar por hora de inicio</div>
            {/* <LeaguesLogos leagues={leagues} /> */}

            <div class={"flex flex-col gap-8 w-full mt-6 mb-2"}>
                {
                    sortByDate ?


                        <div class={"flex flex-col gap-0 "}>


                            {sortedGames.filter(g => getCondition(g)).map((game, i) => (
                                <div>
                                    {
                                        game.start_time_display &&
                                        <div class={"bg-[#C2E213] text-black text-center font-semibold px-1 text-lg"}>{game.start_time_display.split(" ")[1]}</div>
                                    }
                                    {
                                        game.league_id &&
                                        <Link href={`/league/${game.league_id}`} className="bg-[#002D29] border-b-[1px] pb-[5px] pt-[3px] px-[4px] border-gray-500 flex items-center justify-between w-full">
                                            <img src={`https://api.promiedos.com.ar/images/league/${game.league_id}/1`} alt="Logo" className="h-5" />
                                            <span className="text-white text-[14px] cursor-pointer font-bold uppercase hover:underline text-shadow-xs text-shadow-black ">{game.league_name}</span>
                                            <img src={`https://api.promiedos.com.ar/images/country/${game.country_id}/1`} alt="Logo" className="h-5" />
                                        </Link>
                                    }
    
                                    <GameCard
                                        key={i}
                                        id={game.id}
                                        status={game.status}
                                        startTime={game.start_time.split(" ")[1]}
                                        isCompleted={game.status.symbol_name === "Fin"}
                                        statusDisplayText={game.game_time_status_to_display}
                                        roundName={game.stage_round_name}
                                        description={game.description}
                                        tvURL={"tv_networks" in game ? game.tv_networks[0] : undefined}
                                        homeScore={"scores" in game ? game.scores[0] : ""}
                                        awayScore={"scores" in game ? game.scores[1] : ""}
                                        home={game.teams[0]}
                                        away={game.teams[1]}
                                        homeScorers={"goals" in game.teams[0] ? game.teams[0].goals : []}
                                        awayScorers={"goals" in game.teams[1] ? game.teams[1].goals : []}
                                        winner={game.winner}
                                        showCountryFlags={false}
                                        i={i}


                                    />
                                    
                                </div>
                            ))}
                        </div>
                        :
                        leagues.filter(league => league.games.some(g => getCondition(g))).map((league) => (

                            <LeagueCard
                                games={league.games}
                                leagueName={league.name}
                                leagueCountryURL={`https://api.promiedos.com.ar/images/country/${league.country_id}/1`}
                                leagueURL={`https://api.promiedos.com.ar/images/league/${league.id}/1`}
                                leagueId={league.id}
                                showCountryFlags={league.show_country_flags}
                            />
                        ))

                }

            </div>
        </div>
    )
}

export default LeagueList