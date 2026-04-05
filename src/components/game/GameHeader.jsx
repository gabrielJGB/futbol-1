import React from 'react';
import { Link } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { BiCalendar } from 'react-icons/bi';
import { GiWhistle } from 'react-icons/gi';
import { MdStadium } from 'react-icons/md';
import { Countdown } from '@/components/game/';
import { useGame } from '@/hooks/useGame';

const GameHeader = ({ id }) => {

    const { data } = useGame(id)
    const { game } = data

    const home = game.teams[0]
    const away = game.teams[1]

    const goals = game.teams.map((team, i) => {
        // @ts-ignore
        return team.goals?.filter(g => g.time == g.time_to_display.split('\'')[0]).flatMap(x => ({ ...x, isHome: i === 0 }))
    }).flat().sort((a, b) => (a.time - b.time))



    useEffect(() => {
        document.title = (
            game.status.enum === 2 ?
                game.game_time_status_to_display + ("scores" in game ? ` ${game.scores[0]}-${game.scores[1]} ` : "")
                :
                "") + ` ${home.short_name} vs ${away.short_name}` + " - Fútbol 1"
    }, [game])


    return (

        <div class={"flex flex-col  md:p-1 bg-b2 md:rounded-t-md   pb-1"}>

            <div class={"grid grid-cols-[2fr_1fr_2fr] "}>

                <LeagueAndRound game={game} />
                <Team team={home} showCountryFlags={game.league.show_country_flags} />
                <Scores game={game} />
                <Team team={away} showCountryFlags={game.league.show_country_flags} />

            </div>

            <Scorers goals={goals} />
            <Penalties penalties={"events" in game && game.events.find(e => e.name === "Penales")} />
            <Countdown showCountdown={game.status.enum === 1} start={game.start_time} />
            <GameInfo game={game} />

        </div>

    )
}

export default GameHeader







const Team = ({ team, showCountryFlags }) => {
    return (
        <Link
            // @ts-ignore
            href={`/team/${team.id}`}>
            <div class={"relative hover:underline flex flex-col md:flex-row justify-center gap-1 items-center"}>
                <div class={"relative"}>
                    <img src={`https://api.promiedos.com.ar/images/team/${team.id}/1`} alt="Escudo Equipo" className="h-12 w-12 drop-shadow-xs drop-shadow-black object-contain" />
                    {
                        showCountryFlags &&
                        <img src={`https://api.promiedos.com.ar/images/country/${team.country_id}/1`} alt="Logo" className="absolute bottom-0 left-9 h-4" />
                    }
                </div>
                <div class={"md:text-sm text-xs text-center font-semibold md:w-auto w-[82px]"}>{team.name}</div>
            </div>
        </Link>
    )
}

const Scores = ({ game }) => {

    return (
        <div class={"flex flex-col justify-start gap-1 "}>

            {
                "description" in game &&
                <div class={"text-center text-xs text-gray-200 "}> {game.description}</div>
            }

            <div class={"flex  flex-row items-center justify-center gap-1  text-3xl md:text-4xl "}>

                <div class={`${game.winner === 1 ? "text-[#41ffb2]" : ""} bg-gray-950 text-center rounded flex-1`}>
                    {"scores" in game ? game.scores[0] : `-`}</div>
                <div class={`${game.winner === 2 ? "text-[#41ffb2]" : ""} bg-gray-950 text-center rounded flex-1`}>
                    {"scores" in game ? game.scores[1] : `-`}</div>
            </div>

            <div title={game.status.name} class={`${getStatusColor(game)}  text-center rounded py-[0px] font-semibold text-[12px] md:text-[14px]`}>
                {getStatusText(game)}
            </div>
            {
                game.penalties != undefined &&
                <div class={"text-center w-full"}>
                    {`(${game.penalties[0]}-${game.penalties[1]})`}
                </div>
            }
        </div>
    )
}


const LeagueAndRound = ({ game }) => {

    return (
        <div class={"col-span-5 flex flex-col  items-center text-gray-100"}>

            <Link
                // @ts-ignore
                href={`/league/${game.league.id}`}
                class={"flex flex-row items-center justify-center w-full gap-1 px-2"}
            >
                <img src={`https://api.promiedos.com.ar/images/league/${game.league.id}/1`} class={"h-5 drop-shadow-xs drop-shadow-black"} alt="" />
                <span class={"hover:underline text-shadow-xs text-shadow-black active:underline font-semibold text-lg"}>{game.league.name}</span>
                <div class={"w-5"}></div>
                {/* <img src={`https://api.promiedos.com.ar/images/league/${game.league.id}/1`} class={"h-5"} alt="" /> */}
            </Link>
            <span class={"text-[11px] text-gray-400 font-semibold mb-2"}>
                {"stage_round_name" in game && game.stage_round_name.toUpperCase()}
            </span>
        </div>
    )
}




const GameInfo = ({ game }) => {
    return (
        <div class={"col-span-5 flex flex-col  md:flex-row items-center justify-start md:justify-center gap-x-3 flex-wrap text-xs mx-2 mt-3 font-semibold text-gray-300"}>
            <div class={"flex flex-row items-center gap-1"}>
                <BiCalendar color='white' size={14} />
                <div>{game.start_time.replaceAll("-", "/")}</div>
            </div>
            <span class={"md:block hidden"}>-</span>

            <a
                // @ts-ignore
                href={`https://www.google.com/search?q=${game.game_info?.find(item => item.name === "Estadio")?.value}`}
                target={"_blank"}
                class={"flex flex-row items-center gap-1 hover:underline"}>
                <MdStadium color='white' size={14} />
                <div>{game.game_info?.find(item => item.name === "Estadio")?.value}</div>
            </a>

            <span class={"md:block hidden"}>-</span>

            <a
                // @ts-ignore
                href={`https://www.google.com/search?q=Arbitro ${game.game_info?.find(item => item.name === "Árbitro")?.value}`}
                target={"_blank"}
                class={"flex flex-row items-center gap-1 hover:underline"}>
                {
                    game.game_info?.find(item => item.name === "Árbitro") &&
                    <GiWhistle color='white' size={14} />
                }
                {game.game_info?.find(item => item.name === "Árbitro")?.value}
            </a>

        </div>
    )
}


const Penalties = ({ penalties }) => {

    if (!penalties)
        return <></>

    return (
        <div class={"flex flex-col gap-[1px] w-full md:w-[80%] mx-auto  mt-[1px] "}>

            {
                penalties.rows.map((pen, i) => (
                    <div class={"gap-[1px] grid md:grid-cols-[6fr_1fr_6fr] grid-cols-[3fr_1fr_3fr] "}>


                        {
                            pen.events.map((event, j) => (
                                <div class={`${event.team === 1 ? "order-1 bg-gradient-to-l" : "order-3 bg-gradient-to-r"} bg-[#032E15]  flex flex-row items-center justify-center`}>
                                    {
                                        event.texts.length != 0 ?
                                            <div class={`${event.type === 17 ? "text-[#ff0000]" : "text-[#00e800]"} font-semibold text-center text-xs`}>
                                                {event.texts[0]}
                                            </div>

                                            :
                                            <div class={`${event.type === 17 ? "text-[#ff0000]" : "text-[#00e800]"} font-semibold text-center text-xs`}>
                                                {
                                                    event.type === 17 ?"x":"o"
                                                }
                                                
                                            </div>

                                    }
                                </div>
                            ))
                        }

                        <div class={"order-2  text-center font-semibold text-xs bg-green-950"}>
                            Pen {pen.time}
                        </div>

                    </div>
                ))
            }

        </div>
    )
}



const Scorers = ({ goals }) => {


    return (
        <div class={"flex flex-col gap-[1px] w-full md:w-[80%] mx-auto mt-2"}>

            {
                goals.map((goal, i) => {


                    return goal != undefined && (goal.time_to_display.includes("'")) && (<div class={"gap-[1px] grid md:grid-cols-[6fr_1fr_6fr] grid-cols-[3fr_1fr_3fr]  p-0   text-xs font-semibold text-center"}>

                        <div class={`${goal.isHome ? "bg-b3 " : ""}`}>
                            {goal.isHome ? `${goal.player_name}${"goal_type" in goal ? ` (${goal.goal_type})` : ""}` : ""}
                        </div>
                        <div class={`bg-b3  font-semibold`}>{goal.time_to_display}</div>
                        <div class={`${!goal.isHome ? "bg-gradient-to-r bg-b3 " : ""}`}>
                            {!goal.isHome ? `${goal.player_name}${"goal_type" in goal ? ` (${goal.goal_type})` : ""}` : ""}
                        </div>

                    </div>
                    )
                })
            }
        </div>
    )
}


const getStatusText = (game) => {
    if (game.status.enum === 1)
        return game.start_time.split(" ")[1]
    else if (game.status.enum === 2)
        return game.game_time_status_to_display.replace("Pen","Penales")
    else if (game.status.enum === 3)
        return game.status.name
    else
        return ""
}

const getStatusColor = (game) => {
    if (game.status.enum === 1)
        return "bg-green-700"
    else if (game.status.enum === 2)
        return "bg-red-700"
    else if (game.status.enum === 3)
        return "bg-black"
}