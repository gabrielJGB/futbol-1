export const getDates = (date) => {


    const previous = new Date(date.getTime() - 86400000)
    const next = new Date(date.getTime() + 86400000)

    return {
        previousDate: {
            displayString: getDisplayDateString(previous),
            URLString: getURLDateString(previous)
        },
        selectedDate: {
            displayString: getDisplayDateString(date),
            URLString: getURLDateString(date)
        },
        nextDate: {
            displayString: getDisplayDateString(next),
            URLString: getURLDateString(next)
        }
    }

}


export const getURLDateString = (date) => {

    const isToday = isSameDay(date,new Date())

    if(isToday)
        return "hoy"
        

    return `${String(date.getDate()).padStart(2, "0")}-${String(parseInt(date.getMonth()) + 1).padStart(2, "0")}-${String(date.getFullYear())}`

}



export const getDisplayDateString = (date) => {

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
    // "26-09-2025 19:00"
    const [datePart, timePart] = str.split(" ");
    const [day, month, year] = datePart.split("-").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);
    const x = new Date(year, month - 1, day, hours, minutes);

    return x.getTime()
};


export const formatFullDateString = (date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

    const dayOfWeek = days[date.getDay()]
    const day = String(date.getDate())
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${dayOfWeek} ${day} de ${month} de ${year}`

}

