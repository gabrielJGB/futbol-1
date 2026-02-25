import { formatFullDateString } from "@/utils/time" 

const DateString = ({ dateObj }) => {

    const dateString = formatFullDateString(dateObj)

    return (
        <div class={"w-full text-center font-semibold text-shadow-lg text-shadow-black  text-lg md:mt-0 mt-2 text-primary"}>
            {dateString}
        </div>
    )
}

export default DateString