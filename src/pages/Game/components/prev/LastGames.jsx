import React from 'react'

const getString = (num) => {
    if (num === 0)
        return "P"
    else if (num === 1)
        return "G"
    else if (num === 2)
        return "E"
}
const getStringColor = (num) => {
    if (num === 0)
        return "text-red-500"
    else if (num === 1)
        return "text-green-500"
    else if (num === 2)
        return "text-yellow-500"
}

const LastGames = ({ game }) => {

    const recentForm = game.recent_form
    const teams = [
        {
            ...game.teams[0],
            recentForm: recentForm.home,
        },
        {
            ...game.teams[1],
            recentForm: recentForm.away,
        }
    ]


    return (
        <div class={"flex justify-center items-center flex-col gap-1 rounded p-1 "}>
            <div class={"w-full text-lg font-semibold text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>Ultimos Partidos</div>

            <div class={"flex flex-row  justify-between py-1 px-3 items-center w-full md:w-1/2"}>

                {
                    teams.map((team) => (
                        <div class={"flex flex-col gap-0"}>
                            <div class={"flex flex-col items-center gap-1 justify-center"}>
                                <img
                                    src={`https://api.promiedos.com.ar/images/team/${team.id}/1`}
                                    className="h-7 object-contain"
                                    alt="Escudo Equipo"
                                />
                                <div class={"font-semibold text-[12px]  text-shadow-xs text-shadow-black"}>{team.name}</div>
                            </div>

                            <div class={"flex flex-row-reverse items-center gap-1 justify-center"}>
                                {
                                    team.recentForm.map((result) => (
                                        <div class={`${getStringColor(result)}  text-shadow-xs text-shadow-black text-lg font-semibold `}>
                                            {getString(result)}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default LastGames