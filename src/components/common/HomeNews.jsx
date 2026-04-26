import Loading from '@/components/common/Loading'
import { useHomeArticles } from '@/hooks/useHomeArticles'
import { showNews } from '@/signals/home'
import { timeAgo } from '@/utils/time'
import { NewspaperIcon } from 'lucide-preact'
import { Link } from 'preact-router/match'
import React from 'react'
import useSWR from 'swr'

const HomeNews = ({ date }) => {


    const { data, error, loading } = useHomeArticles(new Date().getMinutes() % 10)

    if (loading)
        return (
            <Loading />
        )

    if (error)
        return (<></>)



    return (

        // col-start-2 md:overflow-hidden overflow-y-scroll z-1 md:block flex justify-between flex-col md:p-0 p-2 md:bg-transparent bg-[rgb(0,0,0,0.9)] md:h-auto h-[100vh] md:w-full  transition-all fixed right-0 pb-30 ${showNews.value ? "md:relative " : "md:relative -bottom-[100%]"}

        //  ${showCalendar.value ? "md:static -right-[0%] backdrop-blur-xs " : "md:static -right-[100%] backdrop-blur-none "} bg-black/50 transition-all flex  flex-col items-center justify-center md:relative max-lg:landscape:fixed fixed h-[100vh]  w-full md:flex-none  md:bg-transparent  pt-18 md:pt-5 md:h-max  md:rounded-lg z-100 

        <div className={`col-start-2 md:overflow-hidden overflow-y-scroll z-1 md:block flex justify-between flex-col md:p-0 p-2 md:bg-transparent bg-[rgb(0,0,0,0.9)] md:h-auto h-[100vh] md:w-full  transition-all fixed right-0 pb-30 ${showNews.value ? "md:relative -bottom-[0%]" : "md:relative -bottom-[100%]"} md:pt-0 pt-[50px] md:mt-2`}
        >




            <h2 className='font-semibold text-[20px] text-primary my-2'>Últimas noticias</h2>
            <div className='flex flex-col md:gap-1 gap-1'>

                {
                    data?.articles.filter(x => x.categories[0].description != "Copa ORO").map((article, i) => (

                        <Link key={i}
                            // @ts-ignore
                            href={`/${article.type === "dStory" ? "article" : "video"}/${article.id}`} className='flex flex-row items-start gap-2 p-2 cursor-pointer bg-b2 md:hover:bg-b4 active:bg-b4/80 rounded transition-all'>

                            {/* <img
                                src={article.images[0].url}
                                className='w-[50px] h-[40px] rounded ' alt='Imagen noticia'
                            /> */}

                            <div className='flex flex-col gap-2 w-full'>
                                <div className='flex flex-row items-center justify-between gap-1'>


                                    <div className='text-gray-400 text-[12px]'>

                                        {article.categories.find(c => c.type === "league" && c.description != "Fútbol")?.description ?? article.categories[0].description}
                                    </div>
                                    <div className='text-gray-400 text-[11px] '>
                                        {timeAgo(new Date(article.published))}
                                    </div>

                                </div>

                                <div className='md:text-sm  font-semibold text-sm flex flex-row items-center gap-1'>
                                    {article.headline}
                                </div>
                            </div>

                        </Link>
                    ))
                }
            </div>

        </div >
    )
}

export default HomeNews