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
    }

    const getStatusColor = () => {
        if (game.status.enum === 1)
            return "bg-green-700"
        else if (game.status.enum === 2)
            return "bg-red-700"
        else if (game.status.enum === 3)
            return "bg-black"
    }




    return (

        <div class={"flex flex-col  p-1 bg-[#024817] shadow shadow-gray-800 rounded-lg md:mx-0 mx-1 mb-2"}>
            <div class={"grid grid-cols-[2fr_1fr_2fr] "}>

                <div class={"col-span-5 text-gray-100 font-semibold text-xs text-center flex items-center gap-1 flex-row justify-center   px-2"}>
                    <img src={`https://api.promiedos.com.ar/images/league/${game.league.id}/1`} class={"h-5"} alt="" />
                    <div class={"text-lg"}>{game.league.name.toUpperCase()}</div>
                </div>

                <div class={"col-span-5 text-gray-400 text-xs text-center flex felx-wrap flex-row justify-center mb-1 gap-2 px-2 "}>
                    <div class={"font-semibold"}>{game.stage_round_name?.toUpperCase()}</div>
                </div>



                <div class={"flex flex-col md:flex-row-reverse justify-center gap-1 items-center"}>
                    <img src={`https://api.promiedos.com.ar/images/team/${home.id}/1`} alt="Escudo Equipo" className="h-12 w-12 object-contain" />
                    <div class={"md:text-sm text-xs text-center font-semibold"}>{home.name}</div>
                </div>

                <div class={"flex flex-col justify-start gap-1 "}>
                    <div class={"flex  flex-row items-center justify-center gap-1  text-3xl md:text-4xl "}>
                        <div class={"bg-gray-950 text-center rounded flex-1"}>
                            {"scores" in game ? game.scores[0] : `-`}</div>
                        <div class={"bg-gray-950 text-center rounded flex-1"}>
                            {"scores" in game ? game.scores[1] : `-`}</div>
                    </div>

                    <div class={`${getStatusColor()}  text-center rounded py-[0px] font-semibold text-[12px] md:text-[14px]`}>
                        {getStatusText()}
                    </div>
                </div>

                <div class={"flex flex-col md:flex-row justify-center gap-1 items-center"}>
                    <img src={`https://api.promiedos.com.ar/images/team/${away.id}/1`} alt="Escudo Equipo" className="h-12 w-12 object-contain" />
                    <div class={"md:text-sm text-xs text-center font-semibold"}>{away.name}</div>
                </div>
            </div>
            <div class={"flex flex-col gap-[1px] mt-2"}>

                {

                    goals.map((goal, i) => {


                        return goal != undefined && (<div class={"gap-[1px] grid md:grid-cols-[6fr_1fr_6fr] grid-cols-[3fr_1fr_3fr]  p-0  md:text-xs text-xs text-center"}>

                            <div class={`${goal.isHome ? "bg-gradient-to-l  from-[#032E15] " : ""}`}>
                                {goal.isHome ? `${goal.player_name}${"goal_tyle" in goal ? ` (${goal.goal_type})` : ""}` : ""}
                            </div>
                            <div class={`bg-[#032E15]  font-semibold`}>{goal.time_to_display}</div>
                            <div class={`${!goal.isHome ? "bg-gradient-to-r from-[#032E15] " : ""}`}>
                                {!goal.isHome ? `${goal.player_name}${"goal_tyle" in goal ? ` (${goal.goal_type})` : ""}` : ""}
                            </div>

                        </div>
                        )
                    })
                }
            </div>


            <div class={"col-span-5 flex flex-row items-center justify-center gap-x-3 flex-wrap text-xs mx-2 mt-3 font-semibold text-gray-300"}>
                <div class={"flex flex-row items-center gap-1"}>
                    <BiCalendar color='white' size={14} />
                    <div>{game.start_time.replaceAll("-", "/")}</div>
                </div>
                -
                <div class={"flex flex-row items-center gap-1"}>
                    <MdStadium color='white' size={14} />
                    <div>{game.game_info.find(item => item.name === "Estadio")?.value}</div>
                </div>
                -
                <div class={"flex flex-row items-center gap-1"}>
                    <GiWhistle color='white' size={14} />
                    {game.game_info.find(item => item.name === "Árbitro")?.value}
                </div>

            </div>
        </div>

    )
}

export default GameHeader