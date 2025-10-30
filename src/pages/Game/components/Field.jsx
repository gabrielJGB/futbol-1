import React from 'react'
import { useEffect, useState } from "preact/hooks";
import ColorThief from 'colorthief';

const Field = ({ teams, colors, ids }) => {



    const getPlayerNameColor = (p) => {
        if ("events" in p && "cards" in p.events && p.events.cards) {
            if (p.events.cards.red)
                return "text-[#f20000]"
            else if (p.events.cards.yellow)
                return "text-[#ffff19]"
            else
                return "text-white"

        } else
            return "text-white"



    }


    const groupPlayersObj = (players) => {
        let obj = {
            arquero: players.filter(p => p.position === "Arquero"),
            defensores: players.filter(p => p.position === "Defensor"),
            mediocampistas: players.filter(p => p.position === "Mediocampista"),
            atacantes: players.filter(p => p.position === "Delantero"),
        };
        return [obj.arquero, obj.defensores, obj.mediocampistas, obj.atacantes]
    };

    const clamp = (val, min = 5, max = 95) => {
        const n = Number(val);
        if (Number.isNaN(n)) return min;
        return Math.min(Math.max(n, min), max);
    };

    const home = teams[0].starting
    const away = teams[1].starting






    if (ids[0] === "igg") {
        colors[0].color = "#1c3ea3"
        colors[0].text_color = "#eac807"
    }

    else if (ids[1] === "igg") {
        colors[1].color = "#1c3ea3"
        colors[1].text_color = "#eac807"
    }


    return (
        <div class={" w-full "}>
            <div class={" bg-[url('/fieldbg.png')] bg-repeat md:w-full w-[200vw]  shadow-xs shadow-gray-950   md:h-[450px] h-[420px] relative rounded-lg"}>

                {/* <div className="relative w-full shadow  shadow-gray-800 rounded h-full   overflow-hidden"
            > */}
                <div className="absolute left-0 top-1/6 w-1/6 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-0 bottom-1/6 w-1/6 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-0 top-1/3 w-1/14 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-0 bottom-1/3 w-1/14 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-1/14 top-1/3 h-4/12 border-l-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-1/6 top-1/6 h-4/6 border-l-4  border-gray-400 pointer-events-none "></div>
                <div className="absolute right-1/6 top-1/6 h-4/6 border-l-4  border-gray-400 pointer-events-none"></div>
                <div className="absolute inset-0 border-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-1/2 top-0 h-full border-l-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-gray-400 rounded-full pointer-events-none"></div>
                <div className="absolute right-0 top-1/3 w-1/14 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute right-0 bottom-1/3 w-1/14 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute right-1/14 top-1/3 h-4/12 border-l-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute right-0 top-1/6 w-1/6 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute right-0 bottom-1/6 w-1/6 border-b-4 border-gray-400 pointer-events-none"></div>





                {home.map((p, i) => {
                    const x = p.pitch_location?.x ?? 50;
                    const y = p.pitch_location?.y ?? 50;
                    const leftPercent = clamp(x * 0.5, 5, 45); // 0..100 -> 0..50 -> limitado a 5..45
                    const topPercent = clamp(y, 10, 90);
                    return (
                        <div
                            key={`local-${p.jersey_num}-${i}`}
                            className="  absolute flex flex-col gap-1 items-center justify-center  text-white text-xs font-bold z-10 "
                            style={{
                                left: `${leftPercent}%`,
                                top: `${topPercent}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            title={p.name}
                        >

                            <div
                                style={{ backgroundColor: colors[0].color, color: colors[0].text_color }}
                                class={"flex border-[2px] border-gray-900 justify-center items-center rounded-lg text-[16px] md:text-[18px] font-bold w-[36px] h-[36px] shadow-xs shadow-gray-800"}>{p.jersey_num}</div>
                            <div
                                style={{ textShadow: "black 1px 1px 3px", }}
                                class={`${getPlayerNameColor(p)} text-center text-[14px] w-[80px] px-[2px]`}>{p.player_short_name}{p.is_captain ? "(C)" : ""}</div>
                        </div>
                    );
                })}


                {away.map((p, i) => {
                    const x = p.pitch_location?.x ?? 50;
                    const y = p.pitch_location?.y ?? 50;
                    const invertedX = 100 - Number(x);
                    const invertedY = 100 - Number(y);
                    const leftPercent = 50 + clamp(invertedX * 0.5, 5, 45); // 50 + (0..50) limitado -> 55..95
                    const topPercent = clamp(invertedY, 10, 90);
                    return (
                        <div
                            key={`away-${p.jersey_num}-${i}`}
                            className=" absolute flex flex-col gap-1 items-center justify-center  text-white text-xs font-bold z-10 "
                            style={{
                                left: `${leftPercent}%`,
                                top: `${topPercent}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            title={p.name}
                        >
                            <div
                                style={{ backgroundColor: colors[1].color, color: colors[1].text_color }}
                                class={"z-0 relative flex  border-[2px] border-gray-900 justify-center items-center rounded-lg text-[16px] md:text-[18px] font-bold w-[36px] h-[36px] shadow-xs shadow-gray-800"}

                            >
                                {
                                    ids[0] === "igg" || ids[1] === "igg" &&
                                    <div style="position: absolute"><div class="-z-10 bg-blue-800 h-[10px] w-[32px] rounded-t-[6px]"></div><div class="bg-[#eac807] h-[13px] w-[32px] "></div><div class="bg-blue-800 h-[10px] w-[32px] rounded-b-[6px]"></div></div>
                                }

                                <span class={`text-shadow-xs text-black z-20 ${ids[0] === "igg" || ids[1] === "igg" ?"text-black":""}`}>{p.jersey_num}</span>

                            </div>
                            <div
                                style={{ textShadow: "black 1px 1px 3px", }}
                                class={`${getPlayerNameColor(p)}  text-center text-[14px] w-[87px] px-[0px]`}>{p.player_short_name}{p.is_captain ? " (C)" : ""}
                            </div>
                        </div>
                    );
                })}



                {/* </div> */}
            </div>
        </div>
    )
}

export default Field