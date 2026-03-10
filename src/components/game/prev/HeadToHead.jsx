import React from 'react'
import { GameCard } from '@/components/home'

const HeadToHead = ({ game }) => {

    const games = game.head_to_head.games

    // console.log(game);


    return (
        <div class={"flex justify-center items-center flex-col gap-1 rounded py-1 "}>
            <div class={"w-full text-lg font-semibold text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>
                Ultimos Enfrentamientos</div>
            <div class={"flex flex-col gap-2 w-full md:w-1/2 justify-center items-center shadow shadow-gray-900"}>
                {
                    games.map((_game, i) => (

                        <div class={"flex flex-col shadow-xs shadow-black"}>
                            <div class={"bg-slate-800 w-full text-center py-[2px] text-[12px]"}>{_game.start_time.split(" ")[0].replaceAll("-","/")} - {_game.league.name}</div>
                            <GameCard
                                key={i}
                                // @ts-ignore
                                game={_game}
                                showCountryFlags={true}
                                index={i}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HeadToHead