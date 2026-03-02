import { useHome } from "@/hooks/useHome";
import { getDailyStats } from "@/utils/helper";


const DailyStats = ({ date }) => {

  const { data, isLoading } = useHome(date)

  if (isLoading)
    return (
      <div class="grid md:grid-cols-5 grid-cols-3 gap-1 animate-pulse">
        {
          Array.from({ length: 10 }).map(() => (<div class={"bg-green-900 rounded h-[45px] w-full"}></div>))
        }
      </div>
    )

  const stats = getDailyStats(data.leagues)

  return (

    <div class="grid md:grid-cols-5 grid-cols-3 gap-1 ">

      <StatCard label="Partidos" value={stats.matches} />
      <StatCard label="Competiciones" value={stats.competitions} />
      <StatCard label="Victorias local" value={stats.homeWins} />
      <StatCard label="Victorias visitante" value={stats.awayWins} />
      <StatCard label="Empates" value={stats.draws} />
      <StatCard label="Goles" value={stats.goalsTotal} />
      <StatCard label="Goles local" value={stats.goalsHome} />
      <StatCard label="Goles visitante" value={stats.goalsAway} />
      <StatCard label="Tarjetas rojas" value={stats.redCards} />
      <StatCard label="Goles/partido" value={stats.avgGoalsPerAllMatches} />

    </div>

  );
};

export default DailyStats



const StatCard = ({ label, value }) => (
  <div class="flex-1  text-center flex flex-col justify-center py-[2px] px-2  bg-green-900 gap-0  items-center  shadow text-gray-200 rounded">
    <div class="text-md font-bold">{value}</div>
    <div class="text-xs text-white w-max px-2">{label}</div>
  </div>
);