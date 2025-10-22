import { useEffect, useRef } from "preact/hooks";
import SectionTitle from '../../../components/SectionTitle'

const News = ({ title, player,setTabs }) => {



    const ref = useRef()

    useEffect(() => {
        setTabs(prev => [...prev, {title,ref}])

    }, [])

    return (
        <div ref={ref} class={"flex flex-col"}>
            <SectionTitle title={title} />

            <div class={"flex md:flex-row flex-wrap flex-col gap-4"}>
                {
                    player.news.map((article) => (
                        <article class={"flex flex-col gap-1 md:w-[300px] hover:shadow hover:shadow-gray-900 md:hover:scale-105 bg-[#0c2c20] rounded-lg p-2 transition-all cursor-pointer"}>
                            <div class={"font-extrabold text-2xl "}>{article.headline}</div>
                            {
                                "images" in article &&
                                <img src={article.images[0].url} class={"rounded w-[400px]"} alt={"Imagen"} />
                            }
                            <div class={"text-xs text-gray-200 font-semibold italic "}>{article.published.slice(0, 10).replaceAll("-", "/")}</div>
                            <div class={"text-xs text-gray-200"}>{article.description}</div>
                        </article>
                    ))
                }
            </div>
        </div >
    )
}

export default News