// CountdownDisplay.jsx
// Componente que muestra una cuenta regresiva tipo cartel LED digital (verde sobre fondo negro)
// Recibe una prop `start` con formato "DD-MM-YYYY HH:mm"
// Uso: <CountdownDisplay start="05-11-2025 21:10" />

import React, { useEffect, useState } from "react";

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

export default function Countdown({ start }) {
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

    const diff = targetDate - now;
    const { days, hours, minutes, seconds } = getRemaining(diff);
    const started = diff <= 0;


    if (started) return;

    return (
        <div className="max-w-md mx-auto  rounded-2xl py-2 px-3 border-4 border-gray-800 shadow-[0_0_25px_#0f0_inset] flex flex-col items-center font-mono ">
            <div className="mt-0 mb-1 text-xs text-gray-100 tracking-wide">
                Empieza en
            </div>

            <div className="text-primary  flex gap-4 justify-around w-full text-4xl sm:text-5xl md:text-6xl font-bold">

                <div class={"flex flex-col items-center justify-center"}>
                    <span class={"text-5xl"}>{String(days).padStart(2, "0")}</span>
                    <span class={"text-sm mb-2 text-white tracking-wider uppercase"}>Días</span>
                </div>

                <div class={"flex flex-col items-center justify-center"}>
                    <span class={"text-5xl"}>{String(hours).padStart(2, "0")}</span>
                    <span class={"text-sm mb-2 text-white tracking-wider uppercase"}>Horas</span>
                </div>

                <div class={"flex flex-col items-center justify-center"}>
                    <span class={"text-5xl"}>{String(minutes).padStart(2, "0")}</span>
                    <span class={"text-sm mb-2 text-white tracking-wider uppercase"}>Min</span>
                </div>

                <div class={"flex flex-col items-center justify-center"}>
                    <span class={"text-5xl"}>{String(seconds).padStart(2, "0")}</span>
                    <span class={"text-sm mb-2 text-white tracking-wider uppercase"}>Seg</span>
                </div>
            </div>

            <div className="flex justify-around w-full text-gray-200 ">
            </div>
        </div>
    );
}
