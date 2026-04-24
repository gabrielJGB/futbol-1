import { darkMode } from "@/signals/common";
import { useState, useEffect, useRef } from "preact/hooks";

export const Stats = ({ stats }) => {




  if (!stats || !stats.filters) {
    return null;
  }

  const leagues = stats.filters
  const [selectedLeague, setSelectedLeague] = useState(leagues[0]);


  

  if (!selectedLeague || !selectedLeague.tables) {
    return <div class=" text-yellow-700 p-4 rounded-lg">No hay estadísticas disponibles para la liga seleccionada.</div>;
  }

  return (
    <div class=" rounded-lg shadow-lg mb-8">
      <h3 class="text-2xl font-bold mb-1 text-primary">Estadísticas de Jugadores</h3>
      <p class="px-2 text-sm text-gray-400  mb-2">
        {selectedLeague.name}

        {/* <select name="cars" id="cars">

          {
            leagues.map((league)=>(
              <option value={league.name} onClick={()=>{setSelectedLeague(league)}}>{league.name}</option>

            )) 
          }

        </select> */}

        {/* <span class="font-semibold">{selectedLeague.name}</span> */}

      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {selectedLeague.tables.map(table => (
          <div key={table.name} class=" shadow-xs shadow-black bg-gray-900  md:p-3 p-2  rounded-lg">
            <h4 class="font-semibold text-lg text-blue-400 mb-2 border-l-4 pl-2 border-blue-700">{table.name}</h4>
            <ul class="flex flex-col gap-[1px] bg-gray-700 p-[1px]">
              {table.rows.slice(0, 6).map(row => ( // Mostramos solo los primeros 6 para brevedad
                <li key={row.entity.object.name} class={` ${darkMode.value ? "text-white odd:bg-slate-800 even:bg-slate-900 hover:bg-gray-600" : "text-black odd:bg-[#E7E7E7] even:bg-[#D5D5D5] hover:bg-gray-400"}  cursor-pointer border-gray-800 hover flex justify-between items-center py-[2px] not-last:border-b-[0px] px-2`}
                >
                  <span class={"text-xs md:text-[13px]"}>{row.entity.object.name}</span>
                  <span class="font-bold ">{row.values[0].value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};