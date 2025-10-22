import { useState } from 'preact/hooks';
import { Link } from 'preact-router';
import SectionTitle from '../../../../components/SectionTitle';

const abbreviatePosition = (pos) => {
  if (!pos) return '';
  pos = pos.toLowerCase();
  if (pos.startsWith('del')) return 'DEL';
  if (pos.startsWith('med')) return 'MED';
  if (pos.startsWith('def')) return 'DEF';
  if (pos.startsWith('arc') || pos.startsWith('por') || pos.startsWith('gol')) return 'ARQ';
  return pos.slice(0, 3).toUpperCase();
};


const StatsTables = ({  league }) => {

  const tables = league.players_statistics?.tables

  if (tables === undefined)
    return;

  console.log(league);

  return (

    <>
      <SectionTitle title={"Estadísticas"} />

      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">


        {tables.map((table) => (
          <Table key={table.name} table={table} />
        ))}
      </div>
    </>
  );
};

const Table = ({ table }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleRows = showAll ? table.rows : table.rows.slice(0, 10);

  return (
    <div class="bg-[#000000] text-gray-100 rounded  overflow-hidden h-min shadow shadow-gray-900">
      <div class="px-4 py-1 bg-[#176115] border-b border-gray-700 flex items-center justify-between">
        <h2 class="text-xl font-bold">{table.name}</h2>
        <span class="text-sm text-gray-400">
          {table.rows.length} jugadores
        </span>
      </div>

      <table class={"w-full  bg-gray-500   border-separate border-spacing-[2px] "} >
        <thead>
          <tr class="bg-black text-[#C2E213] uppercase  text-[13px]">
            <th class="">#</th>
            <th class="text-left px-4 py-1">Jugador</th>
            <th class="py-1 table-cell">Pos.</th>

            {table.columns.map((col) => (
              <th key={col.key} class="text-center px-0 py-1">
                {col.title.replace("Total Fouls Conceded", "Barridas ganadas").replace("Tarjetas", "")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {visibleRows.map((row, i) => {
            const player = row.entity.object;
            const teamId = player.team_id || 'unknown';
            const pos = abbreviatePosition(player.position);

            return (
              <tr
                key={row.num}
                class={`text-black text-sm border-b border-[#333] ${i % 2 === 0 ? "bg-[#E7E7E7]" : "bg-[#D5D5D5]"}`}
              >
                <td class="px-1 py-1 font-semibold  text-start">{row.num}</td>

                <td class="">
                  <Link
                    // @ts-ignore
                    href={`/player/${encodeURIComponent(player.name)}`}
                    class="px-1 py-1 flex items-center text-sm  hover:underline"
                  >
                    <img
                      src={`https://api.promiedos.com.ar/images/team/${teamId}/1`}
                      alt="Escudo Equipo"
                      class="h-6 w-6 mr-2  object-contain"
                    />
                    {player.name}
                  </Link>
                </td>

                <td class="px-1 py-1 text-xs table-cell text-center" title={player.position}>
                  {pos}
                </td>

                {row.values.map((val) => (
                  <td
                    key={val.key}
                    class="px-1 py-1 text-center font-semibold "
                  >
                    {val.value}
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

export default StatsTables;
