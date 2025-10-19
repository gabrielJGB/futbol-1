import React from 'react'
import { scrollToSection } from '../../../utils/helper'

const Tabs = ({ tabs }) => {
    return (
        <div class={"w-full"}>
            <div class={"overflow-x-auto  z-100 fixed bottom-0 flex flex-row items-center gap-1 w-full bg-black/90 backdrop-blur-sm"}>
                {
                    tabs?.map((tab, i) => (
                        <div
                            onClick={()=>{ 
                                console.log(tab)
                                scrollToSection(tab.ref) }}
                            class={"text-white truncate hover:text-[#C2E213] cursor-pointer px-1 py-4 text-center "}>
                            {tab.title}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Tabs