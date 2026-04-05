import { showOnlyLive, sortByDate } from '@/signals/home';
import Button from '@mui/material/Button';
import { useEffect } from 'preact/hooks';

const FilterButtons = ({ date }) => {


    return (
        <div class="text-xs flex justify-center flex-row gap-2 ">
            {
                date === "hoy" &&
                <Button
                    color={"error"}
                    variant={showOnlyLive.value ? "contained" : "outlined"}
                    style={{ fontSize: 11 ,fontWeight:"bold"}}
                    onClick={() => showOnlyLive.value = !showOnlyLive.value}
                >En juego</Button>
            }

            <Button
                color={"warning"}
                variant={sortByDate.value ? "contained" : "outlined"}
                style={{ fontSize: 11,fontWeight:"bold" }}
                onClick={() => sortByDate.value = !sortByDate.value}
            >Ordenar por horario</Button>


        </div>
    );
};

export default FilterButtons



const countMatches = (arr) => {
    const result = { programado: 0, jugando: 0, finalizado: 0 };

    arr.forEach((status) => {
        if (status === 1) result.programado++;
        else if (status === 2) result.jugando++;
        else if (status === 3) result.finalizado++;
    });

    return [result.programado, result.jugando, result.finalizado]
};
