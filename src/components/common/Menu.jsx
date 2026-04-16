// @ts-nocheck

import { Link } from 'preact-router/match'
import React from 'react'
import menu from '@/data/menu.json'
import { showMenu } from '@/signals/home'
import Header from './Header'

const Menu = () => {


  /*${menuVisible ? "-left-[0%]" : "-left-[100%]"}
   */

  return (
    <div
      onClick={() => showMenu.value = !showMenu.value}
      class={`z-100  ${showMenu.value ? "md:block fixed -left-[0%]  backdrop-blur-xs" : "md:block md:-left-[0%]  backdrop-blur-none fixed  -left-[100%]"} 
         bottom-0  flex flex-col gap-0 h-[calc(100vh-50px)] md:w-[250px] w-full shadow-xs bg-black/50 shadow-black   overflow-y-auto transition-all`}
    >

      {

        menu.map((section, i) => (
          <div class={` transition-all md:w-full w-[270px]  flex flex-col border-r-[1px] border-borderc `}>

            <div class={"flex flex-row items-center gap-2 bg-background text-[#C2E213] p-1 py-[5px]"}>
              {
                section.logo != "" &&
                <img src={section.logo} alt="Logo" width={20} height={20} />
              }
              <div class={"font-bold"}>{section.name}</div>

            </div>

            <div class={"flex flex-col gap-[0px]  "}>
              {
                section.items.map((item, j) => (
                  <Link href={`/league/${item.id}`} class={` odd:bg-b2 even:bg-b3 text-sm text-white text-shadow-xs text-shadow-black px-2 md:py-[6px] max-lg:landscape:py-3 py-3  active:bg-[#077227] hover:bg-[#077227] flex flex-row items-center gap-2`}>

                    {section.name === "Destacado" &&
                      <div class={"w-[30px] flex items-center justify-center"}>
                        <img src={item.logo} alt="Logo" class={"h-[20px] w-auto "} />
                      </div>
                    }
                    {item.league}</Link>
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