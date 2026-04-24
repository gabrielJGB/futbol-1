import FieldPlayer from '@/components/game/lineups/FieldPlayer'
import { invertLines } from '@/signals/game'
import React from 'react'

const FieldLine = ({ players, isHome, gameId, colors ,teamId,assists}) => {


    const _invertLines = invertLines.value

    

    return (
        <div class={`flex ${isHome ?
            (!_invertLines ? "flex-col" : "flex-col-reverse")
            :
            (_invertLines ? "flex-col" : "flex-col-reverse")} items-center justify-evenly h-full`}>

            {
                players?.map((player, i) => (
                    <FieldPlayer key={i} player={player} assists={assists} isHome={isHome} colors={colors} gameId={gameId} teamId={teamId}/>
                ))
            }

        </div>
    )
}

export default FieldLine




