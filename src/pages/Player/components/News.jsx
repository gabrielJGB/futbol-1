import { useEffect, useRef } from "preact/hooks";
import SectionTitle from '../../../components/SectionTitle'
import { Link } from "preact-router/match";

const News = ({ title, player, setTabs }) => {



    const ref = useRef()

    useEffect(() => {
        setTabs(prev => [...prev, { title, ref }])

    }, [])

    return (
        <div ref={ref} class={"flex flex-col"}>
            <SectionTitle title={title} />

            <div class={"flex md:flex-row flex-wrap flex-col gap-4"}>
                {
                    player.news.map((article) => (
                        <Link
                            // @ts-ignore
                            href={`/article/${article.id}`}
                            class={"flex flex-col gap-1 md:w-[300px] shadow shadow-black border-[1px] border-transparent hover:border-primary active:border-primary bg-[#0c2c20] rounded-lg p-2 transition-all cursor-pointer"}>
                            <div class={"font-extrabold text-2xl "}>{article.headline}</div>
                            {
                                "images" in article &&
                                <img src={article.images[0].url} class={"mx-auto rounded w-[400px]"} alt={"Imagen"} />
                            }
                            <div class={"text-xs text-gray-200 font-semibold italic "}>{article.published.slice(0, 10).replaceAll("-", "/")}</div>
                            <div class={"text-xs text-gray-200"}>{article.description}</div>
                        </Link>
                    ))
                }
            </div>
        </div >
    )
}

export default News