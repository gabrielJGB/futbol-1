export const Stats = ({ stats }) => {
  if (!stats || !stats.filters) {
    return null;
  }

  const selectedLeague = stats.filters.find(f => f.selected);

  if (!selectedLeague || !selectedLeague.tables) {
    return <div class=" text-yellow-700 p-4 rounded-lg">No hay estadísticas disponibles para la liga seleccionada.</div>;
  }

  return (
    <div class=" rounded-lg shadow-lg mb-8">
      <h3 class="text-2xl font-bold mb-1 text-primary">Estadísticas de Jugadores</h3>
      <p class="text-sm text-gray-400  mb-2">Mostrando estadísticas para: <span class="font-semibold">{selectedLeague.name}</span></p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {selectedLeague.tables.map(table => (
          <div key={table.name} class=" shadow-xs shadow-black bg-gray-800  not-last:border-gray-500 p-3  rounded-lg">
            <h4 class="font-semibold text-lg text-blue-400 mb-2 border-l-4 pl-2 border-blue-700">{table.name}</h4>
            <ul>
              {table.rows.slice(0, 6).map(row => ( // Mostramos solo los primeros 6 para brevedad
                <li key={row.entity.object.name} class=" odd:bg-gray-700/30 even:bg-gray-700/70 hover:bg-gray-600 cursor-pointer border-gray-800 hover flex justify-between items-center py-1 not-last:border-b px-2">
                  <span class={"text-sm"}>{row.entity.object.name}</span>
                  <span class="font-bold text-gray-200 ">{row.values[0].value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};