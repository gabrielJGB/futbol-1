import { usePlayer, usePlayerGames } from '@/hooks/usePlayer'
import { selectedTab } from '@/signals/player';
import injury from '@/assets/injury.png'
import Fade from '@mui/material/Fade';
import { CalendarDays, Info } from 'lucide-preact';
import { Loading } from '@/components/common';
import { Link } from 'preact-router';
import { getDisplayDateString, getURLDateString } from '@/utils/time';
import { useEffect, useMemo, useState } from 'preact/hooks';
import Slider from '@mui/material/Slider';


const LastGames = ({ name }) => {

    if (selectedTab.value != "principal")
        return;

    const { player } = usePlayer(name)


    const { games, isLoading, error } = usePlayerGames(player.id)


    if (isLoading)
        return (
            <div class={"w-full flex items-center justify-center"}>
                <Loading />
            </div>
        )

    // const games = player.lastMatches.games

    // @ts-ignore


    const sortedGames = games?.sort((a, b) => (new Date(b.game.startTime) - new Date(a.game.startTime)))


    return (
        <Fade in timeout={300}>
            <div class={"flex flex-col gap-1"}>
                <h2 class="text-[#C2E213] text-xl font-bold  tracking-wider mb-0 border-b border-[#C2E213]/30 pb-1">
                    Últimos partidos
                </h2>

                {/* <GamesStats games={games} name={name} /> */}


                <PlayerStatsCard games={games} name={name} />

                <div class={"flex flex-row flex-wrap gap-2"}>
                    {
                        sortedGames.map((item, i) => (
                            <div class={"bg-slate-800 rounded md:w-[49%] w-full self-start"}>
                                <div class={"flex flex-row items-center justify-center h-full border-[1px] rounded border-slate-700"}>
                                    <div class={"font-semibold text-shadow-xs w-[27px] text-center text-shadow-black rounded-l px-1  text-white"}>{i + 1}</div>
                                    <div class={"w-full"}>
                                        <Game game={{
                                            ...item.game,
                                            athleteStats: item.athleteStats,
                                            clubId: player.clubId,
                                            didNotPlayReason: item.didNotPlayReason,
                                            hasStats: item.hasStats,
                                            relatedCompetitor: item.relatedCompetitor
                                        }} />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fade>
    )
}




const Game = ({ game }) => {

    const { clubId, competitionDisplayName, homeCompetitor, awayCompetitor, shortStatusText, scores, startTime, athleteStats, didNotPlayReason, hasStats, relatedCompetitor } = game

    const tied = game.winner === -1
    const winner = relatedCompetitor === homeCompetitor.id && game.winner === 1 || relatedCompetitor === awayCompetitor.id && game.winner === 2
    const roundNum = game.roundNum
    const groupNum = game.groupNum
    const dateString = new Date(startTime)
    const dateRoute = getURLDateString(new Date(startTime))



    return (

        <div class={`grid grid-cols-26 gap-[1px]  bg-gray-600 text-white text-sm self-stretch`}>
            <div class={"col-span-26 flex flex-row  justify-between px-1 gap-1 text-center py-[2px] text-xs bg-gray-800"}>
                <div class={"text-start"}>{competitionDisplayName.replace("-", "|")}</div>
                <Link
                    // @ts-ignore
                    href={`/${dateRoute}`} class={`underline hover:cursor-pointer  w-max`}>
                    <div class={"w-max"}>
                        {
                            new Date(dateString)
                                .toLocaleDateString('es-ES', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })
                        }
                    </div>
                </Link>
            </div>

            <div class={"col-span-3 text-[11px] text-center flex items-center justify-center bg-black"}>
                {shortStatusText.replace("penaltis", "penales")}
            </div>

            <div class={`col-span-8 h-full flex flex-col border-transparent bg-gray-200 text-black items-center justify-center p-1`}>
                <img src={`https://imagecache.365scores.com/image/upload/f_png,w_34,h_34,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v1/Competitors/${homeCompetitor.id}`} style={{ height: 20, width: 20 }} alt="Team" />
                <div class={"text-center line-clamp-1 text-xs font-semibold"}>{homeCompetitor.name}</div>
            </div>

            <div class={` bg-white text-black  border-black col-span-2 flex items-center justify-center text-lg font-semibold p-2 space-x-1 ${homeCompetitor.isWinner && "border-b-[1px]"}`}>{scores[0]}</div>
            <div class={`col-span-2  bg-white text-black  border-black  flex items-center justify-center text-lg font-semibold p-2 space-x-1 ${awayCompetitor.isWinner && "border-b-[1px]"}`}>{scores[1]}</div>

            <div class={`col-span-8 h-full flex flex-col border-transparent bg-gray-200 text-black items-center justify-center p-1`}>
                <img src={`https://imagecache.365scores.com/image/upload/f_png,w_34,h_34,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v1/Competitors/${awayCompetitor.id}`} style={{ height: 20, width: 20 }} alt="Team" />
                <div class={"text-center line-clamp-1 text-xs font-semibold"}>{awayCompetitor.name}</div>
            </div>


            <div
                title={tied ? "Empate" : (winner ? "Victoria" : "Derrota")}
                style={{ borderColor: (tied ? "yellow" : (winner ? "#36b300" : "red")) }}
                class={`col-span-3 border-6 bg-zinc-900 text-white font-semibold text-center flex flex-row items-center justify-center`}
            >

                {tied ? "E" : (winner ? "V" : "D")}

            </div>
            <div class={"w-full flex flex-row justify-between col-span-26  bg-white px-4 "}>
                <div class={"col-span-26 bg-white px-1 py-[2px] h-full "}>
                    {
                        didNotPlayReason != undefined &&
                        <div class={"flex flex-row items-center gap-1"}>
                            {
                                didNotPlayReason === "Lesionado" ?
                                    <img src={injury} style={{ width: 20, height: 20 }} />
                                    :
                                    <Info color="black" size={20} />
                            }
                            <div class={"text-black text-xs"}>{
                                didNotPlayReason
                                    .replace("Suplente", "Banco de suplentes")
                                    .replace("Suspendido", "Fecha de suspensión")
                            }</div>
                        </div>
                    }
                    {
                        hasStats &&
                        <ul class={"col-span-26 list-disc list-inside flex flex-col h-full text-black text-xs "}>

                            {
                                groupNum != undefined &&
                                <li>Grupo {groupNum}</li>
                            }
                            {
                                roundNum != undefined &&
                                <li>Fecha {roundNum}</li>
                            }

                            {
                                Object.entries(athleteStats[0]).length > 0 &&
                                <li>{athleteStats[0].value} minutos jugados</li>
                            }

                            {
                                Object.entries(athleteStats[1]).length > 0 && athleteStats[1].type === 226 &&
                                <li>{athleteStats[1].value} {parseInt(athleteStats[1].value) === 1 ? "gol" : "goles"} </li>
                            }

                            {
                                Object.entries(athleteStats[2]).length > 0 && athleteStats[2].type === 225 &&
                                <li>{athleteStats[2].value} {parseInt(athleteStats[2].value) === 1 ? "asistencia" : "asistencias"}</li>
                            }

                            {
                                Object.entries(athleteStats[3]).length > 0 &&
                                <div>
                                    {
                                        athleteStats[3].type === 1 &&
                                        <li class={" flex flex-row items-center gap-1"}>
                                            <li>Amonestado</li>
                                            <div class={"w-[8px] h-[11px] bg-yellow-400 rounded-xs shadow-xs shadow-gray-800"}></div>
                                        </li>
                                    }
                                    {
                                        athleteStats[3].type === 2 &&
                                        <li class={"flex flex-row items-center gap-1"}>
                                            <li> Expulsado</li>
                                            <div class={"w-[8px] h-[11px] bg-red-600 rounded-xs shadow-xs shadow-gray-800"}></div>
                                        </li>
                                    }
                                </div>
                            }
                        </ul>
                    }

                </div>

                {

                    hasStats && Object.entries(athleteStats[4]).length > 0 &&

                    <div class={"flex flex-col justify-center items-center gap-0 bg-white pt-1"}>
                        <div
                            style={{ backgroundColor: athleteStats[4].bgColor, color: (athleteStats[4].bgColor === "#FFC107" ? "black" : "white") }}
                            class={"px-2 py-0 text-xs w-min rounded  font-semibold"}
                        >
                            {athleteStats[4].value}
                        </div>
                        <div class={"text-xs font-semibold text-black"}>Puntuación </div>
                    </div>
                }


            </div>
        </div>

    )
}




const Num = ({ num, color = "#C2E213" }) => {
    return <span style={{ color }} className="md:text-lg text-[15px] font-bold not-italic">{num}</span>
}

function PlayerStatsCard({ games, name }) {

    const [gameCount, setGameCount] = useState(games.length)
    const [stats, setStats] = useState(getStats(games))

    useEffect(() => {
        setStats(getStats(games.slice(0, gameCount)))
    }, [gameCount])

    const avgMinutes = stats.played > 0
        ? (stats.minutes / stats.played).toFixed(1)
        : 0;

    const avgRating = stats.ratingGamesCount > 0
        ? (stats.rating / stats.ratingGamesCount).toFixed(2)
        : 0;

    const avgGoals = stats.played > 0 ? (stats.goals / stats.played).toFixed(2) : 0
    const avgAssists = stats.played > 0 ? (stats.assists / stats.played).toFixed(2) : 0

    const lastGameDate = new Date(games?.slice(0, gameCount).slice(-1)[0]?.game?.startTime)
        .toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })

    const currentDate = new Date().toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })



    const playerTeams = Object.entries(games?.slice(0, gameCount).filter(g => g.played).map(item => {
        return item.relatedCompetitor === item.game.homeCompetitor.id ? item.game.homeCompetitor.name : item.game.awayCompetitor.name
    }).reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {}))



    return (
        <div className="w-full mx-auto bg-[#0e3e1d]/40 text-white p-2 my-2 rounded-sm shadow-xl leading-relaxed">

            <div class={"mb-1 flex flex-col  items-start justify-start font-light "}>
                <div>
                    De los últimos <span className="text-orange-400 font-bold not-italic">{stats.totalGames}</span> partidos, <span class={"font-semibold"}>{name}</span>:
                </div>
                <div class={"md:w-[40%] w-[100%] px-4"}>
                    <Slider
                        min={1}
                        max={games.length}
                        color="warning"
                        value={gameCount}
                        onChange={(e, n) => {

                            // @ts-ignore
                            setGameCount(e.target.value)
                        }} />
                </div>

            </div>


            <div class={"flex flex-col md:gap-1 gap-3 text-sm pb-2 px-2 md:text-base text-gray-200"}>

                <div class={"flex flex-row items-center gap-1"}>
                    <CalendarDays size={15} color='white' />
                    <p class={"text-xs font-light "}>
                        {lastGameDate} - {currentDate}
                    </p>
                </div>

                <p class={"md:text-md text-sm leading-5 font-light"}>
                    <span class={"font-bold"}>•</span> Jugó  {
                        playerTeams.map((team, i) => (
                            <>
                                <Num num={team[1]} /> con <span class={"font-semibold"}>
                                    {team[0]}</span> {i != playerTeams.length - 2 ? ", " : "y "}
                            </>
                        ))
                    }
                </p>


                <p class={"md:text-md text-sm leading-5 font-light"}>
                    <span class={"font-bold"}>•</span> Fué titular en <Num num={stats.played} /> ocasiones, suplente  en <Num num={stats.gamesBench} />, tuvo <Num num={stats.gamesInjury} />  bajas por lesión y cumplió <Num num={stats.gamesSuspended} /> fechas de suspensión
                </p>


                <p class={"md:text-md text-sm leading-5 font-light"}>
                    <span class={"font-bold"}>•</span> Obtuvo <Num num={stats.won} /> victorias, <Num num={stats.tied} /> empates y <Num num={stats.lost} /> derrotas
                </p>

                <p class={"md:text-md text-sm leading-5 font-light"}>
                    <span class={"font-bold"}>•</span> Convirtió <Num num={stats.goals} /> goles y dió <Num num={stats.assists} /> asistencias, con un promedio de <Num num={avgGoals} /> goles y <Num num={avgAssists} /> asistencias por partido.
                </p>


                <p class={"md:text-md text-sm leading-5 font-light"}>
                    <span class={"font-bold"}>•</span> Jugó <Num num={stats.minutes} /> minutos, promediando <Num num={avgMinutes} /> minutos por partido.
                </p>

                <p class={"md:text-md text-sm leading-5 font-light"}>
                    <span class={"font-bold"}>•</span> Recibió  <Num num={stats.redCards} /> tarjetas rojas y  <Num num={stats.yellowCards} /> tarjetas amarillas
                </p>

                <p class={"md:text-md text-sm leading-5 font-light"}>
                    <span class={"font-bold"}>•</span> Su puntuación promedio es <Num num={avgRating} />
                </p>

                {
                    stats.gamesNoStats > 0 &&
                    <p class={"text-xs text-gray-500 "}>
                        {"("}{stats.gamesNoStats} partidos sin estadísticas disponibles{")"}
                    </p>
                }


            </div>




        </div>
    );
}




const getStats = (games) => {
    return games.slice(0).reduce((acc, item) => {

        acc.totalGames++
        acc.played += item.played ? 1 : 0

        if (item.played) {
            const tied = item.game.winner === -1
            const winner = item.relatedCompetitor === item.game.homeCompetitor.id && item.game.winner === 1 || item.relatedCompetitor === item.game.awayCompetitor.id && item.game.winner === 2

            if (tied)
                acc.tied++
            else if (winner)
                acc.won++
            else
                acc.lost++
        }

        if (item.hasStats) {
            acc.minutes += Number(item.athleteStats[0].value || 0)

            if (item.athleteStats[1] != {} && item.athleteStats[1].type === 226)
                acc.goals += Number(item.athleteStats[1].value)

            if (item.athleteStats[2] != {} && item.athleteStats[2].type === 225)
                acc.assists += Number(item.athleteStats[2].value)

            if (item.athleteStats[3] != {} && item.athleteStats[3].type === 1)
                acc.yellowCards += 1

            if (item.athleteStats[3] != {} && item.athleteStats[3].type === 2)
                acc.redCards += 1

            if (item.athleteStats[4] != {} && item.athleteStats[4].value != undefined && item.athleteStats[4].value != "-" && item.athleteStats[4].value != "") {

                acc.ratingGamesCount += 1
                acc.rating += Number(item.athleteStats[4].value)
            }
        }
        else {
            if (item.didNotPlayReason === "Lesionado")
                acc.gamesInjury++

            if (item.didNotPlayReason === "Suplente")
                acc.gamesBench++

            if (item.didNotPlayReason === "Suspendido")
                acc.gamesSuspended++
            if (item.didNotPlayReason === "Estadísticas no disponibles")
                acc.gamesNoStats++
        }
        return acc

    }, { tied: 0, won: 0, lost: 0, gamesInjury: 0, gamesBench: 0, gamesSuspended: 0, rating: 0, ratingGamesCount: 0, played: 0, minutes: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0, totalGames: 0, gamesNoStats: 0 })
}






export default LastGames