import React from 'react'
import GameCard from '../../../Home/components/GameCard';

const HeadToHead = ({ game }) => {

    const games = game.head_to_head.games

    console.log(game);


    return (
        <div class={"flex justify-center items-center flex-col gap-1 rounded py-1 "}>
            <div class={"w-full text-lg font-semibold text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>
                Ultimos Enfrentamientos</div>
            <div class={"flex flex-col w-full md:w-1/2 justify-center items-center shadow shadow-gray-900"}>
                {
                    games.map((_game, i) => (
                        <GameCard
                            key={i}
                            id={_game.id}
                            status={_game.status}
                            startTime={_game.start_time.split(" ")[1]}
                            isCompleted={_game.status.symbol_name === "Fin"}
                            statusDisplayText={_game.game_time_status_to_display}
                            roundName={undefined}
                            description={`${_game.league.name} - ${_game.start_time.split(" ")[0].replaceAll("-","/")}`}
                            tvURL={"tv_networks" in _game ? _game.tv_networks[0] : undefined}
                            homeScore={"scores" in _game ? _game.scores[0] : ""}
                            awayScore={"scores" in _game ? _game.scores[1] : ""}
                            home={_game.teams[0]}
                            away={_game.teams[1]}
                            homeScorers={"goals" in _game.teams[0] ? _game.teams[0].goals : []}
                            awayScorers={"goals" in _game.teams[1] ? _game.teams[1].goals : []}
                            winner={_game.winner}
                            i={i}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default HeadToHead