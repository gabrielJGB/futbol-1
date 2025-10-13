const DailyStats = ({ stats }) => {
  return (
    <div class="md:px-0 px-1">
      <div class="flex flex-row justify-center flex-wrap gap-[2px] ">
        <StatCard label="Partidos" value={stats.matches} />
        <StatCard label="Competiciones" value={stats.competitions} />
        <StatCard label="Victorias local" value={stats.homeWins} />
        <StatCard label="Victorias visitante" value={stats.awayWins} />
        <StatCard label="Empates" value={stats.draws} />
        <StatCard label="Goles" value={stats.goalsTotal} />
        <StatCard label="Goles local" value={stats.goalsHome} />
        <StatCard label="Goles visitante" value={stats.goalsAway} />
        <StatCard label="Tarjetas rojas" value={stats.redCards} />
        <StatCard
          label="Prom. goles/partido"
          value={(stats.goalsTotal / stats.matches).toFixed(2)}
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div class="flex-1  text-center flex flex-col justify-center py-1 px-2  bg-green-900 gap-0  items-center  shadow text-gray-200">
    <div class="text-md font-bold">{value}</div>
    <div class="text-xs text-white w-max">{label}</div>
  </div>
);


export default DailyStats