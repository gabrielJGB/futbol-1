import { useState } from "react";
import Lineups from "./Lineups";
import Prev from "./Prev";
import Stats from "./Stats";
import Videos from "./Videos";
import Events from "./Events";

const Tabs = ({ game }) => {

  const tabs = [
    { id: "lineups", show: "players" in game , label: "Formaciones", content: <Lineups game={game} /> },
    { id: "events", show: "events" in game, label: "Eventos", content: <Events game={game} /> },
    { id: "prev", show: true, label: "Previa", content: <Prev game={game} /> },
    { id: "stats", show: "statistics" in game, label: "Estadisticas", content: <Stats game={game} /> },
  ]
  const [active, setActive] = useState(tabs[0].id);


  return (
    <div className="relative w-full">


      <div className="flex overflow-x-auto md:overflow-visible bg-b2  md:mx-0 mx-0 mb-4">
        {tabs.filter(t => t.show).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 px-4 py-2  border-b-2 transition-all cursor-pointer  text-sm whitespace-nowrap
              ${active === tab.id
                ? " border-[#C2E213]  text-[#C2E213] font-medium"
                : "border-transparent text-gray-400 hover:text-[#e2ff3b]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>



      <div className=" md:mx-0 mx-0 p-0 ">
        {
          tabs.filter(t => t.show).map((tab) => (
            <div
              key={tab.id}
              className={active === tab.id ? "block" : "hidden"}
            >
              {tab.content}
            </div>
          ))
        }
      </div>


    </div>
  );
};

export default Tabs
