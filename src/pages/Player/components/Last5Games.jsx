import React from 'react'
import SectionTitle from './SectionTitle';

const Last5Games = ({ title, stats, events, eventsInfo }) => {

    if (!events || !stats )
        return;

    const getResultColor = r => r === "G" ? "bg-green-400" : r === "P" ? "bg-red-400" : "bg-yellow-300";

    return (
        <div class={"flex flex-col w-full"}>

            <SectionTitle title={title} />

            <div class=" text-white rounded overflow-x-auto">

                <table class={"shadow  shadow-gray-900 bg-gray-500 w-auto  border-separate border-spacing-[2px] rounded"} >
                    <thead>
                        <tr class="bg-black text-[#C2E213] uppercase  text-xs">
                            <th class="p-1 text-center">Fecha</th>
                            <th class="py-1 px-4 text-center">Rival</th>
                            <th class="p-1  text-center">Resultado</th>
                            <th class="p-1  text-center">Competición</th>
                            {stats?.displayNames?.map((n, i) => (
                                <th key={i} class=" p-1 text-center text-xs ">
                                    {n}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {events?.map((event, i) => {
                            const info = eventsInfo[event.eventId];
                            if (!info) return null;

                            const date = new Date(info.gameDate).toLocaleDateString("es-AR", {
                                day: "2-digit",
                                month: "short",
                            });

                            return (
                                <tr class={`border-b border-[#333] ${i % 2 === 0 ? "bg-gray-300" : "bg-gray-400"}`}>
                                    <td class="px-2 text-black text-xs font-semibold ">{date}</td>
                                    <td title={info.opponent.displayName} class=" flex flex-row justify-center items-center   text-black gap-0">
                                        <img src={info.opponent.logo} alt="logo" class="w-8" />
                                        <a
                                            href={info.links.find((l) => l.rel.includes("summary"))?.href}
                                            target="_blank"
                                            class="hover:underline text-xs w-max"
                                        >
                                            {info.opponent.abbreviation}
                                        </a>
                                    </td>
                                    <td class={`p-1 text-2xl   text-center font-bold text-black  ${getResultColor(info.gameResult)}`}>
                                        {info.score}
                                    </td>
                                    <td class="px-2  py-0 text-xs text-center text-black ">{info.leagueShortName}</td>
                                    {event.stats.map((s, i) => (
                                        <td key={i} class="px-2 text-center  text-black">
                                            {s}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Last5Games