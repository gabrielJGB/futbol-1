// Team.jsx
import { TeamHeader } from "./components/TeamHeader";
import { Games } from "./components/Games";
import { Squad } from "./components/Squad";
import { Stats } from "./components/Stats";
import { Stadium } from "./components/Stadium";

import team from '../../../TEAM_BARCA.json'
import { fetcher } from "../../utils/fetcher";
import Loading from "../../components/Loading";
import useSWR from "swr";

const Team = ({ id }) => {

  const { data: team, error, isLoading } = useSWR(
    id ? `https://corsproxy.io/?https://api.promiedos.com.ar/team/${id}` : null,
    fetcher, {
    revalidateOnFocus: false,
  });


  if (error) return <p>Error al cargar datos</p>;

  if (isLoading) return (
    <div class={"w-full md:col-start-2 mt-5 "}>
      <Loading />
    </div>
  )



  console.log(team);

  const { competitor, main_league, team_info, games, squad, stats, stadium } = team;



  return (
    <div class="md:col-start-2 flex flex-col gap-6 md:mx-10 pb-20 bg-background md:border-x-[1px] border-borderc md:px-4 px-1 ">


      {(competitor || main_league || team_info) && (
        <TeamHeader
          id={id}
          competitor={competitor}
          main_league={main_league}
          team_info={team_info}
        />
      )}

      {games && <Games games={games} />}
      {squad && <Squad squad={squad} />}
      {stats && <Stats stats={stats} />}
      {stadium && <Stadium stadium={stadium} />}
    </div>
  );
};


export default Team