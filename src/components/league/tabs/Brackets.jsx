import { Link } from 'preact-router/match';
import { useLeague } from '@/hooks/useLeague';

const Brackets = ({ id, show }) => {

  if (!show)
    return;

  const { league } = useLeague(id)

  // @ts-ignore
  const data = league.brackets
  const cols = data.stages.length
  const podium = getTeams(data.stages)


  return (

    <div class={"h-[80vh] "}>



      {
        podium != undefined &&
        <div class={"flex flex-row justify-center gap-2 mx-auto mb-4"}>
          {
            podium.map((team, i) => (
              <div class={` flex flex-col gap-1 justify-end items-center `}>
                <img style={{ height: 40 }} src={`https://api.promiedos.com.ar/images/team/${team.team.id}/1`} />
                <div class={`flex items-center justify-center border-t border-[#c2e213] bg-[#071811] ${team.pos === 1 && "h-[60px]"} ${team.pos === 2 && "h-[40px]"} ${team.pos === 3 && "h-[23px]"} w-[80px] text-2xl font-semibold`}>{team.pos}</div>
              </div>
            ))
          }
        </div>
      }

      <div class={"flex w-full "}>
        <div
          style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}
          class="grid gap-1  md:px-1 mx-auto  w-full"
        >

          {data.stages.map(stage => (
            <Stage key={stage.name} stage={stage} />
          ))}

        </div>
      </div>
    </div>

  );
};

export default Brackets;




const Stage = ({ stage }) => (

  <div class={"flex flex-col justify-center md:w-auto w-[200px]"}>

    <div class={"z-80 sticky top-0 w-full shadow-xs shadow-black bg-[#004128]  text-xs font-semibold text-center py-2"}>{stage.name.toUpperCase()}</div>

    <div class={`relative flex flex-col ${stage.name === "Final" && stage.groups.length > 1 ? "justify-between" : "justify-around"} gap-[2px] pt-2  w-full h-full  bg-[#0f2217]/50   `}>


      {stage.name === "Final" && stage.groups.length == 2 && <div class={"mb-20"}></div>}

      {stage.groups.map((match, index) => {

        return (
          <div class={`${index % 2 != 0 && index != stage.groups.length - 1 ? "mb-6" : ""} `}>
            {stage.name === "Final" && index === 1 && <div class={"bg-[#004128] w-full py-0 text-center font-semibold text-[11px] mb-1"}>TERCER PUESTO</div>}

            <Match
              key={match.participants[0].id || index}
              match={match}
            />
          </div>
        )
      })}
    </div>

  </div>

);


const Match = ({ match }) => {

  const id1 = "games" in match && "id" in match.games[0] && match.games[0].id
  const twoGames = "games" in match && match.games.length > 1


  return (
    <Link
      // @ts-ignore
      href={id1 && !twoGames ? `/game/${id1}` : null}
      class={`flex flex-col border-[1px] text-white bg-[#015A1C]/80 border-white/10 shadow-black shadow-xs ${id1 && !twoGames ? "hover:border-[#00ff00]/70 cursor-pointer " : ""}`}
    >
      <div class={"bg-[#065a1f] flex flex-row items-center gap-1 h-[14px] justify-center text-center text-[10px] text-white"}>
        {
          match.games?.map((game, i) => (
            <>
              {i === 1 && " - "} {game.start_time.split(" ")[0].replace("-20", "/").replaceAll("-", "/")}
            </>
          ))
        }
      </div>


      <div class={`flex w-full  flex-row justify-between  transition-all  relative my-0 pl-1  overflow-hidden  `}>

        <div class={`flex flex-col flex-1 `}>

          <Team

            winner={match.winner === 1}
            id={match.participants[0].id}
            name={match.participants[0].short_name}

          />

          <hr class={"text-[#008000]/50"} />

          <Team
            winner={match.winner === 2}
            id={match.participants[1].id}
            name={match.participants[1].short_name}

          />

        </div>
        <div class={"flex gap-0"}>

          {
            "score" in match &&
            <div class={"pr-1 flex flex-col items-center justify-center divide-y-[1px] border-[#008000]/50 "}>

              {
                match.score.map((item) => (
                  <div class={`py-0 border-l-[0px] border-[#008000]/50 border-r-[0px] flex-1  font-bold`}>{item}</div>
                ))
              }

            </div>
          }
          {
            match.games?.length > 1 &&
            <div class={`flex flex-col items-center justify-start gap-0  ${match.games?.length > 1 && "border-l-[1px] border-[#008000]/50"}`}>
              {
                match.games.map((game, i) => {
                  return "scores" in game &&
                    <Link

                      // @ts-ignore
                      href={`/game/${game.id}`}
                      title={i === 0 ? "Ida" : "Vuelta"}
                      class={`flex flex-row hover:border-[#00ff00]/70 active:border-[#00ff00]/70 border px-[2px] border-transparent cursor-pointer `}
                    >
                      <div class={"flex flex-row items-center justify-center gap-1"}>

                        <img style={{ height: 11 }} src={`https://api.promiedos.com.ar/images/team/${game.teams[0].id}/1`} />

                        <div class={"flex flex-row items-center h-full justify-center "}>
                          <div class={"text-xs"}>{game.scores[0]}</div>
                          <span>-</span>
                          <div class={"text-xs"}>{game.scores[1]}</div>

                        </div>
                        <img style={{ height: 11 }} src={`https://api.promiedos.com.ar/images/team/${game.teams[1].id}/1`} />

                      </div>
                    </Link>
                })
              }


            </div>
          }

        </div >
      </div>
    </Link>
  )
};


const Team = ({ name, id, winner }) => (

  <div class="flex flex-row flex-1 justify-start gap-1 items-center w-full py-1">
    {
      id != -1 &&
      <div class={"flex items-center  justify-center h-full "}>
        <img class={"h-[13px]"} src={`https://api.promiedos.com.ar/images/team/${id}/1`} />
      </div>
    }
    <span class={` ${winner ? "font-semibold" : ""} line-clamp-1 text-xs py-0 pr-[1px]`} title={name}>{name} </span>


  </div>
);






const getTeams = (stages) => {

  const elem = stages.find(stage => stage.name === "Final")

  if (elem == undefined)
    return undefined

  const x = elem.groups.find(x => x.is_final)
  if (x === undefined)
    return undefined
  const y = elem.groups.find(x => x.is_third_place)
  if (y === undefined)
    return undefined
  const team_1 = x.participants[x.winner - 1]
  const team_2 = x.participants[x.winner]
  const team_3 = y.participants[y.winner - 1]


  return [{ team: team_2, pos: 2 }, { team: team_1, pos: 1 }, { team: team_3, pos: 3 }]
}