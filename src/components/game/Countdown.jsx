import React, { useEffect, useState } from "react";

export default function Countdown({ start,showCountdown }) {

    if(!showCountdown)
        return <></>

    const targetDate = parseDateDMY(start);
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!targetDate) {
        return (
            <div className="p-4 bg-black text-green-400 text-center rounded-xl font-mono">
                Fecha inválida (usa formato DD-MM-YYYY HH:mm)
            </div>
        );
    }

    // @ts-ignore
    const diff = targetDate - now;
    const { days, hours, minutes, seconds } = getRemaining(diff);
    const started = diff <= 0;


    if (started) return;

    //shadow-[0_0_25px_#0f0_inset]
    return (
        <div className="py-2 px-0  flex flex-col font-mono ">

            <div className="mt-0 mb-1 w-full text-center text-xs text-gray-100 tracking-widest">
                Empieza en
            </div>

            <div className="text-primary mx-auto text-shadow-black rounded bg-black text-shadow-xs flex gap-0 divide-x divide-primary/20 text-4xl sm:text-5xl md:text-6xl ">

                <div class={"flex flex-col items-center justify-center w-[84px] "}>
                    <span class={"text-7xl font-digital"}>{String(days)}</span>
                    <span class={"text-sm mb-2 text-white tracking-wider uppercase"}>Días</span>
                </div>

                <div class={"flex flex-col items-center justify-center w-[84px] "}>
                    <span class={"text-7xl font-digital"}>{String(hours)}</span>
                    <span class={"text-sm mb-2 text-white tracking-wider uppercase"}>Horas</span>
                </div>

                <div class={"flex flex-col items-center justify-center w-[84px] "}>
                    <span class={"text-7xl font-digital"}>{String(minutes)}</span>
                    <span class={"text-sm mb-2 text-white tracking-wider uppercase"}>Min</span>
                </div>

                <div class={"flex flex-col items-center justify-center w-[84px] "}>
                    <span class={"text-7xl font-digital "}>{String(seconds)}</span>
                    <span class={"text-sm mb-2  text-white tracking-wider uppercase"}>Seg</span>
                </div>
            </div>

            <div className="flex justify-around w-full text-gray-200 ">
            </div>
        </div>
    );
}





const parseDateDMY = (str) => {
    if (!str) return null;
    const [datePart, timePart] = str.split(" ");
    if (!datePart || !timePart) return null;
    const [d, m, y] = datePart.split("-").map(Number);
    const [hh, mm] = timePart.split(":").map(Number);
    if ([d, m, y, hh, mm].some((v) => Number.isNaN(v))) return null;
    return new Date(y, m - 1, d, hh, mm);
};

const getRemaining = (ms) => {
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
};
