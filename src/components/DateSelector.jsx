// @ts-nocheck
import { selectedDate } from '../signals/signals'
import { getDates } from '../utils/time'
import { Link } from 'preact-router/match'
import { useHome } from '../pages/Home/useHome'
import { useEffect } from 'preact/hooks'


const DateSelector = () => {
 
  const date = selectedDate.value
  const dateObject = getDates(date)
 
  const buttonClass = "text-gray-300 flex-1 active:bg-[#1D7739]  font-bold  min-w-[120px] text-center    border-b-2 border-transparent py-3 hover:text-white md:first:rounded-l-md md:last:rounded-r-md "

  const dateClass = "font-semibold flex-1 border-b-2 border-[#C2E213] text-[#C2E213] py-3 text-shadow-xs text-shadow-black  text-center "

  return (
    <div class={"z-10 flex flex-row items-center bg-b2  py-0 justify-between  md:mb-8 shadow-black md:shadow-md md:rounded-lg w-full text-xs md:text-sm text-shadow-xs text-shadow-black md:static  sticky top-11 "}>

      <Link class={buttonClass } href={`/${dateObject.previousDate.string}`}>{dateObject.previousDate.formated.toUpperCase()}</Link>
      <div class={dateClass}>{dateObject.selectedDate.formated.toUpperCase()}</div>
      <Link class={buttonClass } href={`/${dateObject.nextDate.string}`}>{dateObject.nextDate.formated.toUpperCase()}</Link>

    </div>
  )
}

export default DateSelector