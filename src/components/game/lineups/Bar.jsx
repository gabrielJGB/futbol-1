import { invertLines } from "@/signals/game";
import React from "react";

const Bar = ({ stat, colors }) => {
  if (stat === undefined) return <></>;

  return (
    <div
      title={stat.name}
      class={`md:w-auto w-[200vw] flex ${invertLines.value ? "flex-row-reverse" : "flex-row"} gap-[1px]  bg-transparent`}
    >
      {[0, 1].map((i) => (
        <div
          style={{
            width: `${stat.percentages[i] * 100}%`,

            backgroundColor: colors[i].color,
          }}
          class={"text-center text-xs flex flex-row gap-x-1 px-1 items-center justify-center"}
        >
          <span style={{ color: colors[i].text_color }} class={"font-semibold"}>
            {stat.values[i]}
          </span>
          {"  "}

          {stat.percentages[i] != 0 && (
            <span
              style={{ color: colors[i].text_color }}
              class={"text-[11px] ml-[2px] line-clamp-1"}
            >
              {stat.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Bar;
