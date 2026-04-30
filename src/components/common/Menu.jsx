// @ts-nocheck

import { Link } from 'preact-router/match'
import menu2 from '@/data/menu2.json'
import { showMenu } from '@/signals/home'
import Header from './Header'
import { storage, storageFavoritos } from '@/utils/storage'
import { useEffect, useState } from 'preact/hooks'
import { get, set } from 'idb-keyval'
import { useFavorites } from '@/hooks/useFavorites'

const Menu = () => {


  const [savedEntries, setSavedEntries] = useState([])
  const { favorites, loadingFavorites } = useFavorites()

  const defaultEntries = [
    {
      "league": "Mundial",
      "id": "fjda",
    },
    {
      "league": "Liga Profesional",
      "id": "hc"
    },
    {
      "league": "Libertadores",
      "id": "bac"
    },
    {
      "league": "Champions",
      "id": "fhc"
    },
    {
      "league": "Sudamericana",
      "id": "dij"
    },

  ]




  return (
    <div
      onClick={() => showMenu.value = !showMenu.value}
      class={`z-100  ${showMenu.value ? "md:block fixed -left-[0%]  backdrop-blur-xs" : "md:block md:-left-[0%]  backdrop-blur-none fixed  -left-[100%]"} 
         bottom-0  flex flex-col gap-0 h-[calc(100vh-50px)] md:w-[250px] w-full shadow-xs bg-black/50 shadow-black   overflow-y-auto transition-all`}
    >
      <div class={` transition-all md:w-full w-[270px]  flex flex-col border-r-[1px] border-borderc `}>
        <div class={"flex flex-col gap-[0px]  "}>

          <div class={"flex flex-row items-center gap-2 bg-background text-[#C2E213] p-1 py-[5px]"}>
            <div class={"font-bold"}>Favoritos</div>
          </div>

          {
            !loadingFavorites &&
            favorites?.map((item, i) => (
              <Link href={`/${item.type}/${item.id}`} class={` odd:bg-b2 even:bg-b3 text-sm text-white text-shadow-xs text-shadow-black px-2 md:py-[6px] max-lg:landscape:py-3 py-3  active:bg-[#077227] hover:bg-[#077227] flex flex-row items-center gap-2`}>

                <div class={"w-[30px] flex items-center justify-center"}>
                  {
                    item.type === "league" ?
                      <img src={`https://api.promiedos.com.ar/images/league/${item.id}/1`} alt="Logo" class={"h-[20px] w-auto "} />
                      :
                      <img
                        src={`https://api.promiedos.com.ar/images/team/${item.id}/1`}
                        alt="Logo" class={"h-[20px] w-auto "}
                      />
                  }
                </div>

                {item.name.replace("CONMEBOL","")}
              </Link>
            ))

          }
          {
            !loadingFavorites && favorites === undefined || favorites.length == 0 &&
            < div class={"text-xs text-center text-gray-400 w-full bg-b3 italic font-semibold py-1"}>Vacío</div>
          }
        </div>
      </div>
      {

        menu2.map((section, i) => (
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

    </div >
  )
}

export default Menu