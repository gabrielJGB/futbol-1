// @ts-nocheck
import { selectedDate } from '../signals/signals'
import { getDates } from '../utils/time'
import { Link } from 'preact-router/match'
import { useHome } from '../pages/Home/useHome'
import { useEffect } from 'preact/hooks'


const DateSelector = () => {
 
  const date = selectedDate.value
  const dateObject = getDates(date)
 
  return (
    <div class={"flex-1 flex bg-green-950 md:mt-0 mt-2 mb-8 shadow rounded shadow-gray-900 flex-row items-center justify-between  "}>

      <Link class={"text-xs bg-[#5b9440] py-[11px] hover:bg-[#71af54] text-white font-bold  min-w-[120px] text-center text-shadow-xs text-shadow-black p-2 rounded-l-md"} href={`/${dateObject.previousDate.string}`}>{dateObject.previousDate.formated}</Link>
      <div class={"font-semibold text-md text-center "}>{dateObject.selectedDate.formated}</div>
      <Link class={"text-xs bg-[#5b9440] hover:bg-[#71af54] text-white font-bold  min-w-[120px] text-center text-shadow-xs text-shadow-black p-2 py-[11px] rounded-r-md"} href={`/${dateObject.nextDate.string}`}>{dateObject.nextDate.formated}</Link>

    </div>
  )
}

export default DateSelector