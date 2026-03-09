import { invertLines } from '@/signals/game'
import React from 'react'

const PosessionBar = ({ posession, colors }) => {

    if (posession === undefined)
        return <></>


    return (
        <div title="Posesión de la pelota" class={`cursor-help md:w-auto w-[200vw] flex ${invertLines.value?"flex-row-reverse":"flex-row"} gap-[1px] h-[15px] bg-transparent`}>
            {
                posession.values.map((value, i) => (

                    <div
                        style={{  width: value, backgroundColor: colors[i].color, color: colors[i].text_color }}
                        class={"h-full text-xs text-center font-semibold"}
                    >
                        {value}
                    </div>
                ))
            }

        </div>
    )
}

export default PosessionBar