import React from 'react'
import { GameCard } from '@/components/home'
import Title from './Title'

const HeadToHead = ({ game }) => {

    let games = game?.head_to_head?.games




    return (
        <div class={"flex justify-center items-center flex-col gap-1 rounded-lg bg-b2/30 p-2  shadow shadow-zinc-950"}>
            <Title text={"Últimos Enfrentamientos"}/>
            <div class={"flex flex-col gap-2 w-full mt-2 justify-center items-center"}>
                {
                    games.map((_game, i) => (

                        <div class={"flex flex-col shadow-xs w-full shadow-black"}>
                            <div class={"flex flex-row items-center justify-between bg-slate-800 w-full text-center py-[2px] text-[12px] px-1"}>
                                <div class={"text-white"}>{_game.league.name}</div>
                                <div class={"text-white"}>{_game.start_time.split(" ")[0].replaceAll("-", "/")} </div>
                            </div>
                            <GameCard
                                key={i}
                                // @ts-ignore
                                game={_game}
                                showCountryFlags={false}
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