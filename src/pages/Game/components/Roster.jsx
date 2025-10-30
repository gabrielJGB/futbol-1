import React from 'react'
import RosterPlayer from './RosterPlayer'

const Roster = ({ roster, missingPlayers, teams }) => {


  


  return (


    <div class={"relative md:w-auto w-full "}>

      <div className="relative md:w-auto w-[200vw] grid grid-cols-2  md:gap-4 gap-4 overflow-hidden mb-20">
        {
          roster != undefined&&
          roster.map((team, i) => (
            <div class={"flex flex-col w-full col-span-1 "}>

              <div style={{ backgroundColor: teams[i].colors.color, color: teams[i].colors.text_color }} class={`py-1 text-lg text-center font-semibold shadow shadow-gray-800`}>{teams[i].name}</div>



              <div class={`bg-[#032E15] py-2 text-[#C2E213] text-xs text-center font-semibold shadow shadow-gray-800`}>TITULARES</div>

              <div class={"flex flex-col divide-y-[2px] divide-[#024817] shadow shadow-gray-800"}>
                {
                  team.starting.map((player, i) => (
                    <RosterPlayer player={player} isBench={false} missingReason={false}/>
                  ))
                }
              </div>

              <div class={"flex flex-row items-center border-t-[1px] border-[#015A1C] bg-white font-semibold text-black text-sm p-1"}>DT:
                <img src={`https://api.promiedos.com.ar/images/country/${team.staff[0].country_id}/1`} alt="Logo" className="h-5 w-5 mx-1" />
                <div>{team.staff[0].name}</div>
              </div>

              <div class={"bg-[#032E15] py-2 text-[#ffffff] text-xs text-center font-semibold shadow shadow-gray-800"}>SUPLENTES</div>

              <div class={"flex flex-col divide-y-[2px] divide-[#024817] shadow shadow-gray-800"}>
                {
                  team.bench.map((player, i) => (
                    <RosterPlayer player={player} isBench={true} missingReason={false} />
                  ))
                }
              </div>


              {
                missingPlayers &&
                <>
                  <div class={"bg-[#032E15] py-2 text-red-500 text-xs text-center font-semibold shadow shadow-gray-800"}>BAJAS</div>

                  <div class={"flex flex-col divide-y-[2px] divide-[#024817] shadow shadow-gray-800"}>
                    {
                      missingPlayers[i].map((player, j) => (
                        <RosterPlayer player={player} isBench={true} missingReason={player.missing_details?.reason}/>
                      ))
                    }
                  </div>

                </>
              }



            </div>
          ))
        }
      </div>
    </div>

  )
}

export default Roster