// @ts-nocheck
import { usePlayer, usePlayerStats } from '@/hooks/usePlayer'
import { selectedTab } from '@/signals/player';
import Fade from '@mui/material/Fade';
import { useState } from 'preact/hooks'

const Stats = ({ name }) => {

    if (selectedTab.value != "estadisticas")
        return;

    const { player } = usePlayer(name)
    const [selectedSeason, setSelectedSeason] = useState("-1")
    const availableSeasons = player.careerStats.seasons.map((s) => ({ key: s.key, name: s.name }))
    // const stats = player.careerStats.seasons[0].stats


    const { data, isLoading, error } = usePlayerStats(player.id, selectedSeason)




    if (isLoading)
        return <div>Cargando tabla....</div>

    if (error)
        return <div>Error al obtener datos</div>


    const stats = data.stats



    return (
        <Fade in timeout={300}>
            <div class={"flex flex-col gap-1"}>

                <h2 class="text-[#C2E213] text-xl font-bold  tracking-wider mb-2 border-b border-[#C2E213]/30 pb-1">
                    Estadísticas
                </h2>
                <div class={" mx-0 overflow-x-auto"}>

                    <select class={"mb-2 cursor-pointer bg-b2/40 p-2 rounded"} value={selectedSeason} onChange={(x) => setSelectedSeason(x.target.value)}>
                        {
                            availableSeasons.map((item) => (
                                <option class={"text-black"} value={item.key}>{item.name}</option>

                            ))
                        }
                    </select>

                    {
                        stats &&
                        stats.categories.map((cat, i) => (
                            <div class={"flex flex-col mb-2"}>
                                <div class={"flex flex-row items-center gap-1 mb-2"}>
                                    {
                                        false && cat.competitorId != undefined &&
                                        getImgElement(cat.competitorId, "team", 18)
                                    }
                                    <div class={"text-sm  uppercase font-semibold "}>{cat.name}</div>
                                </div>
                                <Table cols={stats.tables[i].columns} rows={stats.tables[i].rows} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fade>
    )
}

export default Stats



const Table = ({ cols, rows }) => {

    return (
        <table class={"md:w-auto min-w-full bg-gray-500  border-separate border-spacing-[1px] "} >
            <thead>
                <tr class="bg-black text-[#C2E213]   text-sm">
                    <th class={"px-18"}>Liga</th>
                    {
                        cols.map((col) => (
                            <th class={"text-xs px-1 py-2"}>{col.shortName.replace("Tarjetas", "").replace("Formación", "Titular")}</th>
                        ))
                    }
                </tr>
            </thead>

            <tbody>

                {
                    rows.map((row) => (
                        <tr class={`text-black  text-sm border-b border-[#333] even:bg-[#E7E7E7] odd:bg-[#D5D5D5]`}>
                            <td class={"p-1 "} title={row.title}>
                                <div class={"flex flex-row  gap-2 justify-start items-center "}>
                                    {getImgElement(row.entityId, "league", 30)}
                                    <div class={"text-xs line-clamp-2 "}>{row.title}</div>
                                </div>
                            </td>
                            {
                                row.values.map((val) => (
                                    <td class={"text-center font-mono"}>{val.value}</td>
                                ))
                            }
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

const getImgElement = (id, type, size = 30) => {

    const urls = {
        "team": "https://imagecache.365scores.com/image/upload/f_png,w_34,h_34,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v1/Competitors/",
        "league": "https://imagecache.365scores.com/image/upload/f_png,w_24,h_24,c_limit,q_auto:eco,dpr_3,d_Countries:Round:10.png/v5/Competitions/",
    }

    const url = `${urls[type]}${id}`

    return <img src={url} width={size} height={size} class={"drop-shadow-xs drop-shadow-black"} />


}