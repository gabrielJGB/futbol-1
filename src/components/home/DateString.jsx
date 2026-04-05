import { selectedDate } from "@/signals/home"
import { formatFullDateString } from "@/utils/time" 

const DateString = () => {

    const dateObj = selectedDate.value
    const dateString = formatFullDateString(dateObj)

    return (
        <div class={"w-full  text-center font-semibold text-shadow-xs text-shadow-black text-lg md:text-[21px] md:mt-0 mt-12 text-primary"}>
            {dateString}
        </div>
    )
}

export default DateString