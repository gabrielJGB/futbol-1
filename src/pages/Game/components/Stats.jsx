import React from 'react'

const Stats = ({ game }) => {

  const stats = game.statistics
  const colors = game.teams.map((team)=>team.colors)
  


  return (
    <div class={`flex flex-col gap-4 justify-center md:px-0 px-1 mx-auto md:w-3/4 w-full`}>
      {
        stats.map((stat) => (
          <div class={"flex flex-col"}>
            <div class={"w-full text-center font-semibold text-xs "}>{stat.name.toUpperCase()}</div>
            <div style={{background:colors[1].color}} class={`flex h-[20px] my-1 rounded shadow shadow-gray-800`}>

              <div
                style={{ width: (stat.percentages[0] * 100) + "%",background:colors[0].color, color:colors[0].text_color }}
                class={`w-min flex justify-center  items-center  h-[20px] rounded-l font-semibold`}>{stat.values[0]}</div>
              <div
                style={{ width: (stat.percentages[1] * 100) + "%",color:colors[1].text_color }}
                class={`w-min flex justify-center  items-center  h-[20px] font-semibold `}>{stat.values[1]}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Stats