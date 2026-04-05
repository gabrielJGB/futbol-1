import React from 'react'
import red from '@/assets/red.png'
import yellow from '@/assets/yellow.png'
import injury from '@/assets/injury.png'

const MissingPlayers = ({ game }) => {


    const missing = game.players.missing_players

    if(missing === undefined)
        return <></>


    return (
        <div class={"flex flex-col"}>
            <div class={"w-full text-lg font-semibold text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>Ausentes</div>

            <div class={"grid grid-cols-2 md:gap-10 gap-2 md:mx-10 "}>

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
        <div class="flex items-center justify-between  border-b bg-b2/50 rounded-lg py-[2px] px-2 border-primary/50  group">

            <div class="flex flex-col ">

                <div class={"flex flex-row items-center gap-2"}>
                    <span class="font-mono text-lg text-center font-semibold w-5">{player.jersey_num != "0"? player.jersey_num:"-"}</span>
                    <p class="text-sm font-medium ">
                        {player.player_short_name}
                    </p>
                </div>

                <p class="text-[9px] font-semibold text-gray-400 uppercase tracking-wider">{player.position}</p>
            </div>

            <span class="text-[11px] text-gray-500 italic pr-2">
                {getMissingImg(player.missing_details.reason)}
            </span>

        </div>
    );
}


const getMissingImg = (missingReason) => {

    missingReason = missingReason.toLowerCase()

    if (missingReason === "tarjeta amarilla")
        return <div class={"w-[8px] h-[15px] bg-[#fcff00] flex items-center justify-center"}>
            <span class={"text-sm font-bold "}>5</span>
        </div>

    else if (missingReason === "tarjeta roja")
        return <div class={"w-[8px] h-[15px] bg-red-600 flex items-center justify-center"}></div>
    else if (missingReason === "lesionado")
        return <img src={injury} className="h-4 " title="Lesionado" />
    if (missingReason === "en la seleccion")
        return <div class={"text-sm"}>[En la seleccion]</div>

    else if (missingReason === "motivo personal")
        return <div class={"text-sm"}>[Motivo personal]</div>
}

