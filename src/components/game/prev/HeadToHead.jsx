import React from 'react'
import { GameCard } from '@/components/home'

const HeadToHead = ({ game }) => {

    const games = game.head_to_head.games

    // console.log(game);


    return (
        <div class={"flex justify-center items-center flex-col gap-1 rounded py-1 "}>
            <div class={"w-full text-lg font-semibold text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>
                Ultimos Enfrentamientos</div>
            <div class={"flex flex-col w-full md:w-1/2 justify-center items-center shadow shadow-gray-900"}>
                {
                    games.map((_game, i) => (
                        <GameCard
                            key={i}
                            index={i}
                            game={_game}
                            showCountryFlags={true}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default HeadToHead