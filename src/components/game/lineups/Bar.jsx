import { invertLines } from "@/signals/game";
import React from "react";

const Bar = ({ stat, colors }) => {
  if (stat === undefined) return <></>;

  return (
    <div
      class={`md:w-auto w-[200vw] flex ${invertLines.value ? "flex-row-reverse" : "flex-row"} gap-[1px]  bg-transparent`}
    >
      {[0, 1].map((i) => (
        <div
          style={{
            width: `${stat.percentages[i] * 100}%`,

            backgroundColor: colors[i].color,
          }}
          class={"text-center text-xs"}
        >
          <span style={{ color: colors[i].text_color }} class={"font-semibold"}>
            {stat.values[i]}
          </span>
          {"  "}

          {stat.values[i] != "0" && (
            <span
              style={{ color: colors[i].text_color }}
              class={"text-[11px] ml-[2px]"}
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
