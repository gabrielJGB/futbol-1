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

    const isToday = isSameDay(date, new Date())

    if (isToday)
        return "hoy"


    return `${String(date.getDate()).padStart(2, "0")}-${String(parseInt(date.getMonth()) + 1).padStart(2, "0")}-${String(date.getFullYear())}`

}

export const getDateObject = (dateParam) => {

    if (dateParam != "hoy") {

        const day = dateParam.split("-")[0]
        const month = parseInt(dateParam.split("-")[1]) - 1
        const year = dateParam.split("-")[2]
        return new Date(year, month, day)
    } else {
        return new Date()
    }



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
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const dayOfWeek = days[date.getDay()]
    const day = String(date.getDate())
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${dayOfWeek} ${day} de ${month} de ${year}`

}

export const timeAgo = (date) => {
    const now = new Date();
    // @ts-ignore
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMin < 1) return 'Hace unos segundos';
    if (diffMin < 60) return `Hace ${diffMin} minuto${diffMin !== 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 30) return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
    if (diffMonths < 12) return `Hace ${diffMonths} mes${diffMonths !== 1 ? 'es' : ''}`;
    return `Hace ${diffYears} año${diffYears !== 1 ? 's' : ''}`;
};
