import React from 'react'

const Videos = ({ videos }) => {


    if (videos === undefined)
        return <></>

    return (

        <div class={"flex flex-col gap-5 mb-2 md:mx-0 mx-1"}>

            {

                videos.map((video, i) => (
                    <div key={i} className="aspect-video shadow-sm shadow-gray-800">
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