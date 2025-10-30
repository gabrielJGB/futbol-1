import useSWR from 'swr'
import { fetcher } from '../../utils/fetcher';
import { Link } from 'preact-router/match';
import Loading from '../../components/Loading';
import { useEffect } from 'preact/hooks';


const ArticlePage = ({ id }) => {



    const { data, isLoading, error } = useSWR(
        id ? `https://now.core.api.espn.com/v1/sports/news/${id}?lang=es`
            : null,
        fetcher,
        {
            revalidateOnFocus: false,
            refreshInterval: 60000
        }
    );

    useEffect(() => {

        document.title = "Fútbol 1"

    }, [])


    if (isLoading) return (
        <div class={"w-full md:col-start-2 mt-5 "}>
            <Loading />
        </div>
    )

    if (error)
        return <div className='text-center w-full p-2'>Ha ocurrido un error</div>


    const article = data.headlines[0]
    // const published = formatDateObject(article.published)

    const regex = /https:\/\/twitter\.com\/[^\/]+\/status\/\d+/g;
    let tweets = article.story.match(regex);
    const story = article.story
        .replaceAll("<p>", "<p style=margin-top:19px>")
        .replaceAll("<h2>", "<h2 style=margin-top:20px;font-size:18px;font-weight:bold >")
        .replace("<hr>", "<hr style=margin-top:10px>")
        .replace("twitter.com", "xcancel.com")

    if (tweets)
        tweets = tweets.map((item, i) => (item.replace("twitter.com", "xcancel.com")))


    const getTagRoute = (category) => {

        if (category.type === "team") {
            return `/team/${category.team.id}`

        } else if (category.type === "athlete") {
            return `/player/${category.athlete.id}`

        } else if (category.type === "league") {
            return `/league/${category.leagueId}`
        } else
            return '/'

    }



    return (
        <div className='md:col-start-2 flex flex-col  justify-center items-center mx-auto'>
            <div className='flex flex-col gap-2 justify-center md:pt-3 pt-2 md:px-12 border-x-[1px] border-borderc shadow-lg shadow-black px-2 md:w-[80%] w-[100%] bg-b2/60 pb-2 '>
                <h1 className='md:text-3xl text-2xl  font-bold'>{article.headline}</h1>
                {/* <div className='pt-2 text-sm text-gray-300 font-bold '>{published}hs</div> */}

                <p className='text-gray-300 text-[16px] '>{article.description}</p>

                {
                    "images" in article &&

                    article.images.filter(((x) => x.type === "inline" || x.type === "header")).map((image, i) => (
                        <div key={i} className='flex flex-col gap-2'>
                            <img className='rounded-lg' src={image.url} alt="Imagen" />
                            <div className='text-xs text-gray-300'>{image.caption}</div>
                        </div>
                    ))

                }


                <p className='pt-1 px-2 md:text-[14px] text-[14px] md:leading-6 leading-6' dangerouslySetInnerHTML={{ __html: story }}></p>


                {
                    tweets != undefined &&
                    tweets.map((item, i) => (
                        <a target='_blank' href={item} className='text-sm hover:underline'> {item}</a>
                    ))
                }

                {

                    "source" in article &&
                    <div className='text-xs pt-2 text-gray-400 font-bold'>FUENTE: {article.source}</div>
                }

                <hr className='mt-2' />




                {

                    "related" in article && article.related.length > 0 &&

                    <div className='flex flex-col divide-y-[1px] divide-slate-600 my-2 mb-2'>

                        <div className='bg-black text-sm px-2 py-1 text-white font-bold'>NOTICIAS RELACIONADAS:</div>
                        {
                            article.related.map((related, i) => (
                                <Link
                                    // @ts-ignore
                                    href={`/article/${related.id}`}
                                    key={i}>
                                    <div className='px-1 pb-2 pt-2 hover:bg-green-800 text-sm transition-all'>{related.headline}</div>
                                </Link>
                            ))
                        }

                    </div>
                }

            </div>
        </div>
    )

}

export default ArticlePage