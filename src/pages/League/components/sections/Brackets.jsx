import React from 'react'


import { h } from 'preact';
import { useRef, useLayoutEffect, useState } from 'preact/hooks';

// Componente para un equipo individual
const Team = ({ name, score, id, winner }) => (
    <div class="flex justify-between items-center p-1 px-2 text-xs text-white w-full">
        <div class="flex justify-start gap-1 items-center ">
            {
                id != -1 &&
                <div class={"flex items-center  justify-center h-full "}>
                    <img style={{ width: 16 }} src={`https://api.promiedos.com.ar/images/team/${id}/1`} />
                </div>
            }
            <span class={`truncate ${winner ? "font-semibold" : ""}`}>{name} </span>
        </div>

        <span class="font-bold">{score !== undefined ? score : ''}</span>
    </div>
);

// Componente para un partido (enfrentamiento)
const Match = ({ match, matchRef }) => (


    <div ref={matchRef} class=" cursor-pointer transition-all hover:border-[#00ff00]/70 relative my-0 w-48 shadow-md rounded-lg overflow-hidden border-[1px] bg-[#008000]/40 border-white/10">

        <Team winner={match.winner === 1} id={match.participants[0].id} name={match.participants[0].short_name} score={match.score ? match.score[0] : undefined} />
        <hr class={"text-[#008000]/50"}/>
        <Team winner={match.winner === 2} id={match.participants[1].id} name={match.participants[1].short_name} score={match.score ? match.score[1] : undefined} />
    </div>
);

// Componente para una fase del torneo
const Stage = ({ stage, registerMatchElement }) => (
    <div class="flex flex-col  justify-around gap-2 h-auto px-4 ">

        {stage.groups.map((match, index) => (
            <Match
                key={match.participants[0].id || index}
                match={match}
                matchRef={el => registerMatchElement(stage.name, index, el)}
            />
        ))}
    </div>
);

// --- Componente principal de las llaves ---
const Brackets = ({ league }) => {
    console.log(league);

    const data = "brackets" in league && league.brackets

    if (!data)
        return;

    const [lines, setLines] = useState([]);
    const stageRefs = useRef({});
    const containerRef = useRef(null);

    // Usamos useLayoutEffect para asegurar que las mediciones se realicen después del renderizado del DOM
    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const newLines = [];
        const containerRect = containerRef.current.getBoundingClientRect();

        data.stages.forEach((stage, stageIndex) => {
            // Solo dibujar líneas si no es la última fase y connect_to_next_stage es true
            if (stageIndex >= data.stages.length - 1) return;

            const nextStage = data.stages[stageIndex + 1];
            const currentStageMatches = stage.groups;
            const nextStageMatches = nextStage.groups;

            currentStageMatches.forEach((_, matchIndex) => {
                // Cada dos partidos de la fase actual se conectan a uno de la siguiente
                const nextMatchIndex = Math.floor(matchIndex / 2);

                const startNode = stageRefs.current[stage.name]?.[matchIndex];
                const endNode = stageRefs.current[nextStage.name]?.[nextMatchIndex];

                if (startNode && endNode) {
                    const startRect = startNode.getBoundingClientRect();
                    const endRect = endNode.getBoundingClientRect();

                    // Coordenadas relativas al contenedor SVG
                    const startX = startRect.right - containerRect.left;
                    const startY = startRect.top + startRect.height / 2 - containerRect.top;
                    const endX = endRect.left - containerRect.left;
                    const endY = endRect.top + endRect.height / 2 - containerRect.top;

                    const midX = startX + (endX - startX) / 2;

                    newLines.push({
                        id: `${stage.name}-${matchIndex}`,
                        points: [
                            // Línea horizontal desde el partido de origen
                            { x1: startX, y1: startY, x2: midX, y2: startY },
                            // Línea vertical que une las horizontales
                            { x1: midX, y1: startY, x2: midX, y2: endY },
                            // Línea horizontal hacia el partido de destino
                            { x1: midX, y1: endY, x2: endX, y2: endY },
                        ]
                    });
                }
            });
        });

        setLines(newLines);
    }, [data]);

    const registerMatchElement = (stageName, matchIndex, element) => {
        if (!stageRefs.current[stageName]) {
            stageRefs.current[stageName] = {};
        }
        stageRefs.current[stageName][matchIndex] = element;
    };

    return (
        <div class="">
            <h2 class="text-[#C2E213] text-xl font-bold">Llaves</h2>
            <div ref={containerRef} class=" relative h-max flex overflow-y-auto overflow-x-auto">
                {/* Renderizar las Fases */}
                {data.stages.map(stage => (
                    <Stage key={stage.name} stage={stage} registerMatchElement={registerMatchElement} />
                ))}

                {/* Renderizar las líneas de conexión SVG */}
                <svg class="absolute top-0 left-0  w-full h-full" style={{ pointerEvents: 'none' }}>
                    {lines.map(line => (
                        <g key={line.id}>
                            {line.points.map((p, i) => (
                                <line
                                    key={i}
                                    x1={p.x1}
                                    y1={p.y1}
                                    x2={p.x2}
                                    y2={p.y2}
                                    stroke="lime"
                                    stroke-width="2"
                                />
                            ))}
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};

export default Brackets;