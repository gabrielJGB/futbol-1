// @ts-nocheck

import { Link } from 'preact-router/match'
import React from 'react'
import menu from '../data/menu.json'
import { showMenu } from '../signals/signals'
import { Header } from './Header'

const Menu = () => {


  /*${menuVisible ? "-left-[0%]" : "-left-[100%]"}
   */

  return (
    <div
      onClick={() => showMenu.value = !showMenu.value}
      class={`z-100  ${showMenu.value ? "md:block fixed -left-[0%]" : "md:block md:-left-[0%] fixed  -left-[100%]"} 
         bottom-0  flex flex-col gap-0 h-[93vh] backdrop-blur-xs md:w-[250px] w-full shadow-lg shadow-black bg-black/70  overflow-y-auto transition-all`}
    >

      {

        menu.map((section, i) => (
          <div class={` transition-all md:w-full w-[270px]  flex flex-col border-r-[1px] border-borderc shadow shadow-black`}>

            <div class={"flex flex-row items-center gap-2 bg-background text-[#C2E213] p-1"}>
              {
                section.logo != "" &&
                <img src={section.logo} alt="Logo" width={20} height={20} />
              }
              <div class={"font-bold"}>{section.name}</div>

            </div>

            <div class={"flex flex-col gap-[0px]  "}>
              {
                section.items.map((item, j) => (
                  <Link href={`/league/${item.id}`} class={` odd:bg-b2 even:bg-b3 transition-all text-sm text-white text-shadow-xs text-shadow-black px-2 md:py-1 py-2  hover:bg-[#077227]`}>{item.league}</Link>
                ))
              }
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Menu