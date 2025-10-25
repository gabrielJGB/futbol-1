// @ts-nocheck
import { useState } from "preact/hooks";
import Calendar from "react-calendar";
import { selectedDate, showCalendar } from "../signals/signals";
import { useLocation } from "preact-iso";
import "react-calendar/dist/Calendar.css";
import "../calendar.css"



export default function Calendar_({ }) {

  const { route } = useLocation()

  const handleDayClick = (date) => {
    const dateObj = new Date(date)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const dateString = `${day}-${month}-${year}`

    route(`/${dateString}`)

  };




  return (

    
    <div class={`${showCalendar.value?"md:static -right-[0%]":"md:static -right-[100%]"} transition-all flex items-center justify-center md:relative  fixed h-[100vh] w-full md:flex-none  bg-black/85 md:bg-transparent  md:h-max shadow-md shadow-black md:rounded-lg md:mt-5`}>

      
      {
        typeof window !== "undefined" &&
        <Calendar
          className="calendar"
          locale='es-AR'
          tileClassName="text-white"
          onChange={date => {
            showCalendar.value = false;
             handleDayClick(date) 
          }}
          value={selectedDate || new Date()}
        />
      }
    </div>
  );
}
