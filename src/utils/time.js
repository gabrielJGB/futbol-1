export const getDates = (date)=>{

    
    const previous = new Date(date.getTime() - 86400000)
    const next = new Date(date.getTime() + 86400000)

    return {
        previousDate: {
            formated: formatDateObject(previous),
            string:getDateString(previous)
        },
        selectedDate: {
            formated: formatDateObject(date),
            string:getDateString(date)
        },
        nextDate: {
            formated: formatDateObject(next),
            string:getDateString(next)
        }
    }

}


export const getDateString = (date)=>{

    return `${String(date.getDate()).padStart(2,"0")}-${String(parseInt(date.getMonth())+1).padStart(2,"0")}-${String(date.getFullYear())}`

}



// export const getDates = (date) => {
    
//     const year = parseInt(date.split("-")[0])
//     const month = parseInt(date.split("-")[1]) - 1
//     const day = parseInt(date.split("-")[0])

//     const dateObj = new Date(year, month, day)

//     const previous = new Date(dateObj.getTime() - 86400000)
//     const next = new Date(dateObj.getTime() + 86400000)

//     const previousDate = `${previous.getFullYear()}${String(previous.getMonth() + 1).padStart(2, "0")}${String(previous.getDate()).padStart(2, "0")}`

//     const nextDate = `${next.getFullYear()}${String(next.getMonth() + 1).padStart(2, "0")}${String(next.getDate()).padStart(2, "0")}`



//     return {
//         previousDate: {
//             formated: formatDateObject(previous),
//             string: previousDate
//         },
//         selectedDate: {
//             formated: formatDateObject(dateObj),
//             string: date
//         },
//         nextDate: {
//             formated: formatDateObject(next),
//             string: nextDate
//         }
//     }



// }


export const formatDateObject = (date) => {

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDay(date, today)) {
        return "Hoy";
    } else if (isSameDay(date, tomorrow)) {
        return "Mañana";
    } else if (isSameDay(date, yesterday)) {
        return "Ayer";
    } else {
        const days = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
        const days_lower = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const dayOfWeek = days_lower[date.getDay()];
        const formatedDate = `${dayOfWeek}  ${formatNumber(date.getDate())}/${formatNumber(date.getMonth() + 1)}/${formatNumber(date.getFullYear() % 100)}`;
        return formatedDate;
    }
}

const formatNumber = (number) => {
    return number < 10 ? '0' + number : number
}


export const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}


export const parseDateString = (str) => {
  // str = "26-09-2025 19:00"
  const [datePart, timePart] = str.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
    const x = new Date(year, month - 1, day, hours, minutes) ;
  
  return x.getTime()
};