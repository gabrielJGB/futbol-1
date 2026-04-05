import { useGame } from '@/hooks/useGame'
import React from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { GiSoccerBall } from 'react-icons/gi'
import penalty from '@/assets/penalty.png'
import boot from '@/assets/boot.png'
import card from '@/assets/card.png'
import ownGoal from '@/assets/own-goal.png'
import penaltyMissed from '@/assets/penaltyMissed.png'
import clank from '@/assets/clank.png'
import Fade from '@mui/material/Fade'

const Events = ({ id }) => {


    const { data } = useGame(id)
    const game = data.game
    const stages = game.events.filter(e => e.name != "Penales")




    return (
        <Fade in={true} timeout={300} >
            <div class={"md:mx-40  flex flex-col-reverse gap-2 p-2 mb-40"}>

                <div class={"w-full text-center font-semibold"}>Inicio del partido</div>

                {
                    stages.map((stage, i) => {

                        if (!stage.show_stage_title)
                            return <></>

                        return <div class={"flex flex-col-reverse"}>
                            <div class={"flex flex-col-reverse gap-2 "}>
                                {
                                    stage.rows.map((row, j) => (
                                        <div class={`${row.events[0].team === 1 ? "flex-row bg-gradient-to-l from-transparent to-b2 border-l-[1px]" : "flex-row-reverse bg-gradient-to-l from-b3 to-transparent border-r-[1px]"} border-primary w-full flex  gap-2 items-center justify-start rounded-lg px-3 p-1< `}>

                                            <div class={"text-[20px] font-semibold text-primary"}>{row.time}</div>
                                            <Event event={row.events[0]} />

                                        </div>
                                    ))
                                }
                            </div>

                            <div class={"flex flex-row justify-center items-center gap-2 w-full text-center font-semibold mb-4  mt-2"}>

                                <div>{stage.name.replace("Fin", "Final")}</div>
                                {
                                    "scores" in stage &&
                                    <div class={"text-gray-400"}>({stage.scores[0]} - {stage.scores[1]})</div>
                                }


                            </div>

                        </div>
                    })
                }

            </div>
        </Fade>
    )
}

export default Events


const Event = ({ event }) => {

    const { type, texts } = event


    return (
        <div class={"flex flex-col "}>
            {
                texts.map((text, i) => (

                    <div class={"flex flex-row items-center gap-2"}>
                        {getIcon(type, i)}
                        <div class={"md:text-[13px] text-xs"}>{text}</div>
                    </div>


                ))
            }

        </div>
    )
}





const getIcon = (type, i) => {

    if (type === 1)
        if (i === 0)
            return <GiSoccerBall title="Gol" color="white" size={14} />
        else
            return <img title="Asistencia" src={boot} width={15} />

    if (type === 2)
        return <img title="Gol en contra" src={ownGoal} width={17} />


    if (type === 15)
        if (i === 0)
            return <BiChevronRight title="Ingresa" color='lime' size={20} />
        else
            return <BiChevronLeft title="Sale" color='red' size={20} />

    if (type === 7)
        return <img title="Penal fallado" src={penaltyMissed} width={20} />

    if (type === 6)
        return <img title="Doble Amarilla" src={card} width={17} />

    if (type === 10)
        return <img title="Clank!" src={clank} width={20} />
    if (type === 3)
        return <img title="Gol de penal" src={penalty} width={20} />

    if (type === 4)
        return <div title="Tarjeta Amarilla" class={"bg-[#ffdd1a] rounded-xs w-[9px] h-[14px]"}></div>

    if (type === 5)
        return <div title="Tarjeta Roja" class={"bg-[#ff1a1a] rounded-xs w-[9px] h-[14px]"}></div>



}