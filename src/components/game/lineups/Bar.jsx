import { invertLines } from "@/signals/game";
import React from "react";

const Bar = ({ stat, colors }) => {
  if (stat === undefined) return <></>;
  console.log(colors);

  // const elementsWidth = [homePrec, awayPerc];

  return (
    <div
      class={`cursor-help md:w-auto w-[200vw] flex ${invertLines.value ? "flex-row-reverse" : "flex-row"} gap-[1px]  bg-transparent`}
    >
      {[0, 1].map((i) => (
        <div
          style={{
            width: `${stat.percentages[i] * 100}%`,
            backgroundColor: colors[i].color,
          }}
          class={"text-center text-xs"}
        >
          <span class={"font-semibold"}>{stat.values[i]}</span>
          {"  "}
          <span class={"text-[11px] ml-[2px]"}>
            {stat.name != "Posesión" && stat.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Bar;
