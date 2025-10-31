import React from 'react'
import { useEffect, useRef, useState } from "preact/hooks";

const Videos = ({ videos }) => {
    const [videoUrl, setVideoUrl] = useState(null)
    const [loading, setLoading] = useState(true)
    const ref = useRef()

    if (videos === undefined || videos.length ===0)
        return <></>


    useEffect(() => {

        // const url = videos[0].url

        // fetch(`https://www.youtube.com/oembed?url=${url}&format=json`)
        //     .then(res => res.json())
        //     .then(data => { setVideoUrl(data)
        //         ref.current.innerHTML = data.html
        //      })
        //     .finally(()=>{setLoading(false)})


    }, [])






    return (

        <div class={"flex flex-col gap-5 mb-2 md:mx-0 mx-1 mt-3"} >

            {

                videos.map((video, i) => (
                    <div key={i}  className="aspect-video shadow-sm shadow-gray-800">
                        <iframe
                            
                            className="w-full h-full"
                            src={video.url.replace("watch?v=", "embed/")}
                            title="YouTube video"
                            frameBorder="0"

                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))
            }
        </div>
    )
}

export default Videos