// @ts-nocheck
import { useState } from "preact/hooks";
import Calendar from "react-calendar";
import { useLocation } from "preact-iso";
import { selectedDate, showCalendar } from "@/signals/home";
import { isSameDay } from "@/utils/time";
import "react-calendar/dist/Calendar.css";
import "../../calendar.css"
import { Link } from "preact-router/match";



export default function Calendar_({ date }) {

  const { route } = useLocation()






  const handleDayClick = (date) => {
    const dateObj = new Date(date)

    if (isSameDay(dateObj, new Date())) {
      route("/hoy", true)
    } else {

      const day = String(date.getDate()).padStart(2, "0")
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()
      const dateString = `${day}-${month}-${year}`
      route(`/${dateString}`)
    }

  };




  return (


    

      <div class={"flex flex-col justify-center items-center gap-1 "}>

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
            value={selectedDate.value || new Date()}
          />
        }

  
     
    </div>
  );
}
