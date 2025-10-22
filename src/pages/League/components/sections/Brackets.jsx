import React from 'react'


import { h } from 'preact';
import { useRef, useLayoutEffect, useState } from 'preact/hooks';
import SectionTitle from '../../../../components/SectionTitle';

// Componente para un equipo individual
const Team = ({ name, id, winner }) => (

    <div class="flex flex-row flex-1 justify-start gap-1 items-center w-full">
        {
            id != -1 &&
            <div class={"flex items-center  justify-center h-full "}>
                <img style={{ height: 20 }} src={`https://api.promiedos.com.ar/images/team/${id}/1`} />
            </div>
        }
        <span class={` ${winner ? "font-semibold" : ""} text-xs py-2`}>{name} </span>

        {/* 
        <div class={"flex flex-row "}>
            {
                score?.map((item, i) => (
                    <span class={`border-l-[1px] flex-1 px-1 border-[#008000]/50 `}>{item !== undefined ? item : ''}</span>
                ))
            }
            {
                <span class={`border-l-[1px] flex-1 px-1 border-[#008000]/50 font-bold`}>{globalScore}</span>
            }
        </div> */}



    </div>
);


const Match = ({ match }) => (

    <div class={`flex w-full  flex-row justify-between rounded cursor-pointer transition-all hover:border-[#00ff00]/70 relative my-0 shadow-md overflow-hidden border-[1px] text-white bg-[#015A1C]/80 border-white/10 p-1 `}>

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
        <div class={"flex align-middle gap-1"}>

            {
                "score" in match &&
                <div class={"flex-1 flex flex-col items-center justify-center divide-y-[1px] border-[#008000]/50 "}>

                    {
                        match.score.map((item) => (
                            <div class={`pt-1 border-l-[0px] border-[#008000]/50 border-r-[0px] flex-1 font-bold`}>{item}</div>
                        ))
                    }

                </div>
            }
            {
                match.games?.length > 1 &&
                <div class={`flex flex-col items-center justify-between gap-0 pl-1  ${match.games?.length > 1 && "border-l-[1px] border-[#008000]/50"}`}>
                    {
                        match.games.map((game, i) => {
                            return "scores" in game &&
                                <div class={"flex flex-col "}>
                                    <div class={"flex flex-row gap-2"}>
                                        <img style={{ height: 11 }} src={`https://api.promiedos.com.ar/images/team/${game.teams[0].id}/1`} />
                                        <img style={{ height: 11 }} src={`https://api.promiedos.com.ar/images/team/${game.teams[1].id}/1`} />
                                    </div>
                                    <div class={"flex flex-row items-center justify-center gap-[2px]"}>
                                        <div class={"text-xs"}>{game.scores[0]}</div>
                                        <span>-</span>
                                        <div class={"text-xs"}>{game.scores[1]}</div>
                                    </div>
                                </div>
                        })
                    }


                </div>
            }

        </div >
    </div>

);


const Stage = ({ stage }) => (


    <div class={`relative flex flex-col ${stage.name === "Final" && stage.groups.length > 1 ? "justify-between" : "justify-around"} gap-[2px] w-[250px]  h-full  bg-black/20 p-1 pt-2 rounded-b`}>

        {stage.name === "Final" && stage.groups.length == 2 && <div class={"mb-20"}></div>}

        {stage.groups.map((match, index) => {

            return (
                <div class={`${index % 2 != 0 && index != stage.groups.length - 1 ? "mb-6" : ""} `}>
                    {stage.name === "Final" && index === 1 && <div class={"bg-[#061811] w-full py-1 text-center font-semibold text-[11px] mb-1"}>TERCER PUESTO</div>}
                    {
                        <div class={"flex flex-row items-center gap-1 "}>
                            {
                                match.games?.map((game, i) => (
                                    <div class={"text-[10px] "}> {i === 1 && "-"} {game.start_time.split(" ")[0].replace("-20", "/").replaceAll("-", "/")}</div>
                                ))
                            }
                        </div>
                    }

                    <Match
                        key={match.participants[0].id || index}
                        match={match}
                    />
                </div>
            )
        })}
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

const Brackets = ({ league }) => {

    if (!("brackets" in league && league.brackets))
        return

    const data = league.brackets
    const cols = data.stages.length
    const podium = getTeams(data.stages)



    return (
        <>
            <SectionTitle title={"Llaves"} />


            <div class={"flex flex-col justify-center mx-auto  overflow-auto"} >



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


                <div class={"grid sticky top-0 w-min z-30 gap-1 "} style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
                    {data.stages.map(stage => (
                        <div class={" w-[250px] backdrop-blur-sm bg-[#061610]/85  text-xs font-semibold text-center py-2"}>{stage.name.toUpperCase()}</div>
                    ))}
                </div>

                <div
                    style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}
                    class=" relative  grid gap-1 h-[80vh] w-min"
                >

                    {data.stages.map(stage => (
                        <Stage key={stage.name} stage={stage} />
                    ))}

                </div>
            </div>
        </>
    );
};

export default Brackets;