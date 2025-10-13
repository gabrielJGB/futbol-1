import React from 'react'
import { useEffect, useState } from 'preact/hooks';
import { selectedButton } from '../../../signals/signals';

const countMatches = (arr) => {
    const result = { programado: 0, jugando: 0, finalizado: 0 };

    arr.forEach((status) => {
        if (status === 1) result.programado++;
        else if (status === 2) result.jugando++;
        else if (status === 3) result.finalizado++;
    });

    return [result.programado, result.jugando, result.finalizado]
};


const FilterButtons = ({ gamesArr }) => {
    const stats = countMatches(gamesArr)
    const [selected, setSelected] = useState(-1);


    const colors = [
        { active: "bg-[#06812b] text-white", inactive: "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white" }, // Programados
        { active: "bg-[#b30c17] text-white", inactive: "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white" }, // Jugando
        { active: "bg-[#000000] text-white", inactive: "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white" }, // Finalizados
    ];


    useEffect(() => {
        selectedButton.value = selected
    }, [selected])


    return (
        <div class="text-xs flex flex-row gap-2">
            {["Programados", "Jugando", "Finalizados"].map((title, i) => (
                <div
                    key={i}
                    onClick={() => { setSelected((prev) => { return prev === i ? -1 : i }) }}
                    className={`flex-1 text-center py-2 rounded cursor-pointer shadow shadow-gray-900 transition-colors
            ${selected === i ? colors[i].active : colors[i].inactive}`}
                >
                    {title} ({stats[i]})
                </div>
            ))}
        </div>
    );
};

export default FilterButtons