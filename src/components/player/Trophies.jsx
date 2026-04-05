import { usePlayer } from '@/hooks/usePlayer';
import { selectedTab } from '@/signals/player';
import Fade from '@mui/material/Fade';
import { useState } from 'preact/hooks';


const Trophies = ({ name }) => {

    if (selectedTab.value != "trofeos")
        return;


    const [showStats, setShowStats] = useState(false)
    const { player } = usePlayer(name)

    if (player.trophies === undefined)
        return <></>;

    const data = player.trophies


    return (
        <Fade in timeout={300}>
            <div class=" text-white  font-sans">
                {data.categories.map((category) => (
                    <section key={category.type} class="mb-6">
                        <h2 class="text-[#C2E213] text-xl font-bold  tracking-wider mb-3 border-b border-[#C2E213]/30 pb-1">
                            {category.name}
                        </h2>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {category.trophies.map((trophy) => (
                                <div
                                    key={trophy.competitionId}
                                    class="bg-[#0e3e1d] border border-white/10 rounded-sm md:p-3 p-2 flex flex-col justify-between"
                                >

                                    <div class="flex items-start gap-3 mb-1">
                                        {getImgElement(trophy.competitionId, "trophy", 40)}

                                        <div class="flex-1">
                                            <h3 class="font-bold text-sm leading-tight">{trophy.displayName}</h3>
                                            <div class="flex items-center justify-between gap-2 mt-1">
                                                <span class="bg-[#C2E213] text-[#0e3e1d] text-sm font-bold px-1 py-0 rounded-sm">
                                                    x{trophy.count}
                                                </span>
                                                {
                                                    trophy.stats && trophy.stats.rows && trophy.stats.rows.length > 0 &&
                                                    <span
                                                        onClick={() => { setShowStats(prev => !prev) }}
                                                        class={"cursor-pointer w-[25px] rounded text-center bg-black/20 hover:bg-black/50"}
                                                    >{showStats ? "-" : "+"}</span>
                                                }
                                            </div>
                                        </div>
                                    </div>


                                    {trophy.stats && trophy.stats.rows && trophy.stats.rows.length > 0 && (
                                        <div class={`${showStats ? "block" : "hidden"}  border-t border-white/5`}>
                                            {trophy.stats.rows.map((row) => (
                                                <div class="flex flex-col gap-2 text-[11px] ">
                                                    <div class="flex items-center gap-2 mt-2">
                                                        {getImgElement(row.entityId, "team", 20)}

                                                        <span class="font-medium text-gray-200">{row.title} ({row.secondaryTitle})</span>
                                                    </div>

                                                    <div class="grid grid-cols-3 gap-1 bg-white/5 p-1.5 rounded-sm">
                                                        {row.values.map((stat) => {
                                                            const colName = trophy.stats.columns.find(c => c.num === stat.columnNum)?.name;
                                                            return (
                                                                <div class="text-center">
                                                                    <p class="text-[9px] uppercase text-gray-400 leading-none mb-1">{colName}</p>
                                                                    <p class="font-bold text-[#C2E213]">{stat.value}</p>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </Fade>
    )
}

export default Trophies


const getImgElement = (id, type, size = 30) => {

    const urls = {
        "team": "https://imagecache.365scores.com/image/upload/f_png,w_34,h_34,c_limit,q_auto:eco,dpr_2,d_Competitors:default1.png/v1/Competitors/",
        "player": "https://imagecache.365scores.com/image/upload/f_png,w_80,h_80,c_limit,q_auto:eco,dpr_2,d_Athletes:default.png,r_max,c_thumb,g_face,z_0.65/Athletes/",
        "flag": "https://imagecache.365scores.com/image/upload/f_png,w_40,h_40,c_limit,q_auto:eco,dpr_3,d_Competitors:default1.png/v15/Competitors/",
        "trophy": "https://imagecache.365scores.com/image/upload/f_png,w_40,h_40,c_limit,q_auto:eco,dpr_3,d_Competitions:Trophies:default.png//Competitions/Trophies/"
    }


    const url = `${urls[type]}${id}`

    return <img src={url} width={size} height={size} class={"drop-shadow-xs drop-shadow-black"} />


}
