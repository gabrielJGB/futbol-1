import GameCard from '@/components/home/GameCard';
import { getSortedGames } from '@/utils/helper'
import { Link } from 'preact-router/match';
import React from 'react'

const SortedGames = ({ leagues }) => {

  const sortedGames = getSortedGames(leagues)


  return (
    <div class={"flex flex-col gap-0 "}>
      {
        sortedGames.map((game, i) => (
          <div key={i}>

            {
              game.start_time_display &&
              <div class={"bg-[#ed6c02] text-black text-center font-semibold px-1 text-lg"}>{game.start_time_display.split(" ")[1]}</div>
            }
            {
              game.league_id &&
              <Link
                // @ts-ignore
                href={`/league/${game.league_id}`} className="bg-[#002D29] border-b-[1px] pb-[5px] pt-[3px] px-[4px] border-gray-500 flex items-center justify-between w-full">
                <img src={`https://api.promiedos.com.ar/images/league/${game.league_id}/1`} alt="Logo" className="h-5" />
                <span className="text-white text-[14px] cursor-pointer font-bold uppercase hover:underline text-shadow-xs text-shadow-black ">{game.league_name}</span>
                <img src={`https://api.promiedos.com.ar/images/country/${game.country_id}/1`} alt="Logo" className="h-5" />
              </Link>
            }

            <GameCard key={i} index={i} game={game} showCountryFlags={game.show_country_flags} />

          </div>
        ))
      }


    </div>
  )
}

export default SortedGames