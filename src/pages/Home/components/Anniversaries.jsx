import React from 'react'


const Anniversaries = ({ data, loading }) => {
    if (loading) {
        return;
    }

    if ( data === undefined || !("calendar" in data)) return <></>

    const { calendar } = data

    return (
        <div className="mt-8 w-full bg-background rounded shadow-sm border border-borderc  p-5 transition-all duration-300 ">


            <div className="flex items-center mb-2 w-full">

                <h2 className="text-md text-center font-semibold text-primary">
                    {calendar.title.charAt(0).toUpperCase() + calendar.title.slice(1).toLowerCase()}
                </h2>
            </div>


            <div className="flex flex-col gap-4">
                {calendar.players?.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-indigo-400 mb-1 flex items-center gap-1">

                            Jugadores
                        </h3>
                        <ul className="space-y-1">
                            {calendar.players.map((player, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/60 backdrop-blur-md px-3 py-1 rounded-lg border border-gray-700  transition"
                                >
                                    <div class={"flex flex-col gap-[2px]"}>
                                        <span className="font-semibold  text-white">
                                            {player.name}
                                        </span>
                                        <span className="text-xs text-gray-300">
                                            ({player.team})
                                        </span>
                                    </div>
                                    <span className="text-xs text-indigo-200 ml-auto">
                                        {player.text.replace("hoy", "")}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {calendar.clubs?.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-indigo-400 mb-1 flex items-center gap-1">

                            Clubes
                        </h3>
                        <ul className="space-y-2">
                            {calendar.clubs.map((club, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2 text-sm text-gray-300 bg-gray-800/60 backdrop-blur-md px-3 py-1 rounded-lg border border-gray-700 transition"
                                >
                                    <div className="w-max font-semibold text-white">
                                        {club.name}
                                    </div>
                                    <span className="text-xs text-indigo-200 ml-auto">
                                        {club.text.replace("hoy", "")}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Anniversaries
