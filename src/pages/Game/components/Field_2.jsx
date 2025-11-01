import React from 'react'
import { useEffect, useState } from "preact/hooks";
import goal from '../../../assets/goal.png'
import arrowIn from '../../../assets/arrow-in.png'
import arrowOut from '../../../assets/arrow-out.png'
import { BiChevronLeft, BiChevronLeftCircle, BiChevronRight } from 'react-icons/bi';
import { Link } from 'preact-router/match';

const Field2 = ({ teams, colors, ids }) => {

    const [homeLines, setHomeLines] = useState([])
    const [awayLines, setAwayLines] = useState([])
    const bench = [teams[0].bench, teams[1].bench]
    const formations = [teams[0].formation, teams[1].formation]


    const getPlayerElement = (player, i) => {


        return (
            <div
                class={" active:underline  flex flex-row  items-center justify-center  text-white text-xs font-bold z-10 "}>

                <BiChevronRight color='lime' size={20} class={"min-w-min drop-shadow-xs drop-shadow-black "} />

                <div
                    style={{ backgroundColor: colors[i].color, color: colors[i].text_color }}
                    class={"flex border-[2px] mr-[2px] border-gray-900 justify-center items-center rounded-lg text-[10px] md:text-[12px] font-bold  py-[0px] w-[20px] h-min  shadow-xs shadow-gray-800"}>{player.jersey_num}</div>


                <Link
                    // @ts-ignore
                    href={`/player/${player.name}`}
                    title={player.name}
                    style={{ textShadow: "black 1px 1px 3px", }}
                    class={`hover:underline active:underline ${getPlayerNameColor(player)} flex flex-row items-center gap-1 max-w-[100px] text-center text-[11px]  px-[0px]`}>{player.player_short_name}{player.is_captain ? " (C)" : ""}


                    {
                        "events" in player &&
                        <div class={"ml-[2px] flex flex-row items-center gap-[1px]"}>
                            {
                                Array.from({ length: player.events.goals.goals }).map((_, i) => (
                                    <img src={goal} class={"md:w-[9px] w-[9px] min-w-[9px]"} />
                                ))
                            }
                        </div>
                    }

                </Link>

            </div>
        )

    }

    const getPlayerNameColor = (p, isSub) => {



        if ("events" in p && "cards" in p.events && p.events.cards) {
            if (p.events.cards.red)
                return "text-[#ff0000]"
            else if (p.events.cards.yellow)
                return "text-[#ffff19]"
            else
                return "text-white"
        } else
            return "text-white"
    }


    useEffect(() => {

        if (teams) {
            let home = teams[0]
            let away = teams[1]

            let homeStarting = home.starting
            let homeFormation = home.formation?.split("-").map(x => parseInt(x))
            homeFormation.unshift(1)
            setHomeLines(homeFormation.map((playerLength, i) => {
                return homeStarting.splice(0, playerLength)
            }))


            let awayStarting = away.starting
            let awayFormation = away.formation?.split("-").map(x => parseInt(x))

            awayFormation.unshift(1)
            setAwayLines(awayFormation.map((playerLength, i) => {
                return awayStarting.splice(0, playerLength)
            }))
        }


    }, [teams])





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
            <div class={"grid grid-cols-2 bg-[url('/fieldbg.png')] bg-repeat md:w-full w-[200vw]  shadow-xs shadow-gray-950   md:h-[450px] h-[420px] relative rounded-lg"}>

                {/* <div className="relative w-full shadow  shadow-gray-800 rounded h-full   overflow-hidden"
            > */}
                <div className="absolute left-0 top-1/6 w-1/6 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-0 bottom-1/6 w-1/6 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-0 top-1/3 w-1/14 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-0 bottom-1/3 w-1/14 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-1/14 top-1/3 h-4/12 border-l-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-1/6 top-1/6 h-4/6 border-l-4  border-gray-400 pointer-events-none "></div>
                <div className="absolute right-1/6 top-1/6 h-4/6 border-l-4  border-gray-400 pointer-events-none"></div>
                <div className="absolute inset-0 border-4 rounded border-gray-400 pointer-events-none"></div>
                <div className="absolute left-1/2 top-0 h-full border-l-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-4 border-gray-400 rounded-full pointer-events-none"></div>
                <div className="absolute right-0 top-1/3 w-1/14 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute right-0 bottom-1/3 w-1/14 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute right-1/14 top-1/3 h-4/12 border-l-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute right-0 top-1/6 w-1/6 border-b-4 border-gray-400 pointer-events-none"></div>
                <div className="absolute right-0 bottom-1/6 w-1/6 border-b-4 border-gray-400 pointer-events-none"></div>


                {
                    formations.map((item, i) => (
                        <div class={`${i === 0 ? "left-2" : "right-2"} font-semibold absolute top-1 text-shadow-xs text-shadow-black text-sm`}>{item}</div>
                    ))
                }

                {
                    [homeLines, awayLines].map((teamLines, i) => (

                        <div class={`${i === 0 ? "col-start-1 flex-row" : "col-start-2 flex-row-reverse"} justify-around mx-auto flex w-full h-full`}>
                            {
                                teamLines.map((line) => (
                                    <div class={`flex ${i === 0 ? "flex-col" : "flex-col-reverse"} justify-evenly items-center`}>
                                        {
                                            line.map(player => (
                                                <div

                                                    className="flex flex-col  items-center justify-center  text-white text-xs font-bold z-10 "
                                                >

                                                    {
                                                        "events" in player &&
                                                        <div class={"flex flex-row items-center gap-[1px] mb-[1px]"}>
                                                            {
                                                                Array.from({ length: player.events.goals.goals }).map((_, i) => (
                                                                    <img src={goal} class={"md:w-[12px] w-[10px] "} />
                                                                ))
                                                            }
                                                        </div>
                                                    }

                                                    <div
                                                        style={{ backgroundColor: colors[i].color, color: colors[i].text_color }}
                                                        class={"z-0 relative flex  border-[2px] border-gray-900 justify-center items-center rounded-lg text-[16px] md:text-[18px] font-bold w-[36px] h-[36px] shadow-xs shadow-gray-800"}

                                                    >
                                                        {
                                                            ids[i] === "igg" &&
                                                            <div style="position: absolute"><div class="-z-10 bg-blue-800 h-[8px] w-[32px] rounded-t-[6px]"></div><div class="bg-[#eac807] h-[15px] w-[32px] "></div><div class="bg-blue-800 h-[9px] w-[32px] rounded-b-[6px]"></div></div>
                                                        }

                                                        <span
                                                            style={{ color: ids[i] === "igg" ? "black" : colors[i].text_color }}
                                                            class={`text-shadow-xs text-black z-20`}>{player.jersey_num}</span>

                                                    </div>

                                                    <Link
                                                        // @ts-ignore
                                                        href={`/player/${player.name}`}
                                                        title={player.name}
                                                        style={{ textShadow: "black 1px 1px 3px", }}
                                                        class={`hover:underline active:underline ${getPlayerNameColor(player, "substitution" in player)} flex flex-row items-center justify-center gap-0  text-center text-[14px]  px-[0px]`}>

                                                        {"substitution" in player &&
                                                            <BiChevronLeft class={"min-w-min drop-shadow-xs drop-shadow-black "} color='red' size={20} />
                                                        }{player.player_short_name}{player.is_captain ? " (C)" : ""}
                                                        {
                                                            "substitution" in player && <div class={"w-[10px]"}></div>
                                                        }

                                                    </Link>


                                                    {
                                                        "substitution" in player &&

                                                        getPlayerElement(bench[i].find(item => item.jersey_num === player.substitution.player), i)

                                                    }

                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Field2