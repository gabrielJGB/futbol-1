import { invertLines, showFlags, showNumbers, showSubPlayers } from "@/signals/game";


const Options = () => {
    return (
        <div class={"flex flex-row items-center gap-3 select-none my-1 "}>

            <label htmlFor="flags" class={"text-xs"}>
                <input
                    id={"flags"}
                    name="flags"
                    type="checkbox"
                    class={"cursor-pointer"}
                    checked={showFlags.value}
                    onChange={() => showFlags.value = !showFlags.value}
                />

                <span class={"pl-1 cursor-pointer"}>Banderas</span>
            </label>


            <label htmlFor="invert" class={"text-xs"}>
                <input
                    id={"invert"}
                    name="flags"
                    type="checkbox"
                    class={"cursor-pointer"}
                    checked={invertLines.value}
                    onChange={() => invertLines.value = !invertLines.value}
                />

                <span class={"pl-1 cursor-pointer"}>Invertir</span>
            </label>

            <label htmlFor="jersey" class={"text-xs"}>
                <input
                    id={"jersey"}
                    name="flags"
                    type="checkbox"
                    class={"cursor-pointer"}
                    checked={showNumbers.value}
                    onChange={() => showNumbers.value = ! showNumbers.value }
                />

                <span class={"pl-1 cursor-pointer"}>Numeros</span>
            </label>



            <label htmlFor="sub" class={"text-xs"}>
                <input
                    id={"sub"}
                    name="flags"
                    type="checkbox"
                    class={"cursor-pointer"}
                    checked={showSubPlayers.value}
                    onChange={() => showSubPlayers.value = ! showSubPlayers.value }
                />

                <span class={"pl-1 cursor-pointer"}>Suplentes</span>
            </label>

        </div>
    );
}

export default Options