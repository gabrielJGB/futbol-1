// @ts-nocheck
import { useState, useEffect, useRef } from "preact/hooks";
import React from 'react'
import GameCard from '../../../Home/components/GameCard'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { round } from '../../signals';

const groupGamesByDate = (games, rounds) => {
    const daysOfWeek = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ];

    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ];

    
    const getDateKey = (startTime) => {
        const [day, month, year] = startTime.split(" ")[0].split("-").map(Number);
        const date = new Date(year, month - 1, day);
        return date.toISOString().split("T")[0]; 
    };

    const grouped = {};
    let i = 0

    for (const game of games) {
        const [day, month, year] = game.start_time.split(" ")[0].split("-").map(Number);
        const date = new Date(year, month - 1, day);

        const dayName = daysOfWeek[date.getDay()];
        const dateString = `${dayName} ${day} de ${months[month - 1]}`;
        game.date_string = dateString;

        const key = getDateKey(game.start_time);

        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(game);

    }

 

    return Object.entries(grouped).map(([date, games]) => ({
        date,
        date_string: games[0].date_string,
        games,
    }));
};




const Fixture = ({ games, rounds }) => {

    // const [selectedRound, setSelectedRound] = useState(rounds.indexOf(rounds.find(round => round.selected)))
    const groupedByDate = groupGamesByDate(games.games, rounds)






    return (
        <div class="flex flex-col">
            {/* <div class={"flex flex-row justify-between items-center p-1 bg-gray-800 shadow shadow-gray-800"}>
                <BiArrowToLeft size={40} color="#C2E213" class={"hover:bg-black rounded cursor-pointer"} onClick={() => handleSelected(true)} />
                <div class={"text-lg font-semibold text-white "}>
                    {round.value?.name}
                </div>
                <BiArrowToRight size={40} color="#C2E213" class={"hover:bg-black rounded cursor-pointer"} onClick={() => handleSelected(false)} />

            </div> */}


            <div class="flex flex-col shadow shadow-gray-800">

                {
                    groupedByDate.map((item, i) => (
                        <div key={i} class={"flex flex-col"}>
                            <div class={"w-full text-center font-bold py-2 bg-gray-800"}>{item.date_string}</div>

                            {
                                item.games.map((game, j) => (
                                    <GameCard
                                        key={j}
                                        id={game.id}
                                        status={game.status}
                                        startTime={game.start_time.split(" ")[1]}
                                        isCompleted={game.status.symbol_name === "Fin"}
                                        statusDisplayText={game.game_time_status_to_display}
                                        roundName={undefined}
                                        description={undefined}
                                        tvURL={"tv_networks" in game ? game.tv_networks[0] : undefined}
                                        homeScore={"scores" in game ? game.scores[0] : ""}
                                        awayScore={"scores" in game ? game.scores[1] : ""}
                                        home={game.teams[0]}
                                        away={game.teams[1]}
                                        homeScorers={"goals" in game.teams[0] ? game.teams[0].goals : []}
                                        awayScorers={"goals" in game.teams[1] ? game.teams[1].goals : []}
                                        winner={game.winner}
                                        i={j}


                                    />
                                ))
                            }

                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Fixture