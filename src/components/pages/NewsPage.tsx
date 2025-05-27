import { format } from "date-fns";
import News from "../News";
import { useState } from "react";
import CreateNewsModal from "../modals/CreateNewsModal";
import UpdateNewsModal from "../modals/UpdateNewsModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGetAllNewsQuery } from "../../features/newsApi";
import DeleteModal from "../modals/DeleteModal";

function NewsPage() {
    const [isOpenCreateNews, setIsOpenCreateNews] = useState(false);
    const [isOpenDeleteNews, setIsOpenDeleteNews] = useState(false);
    const [isOpenUpdateNews, setIsOpenUpdateNews] = useState(false);

    const { data: news, isLoading } = useGetAllNewsQuery();

    const role = useSelector((state: RootState) => state.auth.role);

    const topNews = news?.[0];
    const otherNews = news?.slice(1) || [];

    return (<div className="news-page">
        <div className="news-page__container">
            <h2 className="news-page__title">Новости</h2>
            { isLoading && <>Загружаем новости</>}

            {role == 'admin' && (<button className="btn create-news" onClick={() => setIsOpenCreateNews(true)}>Создать новость</button>)}
            {topNews &&
                <div className="main-news">
                    <div className="main-news__textbox">
                        <div className="main-news__text">
                            <h3 className="main-news__title">{topNews.title}</h3>
                            <p className="main-news__text" style={{ whiteSpace: 'pre-line' }}>{topNews.content}</p>
                        </div>

                        <p className="main-news__date">{format(topNews.published_at, 'dd.MM.yyyy')}</p>
                        {role == 'admin' && (<button className="btn btn__update" style={{maxWidth: '300px', marginBlock: '10px'}} onClick={() => setIsOpenUpdateNews(true)}>Изменить</button>)}
                        {role == 'admin' && (<button className="btn btn__delete" style={{maxWidth: '300px'}} onClick={() => setIsOpenDeleteNews(true)}>Удалить</button>)}
                    </div>

                    <img src={topNews.image} alt="News image" />
                </div>
            }

            <div className="news-page__box">
                {otherNews && otherNews.map(news =>
                    <News key={news.id}
                        id={news.id}
                        title={news.title}
                        content={news.content}
                        image={news.image}
                        published_at={news.published_at} />
                )}
            </div>
        </div>
        <CreateNewsModal isOpen={isOpenCreateNews} onClose={() => setIsOpenCreateNews(false)} />
        {topNews && <UpdateNewsModal isOpen={isOpenUpdateNews} onClose={() => setIsOpenUpdateNews(false)} news={topNews} />}
        {topNews && <DeleteModal isOpen={isOpenDeleteNews} onClose={() => setIsOpenDeleteNews(false)} type='news' id={topNews.id} />}
    </div>)
}

export default NewsPage