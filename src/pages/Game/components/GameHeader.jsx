import { Link } from 'preact-router'
import { useEffect } from 'preact/hooks'
import React from 'react'
import { BiCalendar } from 'react-icons/bi'
import { GiWhistle } from 'react-icons/gi'
import { MdStadium } from 'react-icons/md'

const GameHeader = ({ game }) => {

    const home = game.teams[0]
    const away = game.teams[1]

    const goals = game.teams.map((team, i) => {
        return team.goals?.flatMap(x => ({ ...x, isHome: i === 0 }))
    }).flat().sort((a, b) => (a.time - b.time))



    const getStatusText = () => {
        if (game.status.enum === 1)
            return game.start_time.split(" ")[1]
        else if (game.status.enum === 2)
            return game.game_time_status_to_display
        else if (game.status.enum === 3)
            return game.status.name
        else
            return ""
    }

    const getStatusColor = () => {
        if (game.status.enum === 1)
            return "bg-green-700"
        else if (game.status.enum === 2)
            return "bg-red-700"
        else if (game.status.enum === 3)
            return "bg-black"
    }


    useEffect(() => {

        document.title = (game.status.enum === 2 ? game.game_time_status_to_display + ("scores" in game ? ` ${game.scores[0]}-${game.scores[1]} ` : "") : "") + ` ${home.short_name} vs ${away.short_name}` + " - Fútbol 1"
    }, [game])


    return (

        <div class={"flex flex-col  md:p-1 md:mt-3 bg-b2  md:rounded-t-lg  mb-0"}>
            <div class={"grid grid-cols-[2fr_1fr_2fr] "}>

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



                <Link
                    // @ts-ignore
                    href={`/team/${home.id}`}>
                    <div class={"relative hover:underline flex flex-col md:flex-row-reverse justify-center gap-1 items-center"}>
                        <div class={"relative"}>
                            <img src={`https://api.promiedos.com.ar/images/team/${home.id}/1`} alt="Escudo Equipo" className="drop-shadow-xs drop-shadow-black h-12 w-12 object-contain" />
                            {
                                game.league.show_country_flags &&
                                <img src={`https://api.promiedos.com.ar/images/country/${home.country_id}/1`} alt="Logo" className="absolute bottom-0 left-9 h-4" />
                            }
                        </div>

                        <div class={"md:text-sm text-xs text-center font-semibold"}>{home.name}</div>
                    </div>
                </Link>

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

                    <div title={game.status.name} class={`${getStatusColor()}  text-center rounded py-[0px] font-semibold text-[12px] md:text-[14px]`}>
                        {getStatusText()}
                    </div>

                </div>

                <Link
                    // @ts-ignore
                    href={`/team/${away.id}`}>
                    <div class={"relative hover:underline flex flex-col md:flex-row justify-center gap-1 items-center"}>
                        <div class={"relative"}>
                            <img src={`https://api.promiedos.com.ar/images/team/${away.id}/1`} alt="Escudo Equipo" className="h-12 w-12 drop-shadow-xs drop-shadow-black object-contain" />
                            {
                                game.league.show_country_flags &&
                                <img src={`https://api.promiedos.com.ar/images/country/${away.country_id}/1`} alt="Logo" className="absolute bottom-0 left-9 h-4" />
                            }
                        </div>
                        <div class={"md:text-sm text-xs text-center font-semibold"}>{away.name}</div>
                    </div>
                </Link>

            </div>
            <div class={"flex flex-col gap-[1px] mt-2"}>

                {

                    goals.map((goal, i) => {


                        return goal != undefined && (<div class={"gap-[1px] grid md:grid-cols-[6fr_1fr_6fr] grid-cols-[3fr_1fr_3fr]  p-0  md:text-xs text-xs text-center"}>

                            <div class={`${goal.isHome ? "bg-gradient-to-l  from-[#032E15] " : ""}`}>
                                {goal.isHome ? `${goal.player_name}${"goal_type" in goal ? ` (${goal.goal_type})` : ""}` : ""}
                            </div>
                            <div class={`bg-[#032E15]  font-semibold`}>{goal.time_to_display}</div>
                            <div class={`${!goal.isHome ? "bg-gradient-to-r from-[#032E15] " : ""}`}>
                                {!goal.isHome ? `${goal.player_name}${"goal_type" in goal ? ` (${goal.goal_type})` : ""}` : ""}
                            </div>

                        </div>
                        )
                    })
                }
            </div>


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
                    <GiWhistle color='white' size={14} />
                    {game.game_info?.find(item => item.name === "Árbitro")?.value}
                </a>

            </div>
        </div>

    )
}

export default GameHeader