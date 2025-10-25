import React from "react";
import ball from '../assets/ball_128x128.png'

const Loading = () => {
    
    return (
        <div className="w-full pt-10 flex flex-col items-center justify-center gap-2" role="status" aria-live="polite">
            <img src={ball} width={70} height={70} class={" animate-spin "}/>
            <span className="text-xs text-gray-300 font-semibold  select-none">CARGANDO...</span>
        </div>
    );
};

export default Loading;
