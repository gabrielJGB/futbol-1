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


    <div class={`${showCalendar.value ? "md:static -right-[0%]" : "md:static -right-[100%]"} transition-all flex  flex-col items-center justify-center md:relative  fixed h-[100vh] w-full md:flex-none  md:bg-transparent  md:h-max  md:rounded-lg md:mt-5 backdrop-blur-xs`}>

      <div class={"flex flex-col gap-1"}>

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
      {
        date != "hoy" &&
        <div
          class={"bg-transparent text-shadow-xs text-shadow-black cursor-pointer text-sm text-center w- hover:underline"}
          onClick={() => {
            showCalendar.value = false
            selectedDate.value = new Date()
            route("/hoy")
          }}
        >Volver a hoy</div>
      }
    </div>
  );
}
