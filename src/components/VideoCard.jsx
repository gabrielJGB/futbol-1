import { useEffect, useState } from 'preact/hooks'
import { convertTimestamp } from '../utils/time'
import VideoPlayer from './VideoPlayer'

const VideoCard = ({ video, muted, hd }) => {
    // video.links.mobile.source.href
    // video.links.source.HD.href

    const [url, setUrl] = useState(hd ? video.links.source.HD.href : video.links.mobile.source.href)
    const timestamp = convertTimestamp(video.originalPublishDate)
    const date = timestamp.DDMMYYYY
    const time = timestamp.time
    const published = `${date} ${time}`


    useEffect(() => {
        setUrl(hd ? video.links.source.HD.href : video.links.mobile.source.href)
    }, [hd])
    

    return (
        <div className='shadow flex flex-col gap-1 shadow-gray-800  bg-slate-800 md:rounded-lg rounded-none pt-2'>


            {
                "headline" in video &&
                <div className='text-[18px] font-bold px-2'>{video.headline}</div>
            }

            <div className='text-[11px] px-2 font-bold text-gray-300'>{published}</div>    

            {
                "description" in video &&
                <div className='text-gray-300 md:text-xs text-[11px] px-2 pb-1 leading-4'>{video.description}</div>
            }


            <VideoPlayer videoUrl={url} thumbnail={video.thumbnail} muted={muted} autoPlay={muted} />
        </div>
    )
}

export default VideoCard