import { usePlayer } from '@/hooks/usePlayer'
import { selectedTab } from '@/signals/player';
import Fade from '@mui/material/Fade';
import React from 'react'

const Transfers = ({ name }) => {

    if (selectedTab.value != "transferencias")
        return;


    const { player } = usePlayer(name)

    if (player.transfers === undefined)
        return <></>

    const transfers = player.transfers


    return (
        <Fade in timeout={300}>
            <div class=" text-white  font-sans ">
                <h2 class="text-[#C2E213] text-xl font-bold  tracking-wider mb-6 border-b border-[#C2E213]/30 pb-1">
                    Trayectoria
                </h2>

                <div class="flex flex-col-reverse gap-y-4 relative border-l border-white/10  pl-6 md:mx-auto md:w-1/2">
                    {transfers.map((transfer, index) => (
                        <div key={index} class="relative">

                            <div
                                class={`absolute -left-[31px] w-4 h-4 rounded-full border-2 border-[#0e3e1d] ${transfer.active ? 'bg-[#C2E213] shadow-[0_0_8px_#C2E213]' : 'bg-gray-500'
                                    }`}
                            />

                            <div class={`md:p-3  p-2 rounded-sm border ${transfer.active ? 'border-[#C2E213]/50 bg-[#0e3e1d]' : 'border-white/5 bg-[#0e3e1d]'}`}>
                                <div class="flex items-center justify-between gap-4">
                                    <div class="flex items-center gap-3">

                                        {getImgElement(transfer.competitorId, "team")}


                                        <div>
                                            <p class="text-[10px] uppercase text-white font-bold leading-none mb-0">
                                                {formatDate(transfer.date)}
                                            </p>
                                            <h3 class={`font-bold text-sm ${transfer.active ? 'text-[#C2E213]' : 'text-white'}`}>
                                                {transfer.active && <span class="ml-2 text-[9px] bg-[#C2E213] text-[#0e3e1d] px-1 py-0.5 uppercase">Actual</span>}
                                            </h3>
                                        </div>
                                    </div>

                                    <div class="text-right">
                                        <span class="text-[11px] font-medium block text-gray-200">
                                            {transfer.transferTitle || "Fichaje"}
                                        </span>
                                        {transfer.price && (
                                            <span class="text-[10px] text-[#C2E213] block italic">
                                                {transfer.price}
                                            </span>
                                        )}
                                    </div>
                                </div>


                                {transfer.contractUntil && (
                                    <div class="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                                        <span class="text-[10px] text-gray-400 uppercase">Contrato hasta</span>
                                        <span class="text-[11px] font-mono text-white">{transfer.contractUntil.split(' ')[0]}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fade>
    )
}

export default Transfers




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


const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long'
    });
};