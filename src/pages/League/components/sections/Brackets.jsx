import React from 'react'


import { h } from 'preact';
import { useRef, useLayoutEffect, useState } from 'preact/hooks';

// Componente para un equipo individual
const Team = ({ name, score, id, winner }) => (
    <div class="flex justify-between items-center p-1 px-2 text-xs  w-full">
        <div class="flex justify-start gap-1 items-center ">
            {
                id != -1 &&
                <div class={"flex items-center  justify-center h-full "}>
                    <img style={{ height: 20 }} src={`https://api.promiedos.com.ar/images/team/${id}/1`} />
                </div>
            }
            <span class={`truncate ${winner ? "font-semibold" : ""}`}>{name} </span>
        </div>

        <span class="font-bold">{score !== undefined ? score : ''}</span>
    </div>
);

// Componente para un partido (enfrentamiento)
const Match = ({ match }) => (


    <div class={`cursor-pointer transition-all hover:border-[#00ff00]/70 relative my-0 shadow-md rounded-lg overflow-hidden border-[1px] ${match.is_final ? "bg-[#F6C01E] text-black" : "text-white"} bg-[#008000]/30 border-white/10`}>

        <Team winner={match.winner === 1} id={match.participants[0].id} name={match.participants[0].short_name} score={match.score ? match.score[0] : undefined} />
        <hr class={"text-[#008000]/50"} />
        <Team winner={match.winner === 2} id={match.participants[1].id} name={match.participants[1].short_name} score={match.score ? match.score[1] : undefined} />
    </div>
); 

// Componente para una fase del torneo
const Stage = ({ stage }) => (


    <div class="relative flex flex-col justify-around gap-2 h-full w-[200px] bg-black/10 p-1 pt-2 rounded-b">

        {stage.name === "Final" && stage.groups.length == 2 && <div></div>}

        {stage.groups.map((match, index) => {

            return (
                <div class={`${index % 2 != 0 && index != stage.groups.length - 1 ? "mb-6" : ""} `}>
                    {match.is_final && index > 1 && <div class={"text-xs"}>Tercer puesto</div>}

                    <Match
                        key={match.participants[0].id || index}
                        match={match}
                    />
                </div>
            )
        })}
    </div>

);

// --- Componente principal de las llaves ---
const Brackets = ({ league }) => {

    if (!("brackets" in league && league.brackets))
        return

    const data = league.brackets
    const cols = data.stages.length
    console.log(league);


    return (

        <div class={"flex flex-col  overflow-x-auto"} >

            <div class={"grid sticky top-0 w-full z-30 gap-1 "} style={{ gridTemplateColumns: `repeat(${cols},200px)` }}>
                {data.stages.map(stage => (
                    <div class={" bg-[#061610]  text-xs font-semibold text-center py-2"}>{stage.name.toUpperCase()}</div>
                ))}
            </div>

            <div
                style={{ gridTemplateColumns: `repeat(${cols},200px)` }}
                class=" relative  grid gap-1  h-[80vh]"
            >

                {data.stages.map(stage => (
                    <Stage key={stage.name} stage={stage} />
                ))}

            </div>
        </div>
    );
};

export default Brackets;