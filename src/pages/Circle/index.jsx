import { useMemo, useState } from "preact/hooks";
import stages from "@/data/brackets.json";
import worldcup from "@/assets/worldcup.png";
import cross from "@/assets/x.png";
import { signal } from "@preact/signals";
const CENTER_X = 400; // Centro del lienzo
const CENTER_Y = 400;
const CENTER = 200;

const Comp = () => {
  return (
    <div className={"flex flex-col gap-5 justify-center items-center"}>
      <Circles />
      <Drawing />
    </div>
  );
};

export default Comp;

// ----------------------------------------------------------------------------------------------------

const Circles = () => {
  // Radios de cada ronda (de afuera hacia adentro)
  const roundRadii = [340, 260, 180, 100, 20];

  console.log(stages);

  const tournamentData = stages.map((stage) => {
    return {
      roundName: stage.name,
      count: stage.is_final ? 2 : stage.groups.length * 2,
      color: "bg-slate-950",
      circles: stage.groups.flatMap((g) => {
        return [g, g];
      }),
    };
  });

  // Configuración de las rondas
  // const tournamentData = useMemo(() => {
  //   return [
  //     { roundName: "Ronda de 32", count: 32, color: "bg-blue-500" },
  //     { roundName: "Octavos", count: 16, color: "bg-green-500" },
  //     { roundName: "Cuartos", count: 8, color: "bg-yellow-500" },
  //     { roundName: "Semifinal", count: 4, color: "bg-orange-500" },
  //     { roundName: "Final", count: 2, color: "bg-red-500" },
  //   ];
  // }, []);

  // Función utilitaria para obtener las coordenadas (X, Y) basadas en el radio, índice y total de nodos
  const getCoordinates = (radius, nodeIndex, totalNodes) => {
    // Calculamos el ángulo en radianes.
    // Restamos Math.PI / 2 para que el primer nodo empiece arriba (12 en punto) si lo deseas,
    // o déjalo así para que empiece a la derecha (3 en punto) como en la imagen original.

    const angle = (nodeIndex * 2 * Math.PI + Math.PI) / totalNodes;
    return {
      x: CENTER_X + radius * Math.cos(angle),
      y: CENTER_Y + radius * Math.sin(angle),
      angle,
    };
  };

  return (
    <div className="relative flex flex-col items-center col-start-2 justify-center min-h-screen  text-white p-3">
      <div
        className=" relative bg-slate-800 border-2 border-gray-700 rounded-full rotate-[90deg] scale-70 shadow-2xl flex items-center justify-center"
        style={{ width: `${CENTER_X * 2}px`, height: `${CENTER_Y * 2}px` }}
      >
        {/* Capa SVG para las líneas conectoras */}

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
                r={r + 41}
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
            // No dibujamos líneas desde la última ronda (la final) hacia el centro aquí,
            // ya que se conecta directamente al trofeo.
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

              // Coordenadas del nodo destino (Ronda interna)
              // Dos nodos externos van al mismo nodo interno (ej: nodo 0 y 1 van al 0 de la sig. ronda)
              const parentIndex = Math.floor(nodeIndex / 2);
              const end = getCoordinates(
                nextRadius,
                parentIndex,
                nextRoundCount,
              );

              // Para hacer el efecto de la imagen donde las líneas se juntan en un ángulo angular:
              // Calculamos un "punto medio" en el radio intermedio entre ambas rondas
              const midRadius =
                currentRadius - (currentRadius - nextRadius) * 0.5;
              const midX = CENTER_X + midRadius * Math.cos(start.angle);
              const midY = CENTER_Y + midRadius * Math.sin(start.angle);

              const midXEnd = CENTER_X + midRadius * Math.cos(end.angle);
              const midYEnd = CENTER_Y + midRadius * Math.sin(end.angle);

              return (
                <g key={`line-${roundIndex}-${nodeIndex}`}>
                  {/* Línea desde el nodo actual hasta el radio medio */}
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={midX}
                    y2={midY}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2"
                  />
                  {/* Línea que une el quiebre hacia la trayectoria del nodo hijo */}
                  <line
                    x1={midX}
                    y1={midY}
                    x2={midXEnd}
                    y2={midYEnd}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="2"
                  />
                  {/* Línea final que entra al nodo hijo */}
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
              <div
                key={`node-${roundIndex}-${nodeIndex}`}
                onClick={() => {
                  setShowPopup((prev) => !prev);
                }}
                className={` absolute transform -translate-x-1/2 bg-zinc-600 -rotate-[90deg] -translate-y-1/2
                                rounded-full flex items-center justify-center
                                  cursor-pointer hover:ring-1 ring-lime-400
                                transition-all duration-200   bg-no-repeat bg-contain
                                ${round.circles[nodeIndex].participants[nodeIndex % 2 === 0 ? 0 : 1].id != -1 ? "size-10 shadow shadow-black/60" : "size-5"}
                                ${round.circles[nodeIndex].winner === 1 && nodeIndex % 2 === 1 && "brightness-25"}
                                 ${round.circles[nodeIndex].winner === 2 && nodeIndex % 2 === 0 && "brightness-25"}
                              `}
                style={{
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
              </div>
            );
          });
        })}

        {/* Centro del Torneo (Copa / Ganador) */}
        <div className="absolute mr-15 w-10 -rotate-[90deg] h-10   items-center justify-center z-10 flex flex-col">
          {/* <span className="text-3xl">🏆 </span>*/}
          {/* <div style={{ backgroundImage: wo rldcup }} />*/}
          {/* <img src={worldcup} width={40} height={120} />*/}
          <span className={"text-xs font-semibold font-mono"}>FINAL</span>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------------------------------

const Drawing = () => {
  return (
    <div
      class={
        "relative flex flex-col m-10 w-min h-min justify-center items-center bg-slate-900 "
      }
    >
      <div
        className={"absolute h-[200px] w-[200px] bg-slate-800 rounded-full"}
        style={{ left: 200, top: 200 }}
      ></div>

      <svg width="600px" height="600px" viewBox="600 600">
        <path
          d="
          M 300 0
          A 300 300 0 0 1 600 300

          "
          fill="none"
          stroke="red"
          stroke-width="8"
        />
        <circle
          cx={300}
          cy={300}
          r={300}
          stroke="lime"
          stroke-width="2"
          fill="transparent"
        />
      </svg>

      {/*
        <svg width="600px" height="600px" viewBox="-300 -300 600 600">
        <path
          d="
            M -200 0
            A 200 200 0 0 0 0 200

            "
          fill="none"
          stroke="red"
          stroke-width="8"
        />
        <circle
          cx={0}
          cy={0}
          r={200}
          stroke="lime"
          stroke-width="2"
          fill="transparent"
        />
      </svg>
      */}
    </div>
  );
};
