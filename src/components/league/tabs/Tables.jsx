import Table from '@/components/league/Table'
import { useLeague } from '@/hooks/useLeague'
import React from 'react'

const Tables = ({id,show}) => {

  if(!show)
    return <></>;

const {league} = useLeague(id)

  return (
    <div class={"flex flex-col gap-2 md:row-start-1 row-start-2 md:my-0 my-2"}>
      {
        league.tables_groups.map((group, i) => (
          <div class={"flex flex-col gap-1"}>
            {
              group.name != "" &&
              <h2 class={"font-semibold text-[20px]  text-center mb-2"}>{group.name.toUpperCase()}</h2>
            }
            <div class={"flex flex-col gap-4"}>
              {
                group?.tables?.map((table => (
                  <Table table={table} />
                )))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Tables