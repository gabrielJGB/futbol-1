import FieldPlayer from '@/components/game/lineups/FieldPlayer'
import { invertLines } from '@/signals/game'
import React from 'react'

const FieldLine = ({ players, isHome, id, colors }) => {


    const _invertLines = invertLines.value

    return (
        <div class={`flex ${isHome ?
            (!_invertLines ? "flex-col" : "flex-col-reverse")
            :
            (_invertLines ? "flex-col" : "flex-col-reverse")} items-center justify-evenly h-full`}>

            {
                players?.map((player, i) => (
                    <FieldPlayer key={i} player={player} isHome={isHome} colors={colors} id={id} />
                ))
            }

        </div>
    )
}

export default FieldLine




