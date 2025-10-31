// @ts-nocheck

import { h } from "preact";
import GameCard from "./GameCard";
import { Link } from "preact-router/match";
import { selectedButton } from "../../../signals/signals";


export default function LeagueCard({ leagueId, leagueName, leagueURL, leagueCountryURL, games,showCountryFlags }) {

 const getCondition = (g) => {



        if (selectedButton.value === -1)
            return true 
        else if (selectedButton.value === 0)
            return g.status.enum === 1

        else if (selectedButton.value === 1)
            return  (g.status.enum == 2)

        else if (selectedButton.value === 2)
            return  g.status.enum === 3
    }

    return (
        <div
            className=" flex flex-col gap-[0px]  justify-center items-center  shadow shadow-gray-900 w-full border-[1px] border-gray-500 ">


            <Link href={`/league/${leagueId}`} className="bg-[#002D29] border-b-[1px] pb-[5px] pt-[3px] px-[4px] border-gray-500   flex items-center justify-between w-full">
                <img src={leagueURL} alt="Logo" className="h-6" />
                <span className="text-white text-[18px] cursor-pointer font-bold uppercase hover:underline text-shadow-xs text-shadow-black ">{leagueName}</span>
                <img src={leagueCountryURL} alt="Logo" className="h-6" />
            </Link>


            {games.filter(x => getCondition(x)).map((game, i) => (
                <GameCard
                    key={i}
                    id={game.id}
                    status={game.status}
                    startTime={game.start_time.split(" ")[1]}
                    isCompleted={game.status.symbol_name === "Fin"}
                    statusDisplayText={game.game_time_status_to_display}
                    roundName={game.stage_round_name}
                    description={game.description}
                    tvURL={"tv_networks" in game ? game.tv_networks[0] : undefined}
                    homeScore={"scores" in game ? game.scores[0] : ""}
                    awayScore={"scores" in game ? game.scores[1] : ""}
                    home={game.teams[0]}
                    away={game.teams[1]}
                    homeScorers={"goals" in game.teams[0] ? game.teams[0].goals : []}
                    awayScorers={"goals" in game.teams[1] ? game.teams[1].goals : []}
                    winner={game.winner}
                    showCountryFlags={showCountryFlags}
                    i={i}


                />
            ))}
        </div>
    );
}
