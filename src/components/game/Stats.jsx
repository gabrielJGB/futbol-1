import { useGame } from '@/hooks/useGame'
import { useEffect, useState } from 'preact/hooks'


const Stats = ({ id }) => {

  const { data } = useGame(id)
  const { game } = data

  const stats = game.statistics
  const colors = game.teams.map((team) => team.colors)



  return (
    <div class="w-full max-w-xl mx-auto p-3  mb-40">
 
      <div class={"w-full text-lg font-semibold  mb-3 text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>Estadísticas</div>


      {stats.map((stat, idx) => (
        <StatBar key={idx} stat={stat} colors={colors} />
      ))}
    </div>
  )
}

export default Stats



const StatBar = ({ stat, colors }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Pequeño delay para asegurar que el DOM esté listo
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculamos el ancho basado en si ya cargó o no
  const leftWidth = isLoaded ? `${stat.percentages[0] * 100}%` : '0%';
  const rightWidth = isLoaded ? `${stat.percentages[1] * 100}%` : '0%';

  return (
    <div class="group flex flex-col mb-0 last:mb-0 w-full ">
      {/* Etiqueta del Stat */}

      <span class="text-[10px] w-full mb-1 text-center  tracking-[0.2em] font-bold text-gray-100 uppercase transition-colors  ">
        {stat.name}
      </span>



      {/* Contenedor Principal */}
      <div
        style={{ backgroundColor: `${colors[1].color}` }}
        class="relative h-5 w-full rounded overflow-hidden   shadow shadow-gray-900 flex"
      >
        {/* Barra de Progreso Izquierda */}
        <div
          style={{
            width: leftWidth,
            backgroundColor: colors[0].color,
          }}
          class="relative h-full transition-all duration-1000 ease-out flex items-center justify-end pr-3 z-0"
        >
          {isLoaded && (
            <span
              style={{ color: colors[0].text_color }}
              class="text-[9px] font-black opacity-0  transition-opacity duration-300"
            >
              {stat.values[0]}
            </span>
          )}
        </div>

        {/* Espacio para el valor derecho (opcional) */}
        <div
          style={{ width: rightWidth }}
          class="h-full flex items-center justify-start pl-3"
        >
          <span
            style={{ color: colors[1].text_color }}
            class="text-[9px] font-black opacity-0  transition-opacity duration-300"
          >
            {stat.values[1]}
          </span>
        </div>
      </div>

      {/* Indicadores de valor estáticos (Debajo) */}
      <div class="flex justify-between mt-1.5 px-2">
        <div class="flex flex-col items-start leading-none">
          <span class="text-lg font-bold transition-all " style={{ color: colors[0].color }}>
            {stat.values[0]}
          </span>
        </div>
        <div class="flex flex-col items-end leading-none">
          <span class="text-lg font-bold text-gray-400 transition-all ">
            {stat.values[1]}
          </span>
        </div>
      </div>
    </div>
  );
}