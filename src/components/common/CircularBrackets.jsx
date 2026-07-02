import { useEffect, useMemo, useState } from "preact/hooks";
import { Link } from "preact-router/match";
import stages from "@/data/brackets.json";
import worldcup from "@/assets/worldcup.png";
import cross from "@/assets/x.png";
import { signal } from "@preact/signals";
import { useLeague } from "@/hooks/useLeague";

export default function CircularBrackets({ m = 0.6, id }) {
  const CENTER_X = 400 * m;
  const CENTER_Y = 400 * m;
  const roundRadii = [340 * m, 260 * m, 180 * m, 100 * m, 20 * m];

  const { league, leagueError, leagueLoading } = useLeague(id);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://api.promiedos.com.ar/league/tables_and_fixtures/fjda")
  //     .then((r) => r.json())
  //     .then((data) => {
  //       console.log(data);
  //       const obj = data.brackets.stages.map((stage) => {
  //         return {
  //           roundName: stage.name,
  //           count: stage.is_final ? 2 : stage.groups.length * 2,
  //           color: "bg-slate-950",
  //           circles: stage.groups.flatMap((g) => {
  //             return [g, g];
  //           }),
  //         };
  //       });

  //       setTournamentData(obj);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  if (leagueLoading) return <div>Cargando...</div>;

  const tournamentData = league.brackets.stages.map((stage) => {
    return {
      roundName: stage.name,
      count: stage.is_final ? 2 : stage.groups.length * 2,
      color: "bg-slate-950",
      circles: stage.groups.flatMap((g) => {
        return [g, g];
      }),
    };
  });

  // const tournamentData = useMemo(() => {
  //   return [
  //     { roundName: "Ronda de 32", count: 32, color: "bg-blue-500" },
  //     { roundName: "Octavos", count: 16, color: "bg-green-500" },
  //     { roundName: "Cuartos", count: 8, color: "bg-yellow-500" },
  //     { roundName: "Semifinal", count: 4, color: "bg-orange-500" },
  //     { roundName: "Final", count: 2, color: "bg-red-500" },
  //   ];
  // }, []);

  const getCoordinates = (radius, nodeIndex, totalNodes) => {
    const angle = (nodeIndex * 2 * Math.PI + Math.PI) / totalNodes;
    return {
      x: CENTER_X + radius * Math.cos(angle),
      y: CENTER_Y + radius * Math.sin(angle),
      angle,
    };
  };

  return (
    <div className="relative ">
      <div
        className="relative top-0 left-0  bg-slate-800  scale-100 border-2 border-gray-700 rounded-full rotate-[90deg]  shadow-2xl flex items-center justify-center"
        style={{ width: `${CENTER_X * 2}px`, height: `${CENTER_Y * 2}px` }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <g>
            <line
              stroke="rgba(255, 255, 255,0.07)"
              strokeWidth="2"
              x1={CENTER_X * 2}
              y1={CENTER_X}
              x2={0}
              y2={CENTER_X}
            />

            {roundRadii.map((r, i) => (
              <circle
                cx={CENTER_X}
                cy={CENTER_X}
                r={r + 41 * m}
                stroke={"rgba(0,50,20,0.5)"}
                stroke-width={"1"}
                fill={
                  i % 2 === 0 ? "rgba(0, 255, 0,0.07)" : "rgba(0, 0, 150,0.07)"
                }
              />
            ))}
          </g>
        </svg>

        {/* ---------LINEAS CONECTORES--------------*/}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${CENTER_X * 2} ${CENTER_Y * 2}`}
        >
          {tournamentData.map((round, roundIndex) => {
            if (roundIndex >= tournamentData.length - 1) return null;

            const currentRadius = roundRadii[roundIndex];
            const nextRadius = roundRadii[roundIndex + 1];
            const nextRoundCount = tournamentData[roundIndex + 1].count;

            return Array.from({ length: round.count }).map((_, nodeIndex) => {
              // Coordenadas del nodo actual (Ronda externa)
              const start = getCoordinates(
                currentRadius,
                nodeIndex,
                round.count,
              );

              const parentIndex = Math.floor(nodeIndex / 2);
              const end = getCoordinates(
                nextRadius,
                parentIndex,
                nextRoundCount,
              );
              const midRadius =
                currentRadius - (currentRadius - nextRadius) * 0.5;
              const midX = CENTER_X + midRadius * Math.cos(start.angle);
              const midY = CENTER_Y + midRadius * Math.sin(start.angle);

              const midXEnd = CENTER_X + midRadius * Math.cos(end.angle);
              const midYEnd = CENTER_Y + midRadius * Math.sin(end.angle);

              return (
                <g key={`line-${roundIndex}-${nodeIndex}`}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={midX}
                    y2={midY}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2"
                  />

                  <line
                    x1={midX}
                    y1={midY}
                    x2={midXEnd}
                    y2={midYEnd}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2"
                  />

                  <line
                    x1={midXEnd}
                    y1={midYEnd}
                    x2={end.x}
                    y2={end.y}
                    stroke="rgba(255, 255, 255,0.1)"
                    strokeWidth="2"
                  />
                </g>
              );
            });
          })}
        </svg>
        {/* ---------FIN LINEAS CONECTORES--------------*/}

        {tournamentData.map((round, roundIndex) => {
          const radius = roundRadii[roundIndex];

          return Array.from({ length: round.count }).map((_, nodeIndex) => {
            const { x, y } = getCoordinates(radius, nodeIndex, round.count);
            const [showPopup, setShowPopup] = useState(false);
            return (
              <Link
                // @ts-ignore
                href={
                  round.circles[nodeIndex].games[0].id != undefined
                    ? `/game/${round.circles[nodeIndex].games[0].id}`
                    : ""
                }

                key={`node-${roundIndex}-${nodeIndex}`}
                onClick={() => {
                  setShowPopup((prev) => !prev);
                }}
                title={
                  round.circles[nodeIndex].participants[0].name +
                  " vs " +
                  round.circles[nodeIndex].participants[1].name +
                  " | " +
                  round.circles[nodeIndex].games[0].start_time.replaceAll(
                    "-",
                    "/",
                  )
                }
                className={`mx-auto absolute transform -translate-x-1/2  bg-zinc-600 -rotate-[90deg] -translate-y-1/2
                            rounded-full flex items-center justify-center
                              cursor-pointer hover:ring-1 ring-lime-400
                            transition-all duration-200   bg-no-repeat bg-contain
                            ${round.circles[nodeIndex].participants[nodeIndex % 2 === 0 ? 0 : 1].id != -1 ? "size-10 shadow shadow-black/60" : "size-5"}
                            ${round.circles[nodeIndex].winner === 1 && nodeIndex % 2 === 1 && "brightness-25"}
                             ${round.circles[nodeIndex].winner === 2 && nodeIndex % 2 === 0 && "brightness-25"}
                          `}
                style={{
                  width:
                    round.circles[nodeIndex].participants[
                      nodeIndex % 2 === 0 ? 0 : 1
                    ].id != -1
                      ? m * 40
                      : m * 20,
                  height:
                    round.circles[nodeIndex].participants[
                      nodeIndex % 2 === 0 ? 0 : 1
                    ].id != -1
                      ? m * 40
                      : m * 20,
                  backgroundImage:
                    round.circles[nodeIndex].participants != undefined
                      ? `url(https://api.promiedos.com.ar/images/team/${round.circles[nodeIndex].participants[nodeIndex % 2 === 0 ? 0 : 1].id}/1)`
                      : "",
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                // title={`${round.roundName} - Partido ${Math.floor(nodeIndex / 2) + 1}`}
                // title={`${round.roundName} - ${round.circles[nodeIndex].name}`}
                //
              >
                <div
                  className={` ${false ? "flex" : "hidden"}  mb-8 bottom-10 shadow shadow-black/50 left-0 text-xs  font-semibold  bg-black p-2 rounded text-center flex-col justify-center items-center`}
                >
                  {
                    round.circles[nodeIndex].participants[
                      nodeIndex % 2 === 0 ? 0 : 1
                    ].name
                  }
                  {/* {nodeIndex + 1}*/}
                  {/* {round.teams[nodeIndex].symbol_name}*/}
                  {/* {round.scores[nodeIndex]}*/}
                </div>
              </Link>
            );
          });
        })}

        <div className="absolute mr-15 w-10 -rotate-[90deg] h-10   items-center justify-center z-10 flex flex-col">
          {/* <div style={{ backgroundImage: wo rldcup }} />*/}
          {/* <img src={worldcup} width={40} height={120} />*/}
          <span
            style={{ fontSize: 12 * m * 2 }}
            className={" font-semibold font-mono"}
          >
            FINAL
          </span>
        </div>
      </div>
    </div>
  );
}
