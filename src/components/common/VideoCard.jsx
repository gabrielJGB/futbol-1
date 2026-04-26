import { useEffect, useState } from 'preact/hooks'
// import { convertTimestamp } from '../utils/time'
import VideoPlayer from './VideoPlayer'

const VideoCard = ({ video, muted, hd }) => {
    // video.links.mobile.source.href
    // video.links.source.HD.href

    const [url, setUrl] = useState(hd ? video.links.source.HD.href : video.links.mobile.source.href)
    // const timestamp = convertTimestamp(video.originalPublishDate)
    // const date = timestamp.DDMMYYYY
    // const time = timestamp.time
    // const published = `${date} ${time}`


    useEffect(() => {
        setUrl(hd ? video.links.source.HD.href : video.links.mobile.source.href)
        document.title = `Fútbol 1 - ${video.headline}`
    }, [hd])


    return (
        <div className=' flex flex-col gap-2   md:pt-2 '>
            <VideoPlayer videoUrl={url} thumbnail={video.thumbnail} muted={muted} autoPlay={true} />

            <div class={"rounded-lg md:bg-b2/40 p-2"}>

                <div className='text-[11px] text-gray-300 mb-1'>{new Date(video.originalPublishDate).toLocaleString()}</div>
                {
                    "headline" in video &&
                    <div className='text-2xl text-primary font-bold mb-2'>{video.headline}</div>
                }

                {
                    "description" in video &&
                    <div className='text-gray-200 text-sm  pb-1 leading-5'>{video.description}</div>
                }
            </div>
        </div>
    )
}

export default VideoCard