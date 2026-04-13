import React from 'react'
import red from '@/assets/red.png'
import yellow from '@/assets/yellow.png'
import injury from '@/assets/injury.png'
import { Link } from 'preact-router'
import Title from './Title'

const MissingPlayers = ({ game }) => {


    const missing = game.players.missing_players

    if (missing === undefined)
        return <></>

    const ids = [game.teams[0].id, game.teams[1].id]


    return (
        <div class={"flex flex-col rounded-lg bg-b2/30 p-2 shadow shadow-zinc-950"}>
            <Title text={"Ausentes"}/>

            <div class={"grid grid-cols-2  md:gap-2 gap-1   mt-3"}>

                {
                    ids.map((id) => (
                        <img
                            src={`https://api.promiedos.com.ar/images/team/${id}/1`}
                            className="h-7 drop-shadow drop-shadow-black w-full object-contain md:mb-0 mb-1"
                            alt="Escudo Equipo"
                        />
                    ))
                }

                {
                    missing.map((team, i) => (
                        <div class={"flex flex-col gap-1"}>
                            {
                                team.map((player, j) => (
                                    <Player player={player} />
                                ))
                            }

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MissingPlayers


const Player = ({ player }) => {

    return (
        <Link
            // @ts-ignore
            href={`/player/${player.name}`} class="flex items-center justify-between  border-b hover:bg-b2 active:bg-b2 bg-b2/50 rounded-sm py-[2px] px-2 w-full border-green-800  group ">

            <div class="flex flex-col ">

                <div class={"flex flex-row items-center gap-2 "}>
                    <span class="font-mono text-lg text-center font-semibold w-5">{player.jersey_num != "0" && player.jersey_num != "-1" ? player.jersey_num : "-"}</span>
                    <p class="text-sm font-medium ">
                        {player.player_short_name}
                    </p>
                </div>

                <p class="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">{player.position}</p>
            </div>

            <span class="text-[11px] text-gray-500 italic text-right">
                {getMissingImg(player.missing_details.reason)}
            </span>

        </Link>
    );
}


const getMissingImg = (missingReason) => {

    missingReason = missingReason.toLowerCase()

    if (missingReason === "tarjeta amarilla")
        return <div class={"w-[12px] h-[18px] bg-[#fcff00] flex items-center justify-center"}>
            <span class={"text-sm font-semibold text-black "}>5</span>
        </div>

    else if (missingReason === "tarjeta roja")
        return <div class={"w-[12px] h-[18px] bg-red-600 flex items-center justify-center"}></div>

    else if (missingReason === "lesionado")
        return <img src={injury} className="h-4 " title="Lesionado" />

    if (missingReason === "en la selección")
        return <div class={"text-xs text-white"}>En la seleccion</div>

    else if (missingReason === "motivo personal")
        return <div class={"text-xs  text-white"}>Motivo personal</div>

    else 
        return <></>
}

