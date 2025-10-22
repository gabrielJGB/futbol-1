import React from 'react'
import { useState } from "preact/hooks";
import Menu from '../../components/Menu'

const Team = ({ id }) => {
  const [menuVisible, setMenuVisible] = useState(false)


  return (
    <div class={"relative grid grid-cols-2 p-10 gap-20"}>
      <div class={`bg-[rgba(0,0,0,0.9)]  md:static   md:-left-auto  fixed md:w-[250px] w-full   top-0 ${menuVisible ? "-left-[0%]" : "-left-[100%]"} transition-all`}>
        <Menu />
      </div>

      <div>TEAM {id}</div>

      <div class={"flex flex-row justify-between w-full md:hidden fixed bottom-0"}>
        <div class={"p-2 text-sm bg-black cursor-pointer"} onClick={() => setMenuVisible(!menuVisible)}>Menú</div>
      </div>
    </div>
  )
}

export default Team