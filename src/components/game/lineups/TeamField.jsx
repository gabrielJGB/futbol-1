import FieldLine from '@/components/game/lineups/FieldLine'
import { invertLines } from '@/signals/game';
import React from 'react'

const TeamField = ({ team, isHome, gameId ,teamId}) => {

    


    let formation = team?.formation === ""? ["4","4","2"]: team?.formation?.split("-")
    formation?.unshift("1")
    formation = formation?.map(Number)
    const colors = team.colors
    const lines = agruparPorLineas(team?.starting, formation)
    const _invertLines = invertLines.value

    const leftClass = "left-0 col-start-1 flex-row row-start-1"
    const rightClass = "right-0 col-start-2 flex-row-reverse row-start-1"



    return (
        <div class={`
            ${isHome ? (_invertLines ? rightClass : leftClass) : (_invertLines ? leftClass : rightClass)}
          z-0 flex  h-full  items-center justify-evenly w-full `}
        >

            {
                lines.map((players, i) => (
                    <FieldLine
                        key={i}
                        players={players}
                        isHome={isHome}
                        colors={colors}
                        gameId={gameId}
                        teamId={teamId}

                    />
                ))
            }
        </div>
    )
}

export default TeamField





const agruparPorLineas = (players, formation) => {
    let pointer = 0
    return formation.map((cantidad) => {
        const linea = players.slice(pointer, pointer + cantidad)
        pointer += cantidad
        return linea
    })
}