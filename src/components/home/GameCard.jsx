import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { MdAddBox } from 'react-icons/md';
import { darkMode } from '@/signals/common';
import { showOnlyLive } from '@/signals/home';
import { gameMapper } from '@/utils/gameMapper';
import { memo } from 'preact/compat';



// @ts-ignore
const GameCard = ({ index, game, showCountryFlags }) => {

    
    

    const gameMap = gameMapper(game)
    const {
        id,
        startTime,
        isCompleted,
        statusText,
        statusColor,
        roundName,
        description,
        isPlaying,
        TVName,
        TVLogoURL,
        homeScoreDisplay,
        awayScoreDisplay,
        homeScorers,
        awayScorers,
        home,
        away,
        winner,
    } = gameMap

    return (

        <div
            className={`${showOnlyLive.value && !isPlaying ? "hidden" : "flex"}  flex-col gap-[1px] ${darkMode.value ? "bg-gray-600" : "bg-gray-400"} w-full overflow-hidden `}>

            <div className={`grid grid-cols-26 gap-[1px] ${darkMode.value ? "bg-gray-600" : "bg-gray-400"} text-white text-sm`}>

                <RoundDescription
                    isFirstGame={index === 0}
                    description={description}
                    roundName={roundName} />

                <GameStatus
                    startTime={startTime}
                    statusColor={statusColor}
                    statusText={statusText}
                    TVLogoURL={TVLogoURL}
                    TVName={TVName}
                    isCompleted={isCompleted}
                />

                <Team
                    team={home}
                    showCountryFlags={showCountryFlags}
                />

                <Score
                    score={homeScoreDisplay}
                    isWinner={winner === 1} />

                <Score
                    score={awayScoreDisplay}
                    isWinner={winner === 2} />

                <Team
                    team={away}
                    showCountryFlags={showCountryFlags}
                />

                <InfoButton id={id} />

            </div>
            {

                <div className={`grid grid-cols-26 gap-[1px] ${awayScorers.length > 0 || homeScorers.length > 0 ? "border-b-[1px]" : "border-b-[0px]"}  ${darkMode.value ? "border-gray-600" : "border-gray-400"}  text-xs font-stretch-50% font-semibold`}>

                    <Scorers teamScorers={homeScorers} />
                    <Scorers teamScorers={awayScorers} />

                </div>
            }




        </div>
    )
}

export default GameCard;






const RoundDescription = ({ description, roundName, isFirstGame }) => {

    return (
        <>
            {
                description &&
                <div className={`col-span-26 text-center py-[2px] text-xs ${darkMode.value ? "bg-gray-950" : "bg-gray-800"}`}>
                    {description}
                </div>
            }
            {
                isFirstGame && roundName && (
                    <div className={`col-span-26 text-center py-[2px] text-xs ${darkMode.value ? "bg-gray-950" : "bg-gray-800"}`}>
                        {roundName}
                    </div>)
            }

        </>
    )
}
const GameStatus = ({ startTime, statusColor, statusText, TVLogoURL, TVName, isCompleted }) => {
    return (
        <div className={`col-span-3 ${statusColor}  flex flex-col items-center justify-center p-0 text-white font-bold`}>

            {
                TVLogoURL && !isCompleted &&
                <img src={TVLogoURL} class={"mx-auto mb-[2px] h-4"} title={TVName} />
            }
            <span className="text-xs text-center">{statusText}</span>

        </div>
    )
}


const Team = ({ team, showCountryFlags }) => {

    const hover = "hover:" + "bg-[" + team.colors.color + "]"

    return (

        <Link
            // @ts-ignore
            href={`/team/${team.id}`} class={"col-span-8"}
        >
            <div className={`h-full flex flex-col border-transparent hover:bg-gray-300 active:bg-gray-300 ${darkMode.value ? "bg-gray-800 text-white" : "bg-gray-200 text-black"} items-center justify-center p-1`}>


                <div class={"z-0 relative"}>
                    <img loading={"lazy"} style={{ height: 20, width: 20 }} src={`https://api.promiedos.com.ar/images/team/${team.id}/1`} alt="Escudo Equipo" className="drop-shadow-xs drop-shadow-black  object-contain " />
                    {/* drop-shadow-xs drop-shadow-black */}

                    {
                        showCountryFlags &&
                        <img loading={"lazy"} style={{ height: 12, width: 12 }} src={`https://api.promiedos.com.ar/images/country/${team.country_id}/1`} alt="Logo" className="absolute bottom-0 left-4 h-3" />
                    }
                </div>

                <div className='flex flex-row items-center  text-center  text-xs font-semibold'>

                    {team.short_name}

                    {

                        Array.from({ length: team.red_cards }).map((_, i) => (
                            <div class={"w-[5px] h-[9px] m-[1px] bg-red-500"}></div>
                        ))
                    }

                </div>
            </div>
        </Link>
    )
}

const Score = ({ isWinner, score }) => {
    return (
        <span className={` ${darkMode.value ? "bg-gray-900 text-white  border-white" : "bg-white text-black  border-black"} col-span-2 flex items-center justify-center text-lg font-semibold p-2 space-x-1 ${isWinner && "border-b-[1px]"}`}>
            {score ?? ""}
        </span>
    )
}

const InfoButton = ({ id }) => {
    return (
        <Link
            // @ts-ignore
            href={`/game/${id}`} className=" col-span-3  bg-[#008000] hover:bg-[#18ac18] active:bg-[#18ac18] cursor-pointer text-white   font-bold flex items-center justify-center">
            <MdAddBox color="white" size={20} />
        </Link>
    )
}


const Scorers = ({ teamScorers }) => {
    return (
        <div className={`flex flex-row items-start flex-wrap gap-1 px-1  col-span-13  ${darkMode.value ? "text-white bg-gray-900 " : "bg-white text-black "} text-[11px] `}>
            {

                teamScorers.map((goal, i) => (
                    <>
                        <span key={i} className='flex flex-row items-center gap-1'>
                            <span className={`${darkMode.value ? "text-red-500" : "text-red-800"} text-xs`}>{goal.time_to_display}</span>
                            <span>{goal.player_sname} {goal.goal_type != undefined && `(${goal.goal_type})`}</span>
                        </span>
                        {i < teamScorers.length - 1 && <span>;</span>}
                    </>
                ))
            }
        </div>

    )
}