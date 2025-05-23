import { useState } from "react";
import { INews } from "../modules";
import { format } from 'date-fns';
import UpdateNewsModal from "./modals/UpdateNewsModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import DeleteModal from "./modals/DeleteModal";

function News(props: INews) {
    const [isOpenUpdateNews, setIsOpenUpdateNews] = useState(false);
    const [isOpenDeleteNews, setIsOpenDeleteNews] = useState(false);

    const role = useSelector((state: RootState) => state.auth.role)
    const imgUrl = props.image ? props.image.replace(/^http:/, 'https:') : '';


    return (
        <div className="news-card">
            <div className="news-card__container">
                {imgUrl && <img src={imgUrl} alt="News image" />}

                <h3 className="news-card__title">{props.title}</h3>
                <p className="news-card__text">
                    {props.content}
                </p>
                <p className="news-card__date">{format(props.published_at, 'dd.MM.yyyy')}</p>
                <div className="btns-container">
                    {role === 'admin' && (<button className="btn btn__update" onClick={() => setIsOpenUpdateNews(true)}>Изменить</button>)}
                    {role === 'admin' && (<button className="btn btn__delete" onClick={() => setIsOpenDeleteNews(true)}>Удалить</button>)}
                </div>
            </div>
            <UpdateNewsModal isOpen={isOpenUpdateNews} onClose={() => setIsOpenUpdateNews(false)} news={props} />
            <DeleteModal isOpen={isOpenDeleteNews} onClose={() => setIsOpenDeleteNews(false)} type='news' id={props.id} />

        </div>
    );
}

export default News