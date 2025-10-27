// @ts-nocheck
import { h } from 'preact';
import { Link } from 'preact-router/match';
import { useState } from 'preact/hooks';

const GameCard = ({ i, id, winner,description, home, away, isCompleted, tvURL, startTime, homeScore, awayScore, status, statusDisplayText, homeScorers, awayScorers, roundName }) => {

    const [statusColor, setStatusColor] = useState("bg-green-800")
    const [statusDisplay, setStatusDisplay] = useState("-")
    const [darkMode, setDarkMode] = useState(false)

    /** enum
     *-1  Prog
     * 1    1er T
     * 2    ET, 2do T
     * 3    Fin
     */

    if (status.enum === 1) {
        setStatusDisplay(startTime)
        setStatusColor("bg-[#015A1C]")
    }
    else if (status.enum === 2) {
        setStatusDisplay(statusDisplayText)
        setStatusColor("bg-red-800")
    }
    else if (status.enum === 3) {
        setStatusDisplay(status.symbol_name)
        setStatusColor("bg-gray-950")
    }






    return (

        <div className={` flex flex-col gap-[1px] ${darkMode ? "bg-gray-600" : "bg-gray-400"} w-full overflow-hidden  `}>

            {/* INFO PARTIDO */}
            <div className={`grid grid-cols-26 gap-[1px] ${darkMode ? "bg-gray-600" : "bg-gray-400"} text-whitetext-sm`}>

                {/* RONDA O DESCRIPTION*/}
                {
                    description != undefined &&
                    <div className='col-span-26 text-center py-[2px] text-xs bg-gray-800'>
                        {description}
                    </div>
                }
                {
                    roundName != undefined && i === 0 &&
                    <div className='col-span-26 text-center py-[2px] text-xs bg-gray-800'>
                        {roundName}
                    </div>
                }

                {/* ESTADO */}
                <div title={startTime} className={`col-span-3 ${statusColor}  flex flex-col items-center justify-center p-0 text-white font-bold`}>

                    {
                        tvURL != undefined && !isCompleted &&
                        <img src={`https://api.promiedos.com.ar/images/tvnetworks/${tvURL.id}`} class={"mx-auto mb-[2px] h-4"} title={tvURL.name} />
                    }
                    <span title={status.name} className="text-xs text-shadow-xs text-center text-shadow-black">{statusDisplay.replace("Fin","Final")}</span>

                </div>

                {/* LOCAL*/}
                <div className={`col-span-8 flex flex-col  ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} items-center justify-center p-1`}>
                    <img src={`https://api.promiedos.com.ar/images/team/${home.id}/1`} alt="Escudo Equipo" className="h-5 w-5 mr-2 object-contain" />

                    <div className='flex flex-row items-center  text-center  text-xs font-semibold'>
                        <Link href={`/team/${home.id}`} class={"mr-[1px] hover:underline"}>{home.short_name}</Link>
                        {

                            Array.from({ length: home.red_cards }).map((_, i) => (
                                <div class={"w-[5px] h-[9px] m-[1px] bg-red-500"}></div>
                            ))
                        }
                    </div>
                </div>

                {/* GOLES */}
                <span  className={` ${darkMode ? "bg-gray-900 text-white " : "bg-white text-black"} col-span-2 flex items-center justify-center text-lg font-semibold p-2 space-x-1 ${winner === 1 &&"border-b-1 border-b-black"}`}>{homeScore}</span>

                <span  className={` ${darkMode ? "bg-gray-900 text-white " : "bg-white text-black"} col-span-2 flex items-center justify-center text-lg font-semibold p-2 space-x-1 ${winner === 2 &&"border-b-1 border-b-black"}`}>{awayScore}</span>

                {/* VISITANTE*/}
                <div className={`col-span-8 flex flex-col  ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} items-center justify-center p-1`}>
                    <img src={`https://api.promiedos.com.ar/images/team/${away.id}/1`} alt="Escudo Equipo" className="h-5 w-5 object-contain" />


                    <div className=' flex flex-row items-center  text-center  text-xs font-semibold'>
                        <Link href={`/team/${away.id}`} class={"mr-[1px] hover:underline"}>{away.short_name}</Link>
                        {

                            Array.from({ length: away.red_cards }).map((_, i) => (
                                <div class={"w-[5px] h-[9px] m-[1px] bg-red-500"}></div>
                            ))
                        }
                    </div>
                </div>

                {/* INFO */}
                <Link href={`/game/${id}`} className=" col-span-3 bg-[#008000] hover:bg-[#129c12] cursor-pointer text-white   font-bold flex items-center justify-center">
                    +
                </Link>
            </div>

            {/* GOLEADORES */}
            <div className={`grid grid-cols-26 gap-[1px] ${awayScorers.length > 0 || homeScorers.length > 0 ? "border-b-[1px]" : "border-b-[0px]"}  ${darkMode ? "border-gray-600" : "border-gray-400"}  text-xs font-stretch-50% font-semibold`}>

                {/* Goles Local */}
                <div className={`flex flex-row items-start flex-wrap gap-1 px-1 col-span-13  ${darkMode ? "text-white bg-gray-900 " : "bg-white text-black "} text-[11px] `}>
                    {

                        homeScorers.map((goal, i) => (
                            <>
                                <span className='flex flex-row items-center gap-1'>
                                    <span className='text-red-800 text-xs'>{goal.time_to_display}</span>
                                    <span>{goal.player_sname} {goal.goal_type != undefined && `(${goal.goal_type})`}</span>
                                </span>
                                {i < homeScorers.length - 1 && <span>;</span>}
                            </>
                        ))
                    }
                </div>

                {/* Goles Visitante */}
                <div className={`flex flex-row items-start flex-wrap gap-1 px-1 col-span-13  ${darkMode ? "text-white bg-gray-900 " : "bg-white text-black "} text-[11px] `}>
                    {
                        awayScorers.map((goal, i) => (
                            <>
                                <span className='flex flex-row items-center gap-1'>
                                    <span className='text-red-800 text-xs'>{goal.time_to_display}</span>
                                    <span>{goal.player_sname} {goal.goal_type != undefined && `(${goal.goal_type})`}</span>
                                </span>
                                {i < awayScorers.length - 1 && <span>;</span>}
                            </>
                        ))
                    }
                </div>

            </div>




        </div>
    );
};

export default GameCard;