import React from 'react'
import { ChevronLeft } from 'lucide-preact'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { GiSoccerBall } from 'react-icons/gi'
import penalty from '../../../assets/penalty.png'
import boot from '../../../assets/boot.png'
import card from '../../../assets/card.png'
import ownGoal from '../../../assets/own-goal.png'
import penaltyMissed from '../../../assets/penaltyMissed.png'
import clank from '../../../assets/clank.png'

const Events = ({ game }) => {

  const items = game.events.flatMap(x => (x.rows)).map((k) => ({ 
    ...k, 
    id: parseInt(k.time.replace("+", "").replace("'", "")) 
  })).sort((a, b) => (a.id - b.id))



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
      return <div title="Tarjeta Amarilla" class={"bg-[#ffc61a] rounded-xs w-[9px] h-[12px]"}></div>

    if (type === 5)
      return <div title="Tarjeta Roja" class={"bg-[#ff1a1a] rounded-xs w-[9px] h-[12px]"}></div>



  }

  return (
    <div class={"flex flex-col-reverse gap-2  md:px-0 px-1"}>
      {
        items.map((item) => (
          <div class={"grid gap-[1px] md:grid-cols-[5fr_1fr_5fr] grid-cols-[3fr_1fr_3fr]   "}>


            <div class={` border-[#99bb1d] bg-green-950 flex flex-col border-b-[1px] gap-2 ${item.events[0].team === 1 ? "col-start-1 rounded-l-md " : "col-start-3 rounded-r-md "}  row-start-1 py-1 px-2`}>
              {
                item.events.map((event) => (
                  <div class={`flex flex-col justify-center text-xs ${item.events[0].team === 1 ? "items-start" : "items-end"}`}>
                    {event.texts.map((text, i) => (
                      <div class={`${item.events[0].team === 1 ? "flex-row-reverse" : "flex-row"} items-center flex gap-1`}>
                        {
                          "player_jersey_num" in event && event.player_jersey_num  && event.player_jersey_num != -1 && i===0&&
                          <div class={"text-center text-xs font-semibold text-gray-400"}> {event.player_jersey_num}</div>
                        }
                        <div>{text}</div>
                        <div>{getIcon(event.type, i)}</div>
                      </div>
                    ))}
                  </div>
                ))
              }
            </div>

            <div class={`${item.events[0].team === 2 ? "col-start-1" : "col-start-3"} row-start-1`}></div>

            <div class={`text-[#C2E213] border-b-[1px] border-[#99bb1d] bg-green-950 flex items-center justify-center col-start-2 text-center font-semibold`}>{item.time}</div>



          </div>
        ))
      }
    </div>
  )
}

export default Events