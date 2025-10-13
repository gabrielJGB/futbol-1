// @ts-nocheck
import { useState } from "preact/hooks";
import Calendar from "react-calendar";
import { selectedDate } from "../signals/signals";
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
    <div class={"shadow shadow-gray-900 rounded"}>
      <Calendar
        className="calendar"
        locale='es-AR'
        tileClassName="text-white"
        onChange={date => { handleDayClick(date) }}
        value={selectedDate}
      />
    </div>
  );
}
