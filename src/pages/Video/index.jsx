import React from 'react'

import { useRoute } from 'preact-iso'
import { useVideo } from '@/hooks/useVideo'
import VideoCard from '@/components/common/VideoCard'
import { Loading } from '@/components/common'

const VideoPage = () => {

  const { params } = useRoute()
  const { data, loading, error } = useVideo(params.id)

  if (loading)
    return <div className='md:col-start-2 '>
      <Loading />
    </div>

  if (!("videos" in data) && data.videos.length > 0)
    return <div className='p-2'>Ha ocurrido un error</div>


  return (
    <div className='md:col-start-2 mx-auto md:w-[80%] w-[100%] pb-50 rounded'>

      <VideoCard hd={true} video={data.videos[0]} muted={false} />

    </div>
  )
}

export default VideoPage