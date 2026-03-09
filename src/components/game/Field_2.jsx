import React from 'react'
import { useEffect, useState } from "preact/hooks";
import goal from '@/assets/goal.png'
import ownGoal from '@/assets/own-goal.png'
import arrowIn from '@/assets/arrow-in.png'
import arrowOut from '@/assets/arrow-out.png'
import { BiChevronLeft, BiChevronLeftCircle, BiChevronRight } from 'react-icons/bi';
import { Link } from 'preact-router/match';

const Field2 = ({ teams, colors, ids, invertLines, setInvertLines }) => {

    const [homeLines, setHomeLines] = useState([])
    const [awayLines, setAwayLines] = useState([])
    const [showFlags, setShowFlags] = useState(false)
    const [showNumber, setShowNumber] = useState(true)
    const bench = [teams[0].bench, teams[1].bench]
    const formations = [teams[0].formation, teams[1].formation]


    const getPlayerElement = (player, i) => {


        return (
            <div
                class={" active:underline  flex flex-row  items-center justify-center  text-white text-xs font-bold z-10 "}>

                <BiChevronRight color='lime' size={20} class={"min-w-min drop-shadow-xs drop-shadow-black "} />



                <div

                    style={{
                        backgroundColor: !showFlags ? colors[i].color : "",
                        color: !showFlags ? colors[i].text_color : "",
                        backgroundImage: showFlags ? `url('https://api.promiedos.com.ar/images/country/${player.country_id}/1')` : ""
                    }}

                    class={`${showFlags ?

                        `bg-no-repeat w-[20px] h-[20px] drop-shadow-black drop-shadow-xs bg-contain mr-1`

                        :

                        "border-[2px] mr-[2px]  border-gray-900 rounded-lg font-bold w-[20px] h-[20px]  shadow-xs shadow-gray-800"}
                        
                        z-0 relative flex justify-center items-center font-bold  text-shadow-black 

                        ${showFlags ? " text-[12px]  text-shadow-md" : "text-[11px]  text-shadow-xs"}

                        `}>

                    {showNumber && player.jersey_num}
                </div>


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
                                    <img src={goal} class={"md:w-[12px] w-[9px] min-w-[9px]"} />
                                ))
                            }
                            {
                                Array.from({ length: player.events.goals.own_goals }).map((_, i) => (
                                    <img src={ownGoal} class={" md:w-[12px] w-[9px] min-w-[9px]"} />
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




    if (teams) {
        let home = teams[0]
        let away = teams[1]

        let homeStarting = home.starting
        let awayStarting = away.starting




        let homeFormation = home.formation?.split("-").map(x => parseInt(x))
        homeFormation.unshift(1)
        const h = homeFormation.map((playerLength, i) => {
            return homeStarting.splice(0, playerLength)
        })

        setHomeLines(h)


        let awayFormation = away.formation?.split("-").map(x => parseInt(x))
        awayFormation.unshift(1)
        const a = awayFormation.map((playerLength, i) => {
            return awayStarting.splice(0, playerLength)
        })

        setAwayLines(a)


    }








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

            <FieldOptions
                setShowFlags={setShowFlags}
                showFlags={showFlags}
                setInvertLines={setInvertLines}
                invertLines={invertLines}
                setShowNumber={setShowNumber}
                showNumber={showNumber}
            />

            <div class={"grid grid-cols-2 bg-[url('/fieldbg.png')] bg-repeat md:w-full w-[200vw]  shadow-xs shadow-gray-950   md:h-[450px] h-[420px] relative rounded-lg"}>

                {/* <FieldLinesDrawing /> */}

                <FormationString
                    ids={ids}
                    formations={formations}
                    invertLines={invertLines}
                />

                {
                    [homeLines, awayLines].map((teamLines, i) => (

                        <div class={`${i === 0 ? (invertLines ? "col-start-2 flex-row-reverse" : "col-start-1 flex-row") : (invertLines ? "col-start-1 flex-row" : "col-start-2 flex-row-reverse")} row-start-1 justify-around mx-auto flex w-full h-full`}>
                            {
                                teamLines.map((line) => (
                                    <div class={`flex ${i === 0 ? (invertLines ? "flex-col-reverse" : "flex-col") : (invertLines ? "flex-col" : "flex-col-reverse")} justify-evenly items-center`}>
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

                                                            {
                                                                Array.from({ length: player.events.goals.own_goals }).map((_, i) => (
                                                                    <img src={ownGoal} class={" md:w-[12px] w-[9px] min-w-[9px]"} />
                                                                ))
                                                            }
                                                        </div>
                                                    }






                                                    <div
                                                        style={{
                                                            backgroundColor: !showFlags ? colors[i].color : "",
                                                            color: !showFlags ? colors[i].text_color : "",
                                                            backgroundImage: showFlags ? `url('https://api.promiedos.com.ar/images/country/${player.country_id}/1')` : ""
                                                        }}


                                                        class={`${showFlags ? ` z-0 relative flex   justify-center items-center text-[16px] md:text-[18px] font-bold  bg-no-repeat w-[38px] h-[38px] drop-shadow-black drop-shadow-xs bg-contain` : `z-0 relative flex  border-[2px] border-gray-900 justify-center items-center rounded-lg text-[16px] md:text-[18px] font-bold w-[36px] h-[36px] shadow-xs shadow-gray-800`} `}

                                                    >
                                                        {
                                                            ids[i] === "igg" && !showFlags &&
                                                            <div style="position: absolute"><div class="-z-10 bg-blue-800 h-[8px] w-[32px] rounded-t-[6px]"></div><div class="bg-[#eac807] h-[15px] w-[32px] "></div><div class="bg-blue-800 h-[9px] w-[32px] rounded-b-[6px]"></div></div>
                                                        }

                                                        {
                                                            showNumber &&
                                                            <span
                                                                style={{ color: ids[i] === "igg" ? (showFlags ? "white" : "black") : (showFlags ? "white" : colors[i].text_color) }}
                                                                class={`${showFlags ? "text-white text-shadow-lg" : "text-shadow-xs text-black"} text-shadow-[#00000085]  z-20`}>
                                                                {player.jersey_num}
                                                            </span>

                                                        }


                                                    </div>



                                                    <Link
                                                        // @ts-ignore
                                                        href={`/player/${player.name}`}
                                                        title={player.name}
                                                        style={{ textShadow: "black 1px 1px 3px", }}
                                                        class={`hover:underline active:underline ${getPlayerNameColor(player, "substitution" in player)} flex flex-row items-center justify-center gap-0  text-center text-[14px]`}>

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







const FieldOptions = ({ showFlags, invertLines, showNumber, setShowFlags, setShowNumber, setInvertLines }) => (
    <div class={"flex flex-row items-center gap-3 select-none"}>

        <label htmlFor="flags" class={"text-xs mb-1"}>
            <input id={"flags"} name="flags" type="checkbox" checked={showFlags} onChange={() => setShowFlags(!showFlags)} />
            <span class={"pl-1 "}>Banderas</span>
        </label>


        <label htmlFor="invert" class={"text-xs mb-1"}>
            <input id={"invert"} name="flags" type="checkbox" checked={invertLines} onChange={() => setInvertLines(!invertLines)} />
            <span class={"pl-1 "}>Invertir</span>
        </label>

        <label htmlFor="jersey" class={"text-xs mb-1"}>
            <input id={"jersey"} name="flags" type="checkbox" checked={showNumber} onChange={() => setShowNumber(!showNumber)} />
            <span class={"pl-1 "}>Numeros</span>
        </label>

    </div>
)


const FormationString = ({ formations, invertLines, ids }) => (
    <>
        {
            formations.map((item, i) => (
                <div class={`absolute flex gap-1 top-1 ${i === 0 ? (invertLines ? "right-1 flex-row-reverse" : "left-1 flex-row") : invertLines ? "left-1 flex-row" : "right-1 flex-row-reverse"} `}>
                    <img src={`https://api.promiedos.com.ar/images/team/${ids[i]}/1`} alt="Escudo Equipo" class="drop-shadow-xs drop-shadow-black size-6 object-contain" />
                    <div class={` font-semibold  text-shadow-xs text-shadow-black text-sm`}>{item}</div>
                </div>
            ))
        }
    </>
)