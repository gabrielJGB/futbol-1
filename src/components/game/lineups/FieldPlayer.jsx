// @ts-ignore
import React from 'react'
import { useGame } from '@/hooks/useGame'
import goal from '@/assets/goal.png'
import ownGoal from '@/assets/own-goal.png'
// @ts-ignore
import { GiSoccerBall } from 'react-icons/gi'
import { ChevronLeft, ChevronRight } from 'lucide-preact'
import { showFlags, showNumbers, showSubPlayers } from '@/signals/game'
import { Link } from 'preact-router'


const FieldPlayer = ({ player, colors, isHome, gameId, teamId }) => {

    if (player === undefined)
        return <></>

    const { player_short_name, jersey_num, events, country_id, name } = player


    if (teamId === "igg") {
        colors.color = "#1238a3"
        colors.text_color = "#fbff00"
    }


    //  flex flex-col  items-center justify-center  text-white text-xs font-bold z-10 

    return (
        <div class='flex flex-col items-center justify-center z-20'>

            <Link
                // @ts-ignore
                href={`/player/${name}`} class={"hover:scale-105 active:scale-105 "}>
                <div class={"flex flex-col justify-center items-center"}>
                    <PlayerJersey
                        isStarter={true}
                        jersey_num={jersey_num}
                        events={events}
                        colors={colors}
                        country_id={country_id}
                        teamId={teamId}
                    />

                    <PlayerName
                        isStarter={true}
                        playerShortName={player_short_name}
                        events={player.events ?? false}
                        isCaptain={player.is_captain}
                        colors={colors} />
                </div>
            </Link>
            {
                showSubPlayers.value && "substitution" in player &&
                <SubstitutePlayer
                    teamId={teamId}
                    colors={colors}
                    substituteNumber={player.substitution.player ?? false}
                    gameId={gameId}
                    i={isHome ? 0 : 1}
                />

            }

        </div>
    )
}
export default FieldPlayer






const SubstitutePlayer = ({ substituteNumber, colors, i, gameId, teamId }) => {

    if (!substituteNumber)
        return <></>


    const { data } = useGame(gameId)
    const bench = data.game.players.lineups.teams[i]?.bench
    const player = bench.find(player => player.jersey_num === substituteNumber)
    const { player_short_name, jersey_num, events, country_id, name } = player



    return (



        <Link
            // @ts-ignore
            href={`/player/${name}`} class={"hover:scale-105 transition-all"}>
            <div class='flex flex-row  gap-1'>

                <PlayerJersey
                    isStarter={false}
                    jersey_num={jersey_num}
                    events={events}
                    colors={colors}
                    country_id={country_id}
                    teamId={teamId}
                />

                <PlayerName
                    isStarter={false}
                    playerShortName={player_short_name}
                    events={player.events ?? false}
                    isCaptain={false}
                    colors={colors} />


            </div>
        </Link>

    )
}



const Goals = ({ events }) => {

    return (
        <div class='flex flex-row gap-[2px] mb-[2px]'>
            {
                // @ts-ignore
                Array.from({ length: events.goals.goals }).map((_goal, i) => (
                    <img src={goal} width={11} height={11} />
                ))
            }
            {
                // @ts-ignore
                Array.from({ length: events.goals.own_goals }).map((_goal, i) => (
                    <img src={ownGoal} width={11} height={11} />
                ))
            }
        </div>
    )
}



const PlayerJersey = ({ jersey_num, colors, isStarter, events, country_id, teamId }) => {


    return (

        <div class={`flex flex-row items-center`}>

            {
                isStarter && events?.substitution?.has_substitution &&
                <ChevronLeft size={16} color={"red"} class={"min-w-min drop-shadow-xs drop-shadow-black "} />
            }

            {
                !isStarter &&
                <ChevronRight size={16} color={"lime"} class={"min-w-min drop-shadow-xs drop-shadow-black "} />
            }
            <div class=' flex flex-col items-center justify-center '>

                {
                    events != undefined && events.goals.goals > 0 &&
                    <Goals events={events} />
                }


                {

                    <div
                        style={{
                            backgroundImage: showFlags.value ? `url('https://api.promiedos.com.ar/images/country/${country_id}/1')` : "", backgroundColor: showFlags.value ? "" : colors.color ?? "black",
                            color: showFlags.value ? "white" : (colors.text_color ?? "white")
                        }}
                        class={`
                            ${ showFlags.value ? "text-shadow-sm ":(teamId === "igg" ? "text-shadow-md":"text-shadow-xs ")}
                            ${isStarter ? "size-[36px] rounded-lg text-[18px]" : "text-[11px] size-[19px] rounded-md"} 
                            ${showFlags.value ? "size-[19px] drop-shadow-xs bg-no-repeat bg-contain" : " border-gray-900 border-[2px] shadow-xs "}
                            flex flex-col drop-shadow-black shadow-black items-center justify-center font-bold  text-shadow-black
                        `}
                    >
                        {
                            teamId === "igg" && !showFlags.value &&
                            <div class={"absolute"}>
                                <div class={`-z-100 bg-blue-800 rounded-t-[5px] ${isStarter ? "h-[8px] w-[32px]" : "h-[4px] w-[15px]"}`}></div>
                                <div class={`bg-[#eac807] ${isStarter ? "h-[16px] w-[32px]" : "h-[7px] w-[15px]"} `}></div>
                                <div class={`bg-blue-800  rounded-b-[5px] ${isStarter ? "h-[8px] w-[32px]" : "h-[4px] w-[15px]"}`}></div>
                            </div>
                        }
                        <div
                            style={{color:`${teamId === "igg"? "white":"unset"}`}}
                            class={"z-0"}>
                            {
                                showNumbers.value ? jersey_num : ""
                            }
                        </div>
                    </div>

                }
            </div>

            {
                isStarter && events?.substitution?.has_substitution &&
                <div class={"w-[8px]"}></div>
            }

        </div>
    )
}

// @ts-ignore
const PlayerName = ({ playerShortName, events, isCaptain, isStarter, colors }) => {


    return (

        <div
            style={{ color: getPlayerNameColor(events) }}
            class={` text-shadow-sm text-shadow-zinc-800 text-white text-center ${isStarter ? "text-[14px] max-w-[77px]" : "text-[11px] max-w-[70px]"} mx-auto font-bold  self-end`}
        >{playerShortName} {isCaptain ? "(C)" : ""}</div>

    )
}



const getPlayerNameColor = (events) => {

    if (!events)
        return "#ffffff"

    else if (events.cards.red)
        return "#ff2020"

    else if (events.cards.yellow)
        return "yellow"

    else return "white"
}