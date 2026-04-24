// @ts-nocheck
import { GameCard } from '@/components/home'
import { useLeague, useLeagueGames } from '@/hooks/useLeague'
import { darkMode } from '@/signals/common'
import { selectedRound } from '@/signals/league'
import { useEffect, useState } from 'preact/hooks'

const Fixture = ({ id }) => {

  const { league } = useLeague(id)
  const rounds = league.games.filters
  const currentRound = rounds.find(round => round.selected)


  const { games, gamesLoading } = useLeagueGames(id)

  // const currentGames = currentRound.games??"latest"

  // const [_games, setGames] = useState(currentGames)

  useEffect(() => {
    selectedRound.value = currentRound ?? rounds[rounds.length - 1]
    
  }, [])






  return (
    <div class={"flex flex-col gap-1 md:row-auto row-start-1 "}>

      <div class={"font-semibold text-2xl w-full text-center mb-2"}>{selectedRound.value.name}</div>

      <div class={"w-full grid md:grid-cols-5 grid-cols-4 gap-1 py-1 mb-2"}>
        {
          rounds.map((round) => (
            <div
              title={round.name}
              onClick={() => { selectedRound.value = round }}
              class={`${round.key === selectedRound.value.key ? "bg-[#C2E213] text-black hover:text-black" : "bg-[#008000] text-white"} ${ round.key===currentRound.key?"border-primary ":"border-transparent"} cursor-pointer hover:border-[#C2E213] border-[1px] hover:text-[#C2E213]  py-1 md:py-[2px] px-1 font-semibold text-start md:text-xs text-xs shadow shadow-gray-800  truncate `}>{round.name}</div>
          ))
        }
      </div>


      <div class={"shadow shadow-black"}>


        {
          !gamesLoading ?
            groupGamesByDate(games?.games).map((item, i) => (
              <div key={i} class={"flex flex-col"}>
                <div class={`w-full text-center font-bold py-2 ${darkMode.value?"bg-slate-400 text-slate-950":"bg-gray-800"} border-b-[1px] border-gray-700`}>{item.date_string}</div>
                {
                  item.games.map((game, j) => (
                    <GameCard key={game.id} showCountryFlags={false} game={game} index={-1} />
                  ))
                }
              </div>
            ))
            :
            <div class={"w-full h-[800px] bg-slate-800 transition-all animate-pulse"}>
            </div>
        }

      </div>


    </div>
  )
}

export default Fixture




const groupGamesByDate = (games) => {
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