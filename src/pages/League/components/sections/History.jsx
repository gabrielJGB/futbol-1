import React from 'react'
import { useState, useEffect, useRef } from "preact/hooks";
import SectionTitle from '../../../../components/SectionTitle'
import { fetcher } from '../../../../utils/fetcher';
import useSWR from 'swr';
import { Link } from 'preact-router/match';

const abbreviatePosition = (pos) => {
  if (!pos) return '';
  pos = pos.toLowerCase();
  if (pos.startsWith('del')) return 'DEL';
  if (pos.startsWith('med')) return 'MED';
  if (pos.startsWith('def')) return 'DEF';
  if (pos.startsWith('arc') || pos.startsWith('por') || pos.startsWith('gol')) return 'ARQ';
  return pos.slice(0, 3).toUpperCase();
};


const History = ({ name, league, games }) => {


  const [historyTable, setHistoryTable] = useState(false)
  const [rankingTable, setRankingTable] = useState(false)

  const { isLoading, error } = useSWR(
    league ? `https://api.promiedos.com.ar/league/history/${league.league.id}`
      : null,
    fetcher,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      onSuccess: (data) => {
        console.log(data);

        setHistoryTable("history" in data && data.history)
        setRankingTable("ranking_tables" in data && data.ranking_tables)

      }
    }
  );



  if (isLoading)
    return <div>Cagando...</div>


  return (
    <div class={"flex flex-col gap-2"}>
      <SectionTitle title={"Historial"} />

      <div class={"grid md:grid-cols-2 grid-cols-1 gap-6"}>


        {historyTable && <Table table={historyTable} />}
        {rankingTable && <Table table={rankingTable} />}


      </div>

    </div>
  )
}


const Table = ({ table }) => {
  let isRankingTable = false

  if (table.length) {
    isRankingTable = true
    table = table[0]
  }


  const [showAll, setShowAll] = useState(false);
  const visibleRows = showAll ? table.rows : table.rows.slice(0, table.rows.length > 10 ? 10 : table.rows.length);

  return (
    <div class="bg-[#000000] text-gray-100 rounded  overflow-hidden h-min shadow shadow-gray-900">
      <div class="px-4 py-1 bg-[#176115] border-b border-gray-700 flex items-center justify-between">
        <h2 class="text-xl font-bold">{table.name.replace("Historia", "Campeones").replace("Ligas", "")}</h2>
        <span class="text-sm text-gray-400">
          {table.rows.length}
        </span>
      </div>

      <table class={"w-full  bg-gray-500   border-separate border-spacing-[2px] "} >
        <thead>

          <tr class="bg-black text-[#C2E213] uppercase  text-[13px]">
            {
              isRankingTable && <th>Equipo</th>
            }
            {table.columns.map((col) => (
              <th key={col.key} class="text-center px-0 py-1">
                {col.title.replace("Torneo", "CAMPEÓN").replace("Campeón", "AÑO")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {visibleRows.map((row, i) => {
            const player = row.entity.object;
            const teamId = player.id || 'unknown';
            const pos = abbreviatePosition(player.position);

            return (
              <tr
                key={row.num}
                class={`text-black text-sm border-b border-[#333] ${i % 2 === 0 ? "bg-[#E7E7E7]" : "bg-[#D5D5D5]"}`}
              >


                <td class="">
                  <Link
                    // @ts-ignore
                    href={`/team/${encodeURIComponent(teamId)}`}
                    class="px-1 py-1 flex items-center text-sm  hover:underline"
                  >
                    <img
                      src={`https://api.promiedos.com.ar/images/team/${teamId}/1`}
                      alt="Escudo Equipo"
                      class="h-5 w-5 mr-2  object-contain"
                    />
                    <div class={"w-max whitespace-nowrap text-[13px] font-semibold"}>
                      {player.name}
                    </div>
                  </Link>
                </td>



                {row.values.map((val, i) => (
                  <td
                    key={val.key}
                    class="px-1 py-1 text-center "
                  >
                    {
                      i === 1 && "game" in row && "scores" in row.game?
                        <Link
                          // @ts-ignore
                          href={`/game/${row.game.id}`}
                          class={""}
                          >
                          <div class={"flex flex-row justify-center gap-1"}>
                            {
                              row.game.teams.map((team, i) => (
                                <div class={`flex ${i === 0 ? "flex-row" : "flex-row-reverse"} items-center  gap-[2px]`}>
                                  <img title={team.name} src={`https://api.promiedos.com.ar/images/team/${team.id}/1`} alt="Escudo Equipo" className="drop-shadow-xs drop-shadow-black h-4 w-4 object-contain" />
                                  <div class={`${row.game.winner === (i + 1) ? "font-semibold" : ""}`}>{row.game.scores[i]}</div>
                                  {i === 0 ? <span class={"ml-[3px]"}>{`-`}</span> : ""}

                                </div>
                              ))
                            }


                          </div>
                        </Link>
                        :
                        val.value
                    }
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {table.rows.length > 10 && (
        <div class="p-2 flex justify-center border-t border-gray-800 bg-gray-850">
          <button
            onClick={() => setShowAll(!showAll)}
            class="text-sm text-white hover:text-yellow-300 transition cursor-pointer"
          >
            {showAll ? 'Ver menos ▲' : 'Ver más ▼'}
          </button>
        </div>
      )}
    </div>
  );
};

export default History