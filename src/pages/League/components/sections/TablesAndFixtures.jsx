import React from 'react'
import Fixture from './Fixture'
import Table from './Table'
import { round } from '../../signals'
import SectionTitle from '../../../../components/SectionTitle'


const TablesAndFixtures = ({ name, league, games, gamesLoading }) => {




  const rounds = "games" in league && league.games.filters
  const tablesGroups = "tables_groups" in league && league.tables_groups
  const current = round.value.key 


  return (
    <div class={"flex flex-col gap-2"}>

      <SectionTitle title={name} />

      <div class={"grid md:grid-cols-2 grid-cols-1 gap-10"}>

        {
          tablesGroups &&
          <div class={"flex flex-col gap-2 md:row-start-1 row-start-2"}>
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

          <div class={"flex flex-col gap-1 md:row-auto row-start-1"}>

            <div class={"w-full grid md:grid-cols-5 grid-cols-4 gap-1 py-1"}>

              {
                rounds &&
                rounds.map((r) => (
                  <div
                    title={r.name}
                    onClick={() => { round.value = r }}
                    class={`${r.key === round.value.key ? "bg-[#C2E213] text-black hover:text-black" : "bg-[#008000] text-white"} cursor-pointer hover:border-[#C2E213] border-[1px] hover:text-[#C2E213] border-transparent py-2 md:py-[2px] px-1 font-semibold text-start md:text-xs text-sm shadow shadow-gray-800  truncate `}>{r.name}</div>
                ))
              }
            </div>

            <div class={"font-semibold text-2xl w-full text-center"}>{round.value.
              // @ts-ignore
              name}</div>

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