import React from 'react'
import { useGame } from '@/hooks/useGame'
import goal from '@/assets/goal.png'
import ownGoal from '@/assets/own-goal.png'
import { GiSoccerBall } from 'react-icons/gi'
import { ChevronLeft, ChevronRight } from 'lucide-preact'
import { showFlags, showNumbers, showSubPlayers } from '@/signals/game'
import { Link } from 'preact-router'


const FieldPlayer = ({ player, colors, isHome, id }) => {

    if (player === undefined)
        return <></>

    const { player_short_name, jersey_num, events, country_id,name } = player


    //  flex flex-col  items-center justify-center  text-white text-xs font-bold z-10 

    return (
        <div class='flex flex-col items-center justify-center z-20'>

            <Link href={`/player/${name}`} class={"hover:scale-105 active:scale-105 "}>
                <div class={"flex flex-col justify-center items-center"}>
                    <PlayerJersey
                        isStarter={true}
                        jersey_num={jersey_num}
                        events={events}
                        colors={colors}
                        country_id={country_id}
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
                    colors={colors}
                    substituteNumber={player.substitution.player ?? false}
                    id={id}
                    i={isHome ? 0 : 1}
                />

            }

        </div>
    )
}
export default FieldPlayer






const SubstitutePlayer = ({ substituteNumber, colors, i, id }) => {

    if (!substituteNumber)
        return <></>


    const { data } = useGame(id)
    const bench = data.game.players.lineups.teams[i]?.bench
    const player = bench.find(player => player.jersey_num === substituteNumber)
    const { player_short_name, jersey_num, events, country_id,name} = player



    return (



        <Link href={`/player/${name}`} class={"hover:scale-105 transition-all"}>
            <div class='flex flex-row  gap-1'>

                <PlayerJersey
                    isStarter={false}
                    jersey_num={jersey_num}
                    events={events}
                    colors={colors}
                    country_id={country_id}
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
                Array.from({ length: events.goals.goals }).map((_goal, i) => (
                    <img src={goal} width={11} height={11} />
                ))
            }
            {
                Array.from({ length: events.goals.own_goals }).map((_goal, i) => (
                    <img src={ownGoal} width={11} height={11} />
                ))
            }
        </div>
    )
}



const PlayerJersey = ({ jersey_num, colors, isStarter, events, country_id }) => {


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
            <div class='flex flex-col items-center justify-center '>

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
                            
                            ${isStarter ? "size-[36px] rounded-lg text-[18px]" : "text-[11px] size-[19px] rounded-md"} 
                            ${showFlags.value ? "size-[19px] drop-shadow-xs text-shadow-sm bg-no-repeat bg-contain text-shadow-lg" : " border-gray-900 border-[2px] shadow-xs text-shadow-xs "}
                            flex flex-col drop-shadow-black shadow-black items-center justify-center font-bold  text-shadow-black
                        `}
                    >
                        {
                            showNumbers.value ? jersey_num : ""
                        }

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
        return "red"

    else if (events.cards.yellow)
        return "yellow"

    else return "white"
}