import React from 'react'
import Fixture from './Fixture'
import Table from './Table'
import { round } from '../../signals'


const TablesAndFixtures = ({ name, league, games, gamesLoading }) => {




  const rounds = "games" in league && league.games.filters
  const tablesGroups = "tables_groups" in league && league.tables_groups


  

  return (
    <div class={"flex flex-col gap-2"}>

      <h2 class="text-[#C2E213] text-xl font-bold">{name}</h2>

      <div class={"grid md:grid-cols-2 grid-cols-1 gap-10"}>

        {
          tablesGroups &&
          <div class={"flex flex-col gap-2"}>
            {
              tablesGroups.map((group, i) => (
                <div class={"flex flex-col gap-1"}>
                  {
                    group.name != "" &&
                    <h2 class={"font-semibold text-2xl  text-center mb-3"}>{group.name.toUpperCase()}</h2>
                  }
                  <div class={"flex flex-col gap-4"}>
                    {
                      group?.tables?.map((table => (
                        <Table table={table} />
                      )))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        }

        {
          
          <div class={"flex flex-col gap-3"}>


            <div class={"font-semibold text-2xl w-full text-center"}>{round.value.
              // @ts-ignore
              name}</div>
            <div class={"w-full flex flex-row items-center justify-center flex-wrap gap-1 py-1"}>
              
              {
                rounds  &&
                rounds.map((r) => (
                  <div
                    onClick={() => { round.value = r }}
                    class={`${r.key === round.value.key ? "bg-[#C2E213] text-black" : "bg-[#008000] text-white"} cursor-pointer hover:bg-[#C2E213] flex-1 min-w-min whitespace-nowrap  hover:text-black  py-1 px-2 font-semibold text-xs shadow shadow-gray-800 `}>{r.name}</div>
                ))
              }
            </div>
            {

              gamesLoading ?
                <div class={"w-full text-center py-2 h-[500px]"}>Cargando...</div>
                :
                <Fixture games={games} rounds={rounds} />
            }
          </div>
        }

      </div>

    </div>
  )
}

export default TablesAndFixtures