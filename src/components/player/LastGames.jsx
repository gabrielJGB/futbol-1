import { usePlayer } from '@/hooks/usePlayer'
import { selectedTab } from '@/signals/player';
import Fade from '@mui/material/Fade';
import { Info } from 'lucide-preact';
import React from 'react'

const LastGames = ({ name }) => {

    if (selectedTab.value != "principal")
        return;

    const { player } = usePlayer(name)

    if (player.lastMatches === undefined)
        return;

    const games = player.lastMatches.games


    return (
        <Fade in timeout={300}>
            <div class={"flex flex-col gap-1"}>
                <h2 class="text-[#C2E213] text-xl font-bold  tracking-wider mb-3 border-b border-[#C2E213]/30 pb-1">
                    Últimos partidos
                </h2>
                <div class={"grid md:grid-cols-2 grid-cols-1 gap-2"}>
                    {
                        games.map((item) => (
                            <Game game={{
                                ...item.game,
                                athleteStats: item.athleteStats,
                                clubId: player.clubId,
                                didNotPlayReason: item.didNotPlayReason,
                                hasStats: item.hasStats
                            }} />
                        ))
                    }
                </div>
            </div>
        </Fade>
    )
}

export default LastGames


const Game = ({ game }) => {

    const { clubId, competitionDisplayName, homeCompetitor, awayCompetitor, shortStatusText, scores, startTime, athleteStats, didNotPlayReason, hasStats } = game



    const tied = game.winner === -1
    const winner = clubId === homeCompetitor.id && game.winner === 1 || clubId === awayCompetitor.id && game.winner === 2

    return (

        <div class={`grid grid-cols-26 gap-[1px]  bg-gray-600 text-white text-sm`}>
            <div class={"col-span-26 flex flex-row justify-center px-1 gap-1 text-center py-[2px] text-xs bg-gray-800"}>
                <div>{competitionDisplayName}</div>
                <div>-</div>
                <div>{new Date(startTime)?.toLocaleDateString()}</div>
            </div>

            <div class={"col-span-3 text-xs text-center flex items-center justify-center bg-black"}>
                {shortStatusText}
            </div>

            <div class={`col-span-8 h-full flex flex-col border-transparent bg-gray-200 text-black items-center justify-center p-1`}>
                <img src={`https://imagecache.365scores.com/image/upload/f_png,w_34,h_34,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v1/Competitors/${homeCompetitor.id}`} style={{ height: 20, width: 20 }} alt="Team" />
                <div class={"text-center line-clamp-1 text-xs font-semibold"}>{homeCompetitor.name}</div>
            </div>

            <div class={` bg-white text-black  border-black col-span-2 flex items-center justify-center text-lg font-semibold p-2 space-x-1 ${homeCompetitor.isWinner && "border-b-[1px]"}`}>{scores[0]}</div>
            <div class={`col-span-2  bg-white text-black  border-black  flex items-center justify-center text-lg font-semibold p-2 space-x-1 ${awayCompetitor.isWinner && "border-b-[1px]"}`}>{scores[1]}</div>

            <div class={`col-span-8 h-full flex flex-col border-transparent bg-gray-200 text-black items-center justify-center p-1`}>
                <img src={`https://imagecache.365scores.com/image/upload/f_png,w_34,h_34,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v1/Competitors/${awayCompetitor.id}`} style={{ height: 20, width: 20 }} alt="Team" />
                <div class={"text-center line-clamp-1 text-xs font-semibold"}>{awayCompetitor.name}</div>
            </div>


            <div
                style={{ backgroundColor: (tied ? "yellow" : (winner ? "#36b300" : "red")) }}
                class={`col-span-3  flex flex-row items-center justify-center`}
            >
                <div
                    style={{ color: (tied ? "black" : "white") }}
                    class={"text-white font-semibold text-center"}>
                    {tied ? "E" : (winner ? "G" : "P")}
                </div>
            </div>

            <div class={"col-span-26 bg-white px-1 py-[2px]"}>
                {
                    game.didNotPlayReason != undefined &&
                    <div class={"flex flex-row items-center gap-1"}>
                        <Info color="black" size={20} />
                        <div class={"text-black text-xs"}>{didNotPlayReason}</div>
                    </div>
                }
                {
                    hasStats &&
                    <div class={"col-span-26 flex flex-col  text-black text-xs "}>

                        {
                            Object.entries(athleteStats[0]).length > 0 &&
                            <div>{athleteStats[0].value} minutos jugados</div>
                        }

                        {
                            Object.entries(athleteStats[1]).length > 0 && athleteStats[1].type === 226 &&
                            <div>{athleteStats[1].value} {parseInt(athleteStats[1].value) === 1 ? "gol" : "goles"} </div>
                        }

                        {
                            Object.entries(athleteStats[2]).length > 0 && athleteStats[2].type === 225 &&
                            <div>{athleteStats[2].value} {parseInt(athleteStats[2].value) === 1 ? "asistencia" : "asistencias"}</div>
                        }

                        {
                            Object.entries(athleteStats[3]).length > 0 &&
                            <div>
                                {
                                    athleteStats[3].type === 1 &&
                                    <div class={"flex flex-row items-center gap-1"}>
                                        <div class={"w-[8px] h-[11px] bg-yellow-400 rounded-xs shadow-xs shadow-gray-800"}></div>
                                        <div>Amonestado</div>
                                    </div>
                                }
                                {
                                    athleteStats[3].type === 2 &&
                                    <div class={"flex flex-row items-center gap-1"}>
                                        <div class={"w-[8px] h-[11px] bg-red-600 rounded-xs shadow-xs shadow-gray-800"}></div>
                                        <div> Expulsado</div>
                                    </div>
                                }
                            </div>
                        }


                        {
                            Object.entries(athleteStats[4]).length > 0 &&

                            <div class={"flex flex-row items-center gap-1"}>
                                <div>Puntuación </div>
                                <div
                                    style={{ backgroundColor: athleteStats[4].bgColor }}
                                    class={"px-2 py-0 text-xs w-min rounded text-white font-semibold"}
                                >
                                    {athleteStats[4].value}
                                </div>
                            </div>
                        }

                    </div>
                }

                {/*
               
                     * Athlete stats [5]

                     * 0: minutos jugados (value)
                     * 1: gol (type (226), value = n°), 
                     * 2: asistencia (type 225, value = n°)
                     * 3: tarjetas (type 1: amarilla, type 2: roja)
                     * 4: Puntuacion value = "6.8" , bgColor = "#FF2201"
                     * 
                */}
            </div>
        </div>
        
    )
}