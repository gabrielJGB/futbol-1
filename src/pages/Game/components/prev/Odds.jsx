import React, { useState } from 'react'

const Odds = ({ game }) => {
    const data = game.prediction.options

    const ids = game.teams.map((team) => (team.id))


    const [options, setOptions] = useState(data);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    const totalVotes = options.reduce((acc, opt) => acc + opt.votes, 0);

    const handleVote = async (option) => {
        if (loading || selected) return;
        setLoading(true);
        setSelected(option.name);

        try {
            const res = await fetch(option.vote_url);
            if (!res.ok) throw new Error('Vote failed');
            const newOptions = options.map((opt) =>
                opt.name === option.name
                    ? { ...opt, votes: opt.votes + 1 }
                    : opt
            );

            const newTotal = newOptions.reduce((acc, o) => acc + o.votes, 0);
            const updated = newOptions.map((o) => ({
                ...o,
                percentage: Math.round((o.votes / newTotal) * 100),
            }));

            setOptions(updated);
        } catch (err) {
            console.error(err);
            alert('Error al enviar el voto');
            setSelected(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="w-full max-w-md mx-auto rounded-xl ">
            <div class={"w-full text-lg font-semibold text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>Pronóstico</div>

            <div class="space-y-2">
                {options.map((option) => (
                    <button
                        key={option.name}
                        // onClick={() => handleVote(option)}
                        disabled={!!selected || loading}
                        class={` relative w-full h-10 rounded-lg overflow-hidden bg-gray-800 text-left transition-all
              
            `}
                    // ${selected === option.name ? 'ring-2 ring-green-400' : 'hover:scale-[1.01]'}
                    >
                        <div
                            class={`absolute top-0 left-0 h-full transition-all ${option.name === '1'
                                ? 'bg-green-700'
                                : option.name === 'X'
                                    ? 'bg-green-700'
                                    : 'bg-green-700'
                                }`}
                            style={{ width: `${option.percentage}%` }}
                        ></div>

                        <div class="relative z-10 flex  justify-between items-center h-full px-3 text-shadow-xs text-shadow-black text-white font-medium">
                            <span class={"flex flex-row items-center gap-1"}>
                                {option.name === '1' ?
                                    <>
                                        <img src={`https://api.promiedos.com.ar/images/team/${ids[0]}/1`} alt="Escudo 
                                    Equipo" className="h-5 object-contain" /> <div>Local</div>
                                    </>
                                    : (option.name === '2' ?
                                        <>
                                            <img src={`https://api.promiedos.com.ar/images/team/${ids[1]}/1`} alt="Escudo Equipo" className="h-5 object-contain" /><div>Visitante</div>
                                        </>
                                        :
                                        <div>Empate</div>)}  <div>({option.votes})</div>

                            </span>
                            <span>{option.percentage}%</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* <p class="text-center text-sm text-gray-300 mt-3">
        Total votos: <span class="font-semibold text-white">{totalVotes}</span>
      </p> */}

            {/* {selected && false &&(
        <p class="text-center text-sm text-gray-400 mt-1">
          Voto registrado: <span class="font-semibold text-white">{selected}</span>
        </p>
      )} */}
        </div>
    );

    // const prediction = game.prediction.options

    // return (
    //     <div class={""}>

    //         <div class={"w-full text-lg font-semibold text-[#C2E213] text-shadow-xs text-shadow-black  text-center "}>
    //             Pronostico
    //         </div>

    //         <div class={"flex flex-row gap-[1px] w-full h-[30px] bg-green-950 text-black"}>
    //             {
    //                 prediction.map((item,i)=>(
    //                     <div style={{width:item.percentage+"%"}} class={`flex justify-center items-center text-center text-[15px] font-semibold h-[30px]  ${i===0?"bg-green-300":""} ${i===1?"bg-green-400":""} ${i===2?"bg-green-500":""}`}>{item.percentage}</div>
    //                 ))
    //             }
    //         </div>

    //     </div>
    // )
}

export default Odds