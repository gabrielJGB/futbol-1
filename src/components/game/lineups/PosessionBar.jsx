import { invertLines } from "@/signals/game";
import React from "react";

const PosessionBar = ({ posession, colors, title }) => {
  if (posession === undefined) return <></>;

  return (
    <div
      title={title}
      class={`cursor-help md:w-auto w-[200vw] flex ${invertLines.value ? "flex-row-reverse" : "flex-row"} gap-[1px] h-[15px] bg-transparent`}
    >
      {posession.values?.map((value, i) => (
        <div
          style={{
            width: `${posession.percentages[i] * 100}%`,
            backgroundColor: colors[i].color,
            color: colors[i].text_color,
          }}
          class={" h-full text-xs text-center font-semibold"}
        >
          {value}
          <span class={"font-normal ml-1 text-[11px]"}>
            {title != "Posesión de la pelota" ? title : "Posesión"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PosessionBar;
