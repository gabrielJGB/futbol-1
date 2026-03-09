import { invertLines } from "@/signals/game"

const FormationStrings = ({ formations,  ids }) => (
    <>
        {
            formations.map((item, i) => (
                <div class={`absolute flex gap-1 p-1 top-1 ${i === 0 ? (invertLines.value ? "right-1 flex-row-reverse" : "left-1 flex-row") : invertLines.value ? "left-1 flex-row" : "right-1 flex-row-reverse"} `}>
                    <img src={`https://api.promiedos.com.ar/images/team/${ids[i]}/1`} alt="Escudo Equipo" class="drop-shadow-xs drop-shadow-black size-6 object-contain" />
                    <div class={` font-semibold  text-shadow-xs text-shadow-black text-sm`}>{item}</div>
                </div>
            ))
        }
    </>
)

export default FormationStrings