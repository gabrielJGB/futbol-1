import React from "react";
import { useEffect, useState } from "preact/hooks";
import Roster from "@/components/game/Roster";
import Field2 from "@/components/game/Field_2";
import FieldContainer from "@/components/game/lineups/FieldContainer";
import Rosters from "@/components/game/lineups/Rosters";
import { useGame } from "@/hooks/useGame";
import PosessionBar from "@/components/game/lineups/PosessionBar";
import Fade from "@mui/material/Fade";
import Bar from "./lineups/Bar";

const Lineups = ({ id }) => {
  const { data } = useGame(id);
  const game = data.game;
  const lineups = "lineups" in game.players && game.players.lineups;

  const posession =
    "statistics" in game &&
    game.statistics.find((stat) => stat.name === "Posesión");

  const shootsOnGoal =
    "statistics" in game &&
    game.statistics.find((stat) => stat.name === "Remates al arco");

  const totalShoots =
    "statistics" in game &&
    game.statistics.find((stat) => stat.name === "Total Remates");

  console.log(game.statistics);
  const homePrec =
    ((posession.percentages[0] +
      shootsOnGoal.percentages[0] +
      totalShoots.percentages[0]) /
      3) *
    100;

  const awayPerc =
    ((posession.percentages[1] +
      shootsOnGoal.percentages[1] +
      totalShoots.percentages[1]) /
      3) *
    100;

  return (
    <Fade in={true} timeout={300}>
      <div
        class={
          "w-full pb-40 md:px-0 px-1 flex flex-col gap-2 overflow-x-auto md:overflow-visible"
        }
      >
        {lineups.support_visual_lineups && <FieldContainer id={id} />}

        <div class={"flex flex-col gap-[1px]"}>
          {posession && (
            <Bar colors={game.teams.map((x) => x.colors)} stat={posession} />
          )}

          {shootsOnGoal && (
            <Bar colors={game.teams.map((x) => x.colors)} stat={shootsOnGoal} />
          )}

          {totalShoots && (
            <Bar colors={game.teams.map((x) => x.colors)} stat={totalShoots} />
          )}
        </div>

        {/* <div class={"flex flex-col gap-[1px]"}>
          {posession && (
            <PosessionBar
              title={"Posesión de la pelota"}
              posession={posession}
              colors={game.teams.map((x) => x.colors)}
            />
          )}
          {shootsOnGoal && (
            <PosessionBar
              title={"Remates al arco"}
              posession={shootsOnGoal}
              colors={game.teams.map((x) => x.colors)}
            />
          )}
          {totalShoots && (
            <PosessionBar
              title={"Remates totales"}
              posession={totalShoots}
              colors={game.teams.map((x) => x.colors)}
            />
          )}
        </div>*/}

        {lineups && <Rosters id={id} />}
      </div>
    </Fade>
  );
};

export default Lineups;
