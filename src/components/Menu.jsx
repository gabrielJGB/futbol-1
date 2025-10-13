// @ts-nocheck

import { Link } from 'preact-router/match'
import React from 'react'
import menu from '../data/menu.json'
import { showMenu } from '../signals/signals'
import { Header } from './Header'

const Menu = () => {
  return (
    <div class={"z-20 flex flex-col gap-0 w-full  md:overflow-y-hidden md:h-full h-screen overflow-y-scroll  min-w-[250px]"}>

      <div class={"md:hidden block bg-[#032E15]"}>
        <Header />
      </div>


      {

        menu.map((section, i) => (
          <div class={"flex flex-col shadow shadow-gray-900"}>

            <div class={"flex flex-row items-center gap-2 bg-green-950 text-[#C2E213] p-1"}>
              {
                section.logo != "" &&
                <img src={section.logo} alt="Logo" width={20} height={20} />
              }
              <div class={"font-bold"}>{section.name}</div>

            </div>

            <div class={"flex flex-col gap-[0px]  "}>
              {
                section.items.map((item, j) => (
                  <Link href={`/league/${item.id}`} class={`${j % 2 === 0 ? "bg-[#015A1C]" : "bg-[#024817]"} transition-all text-sm text-white text-shadow-xs text-shadow-black px-2 md:py-1 py-2  hover:bg-[#077227]`}>{item.league}</Link>
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