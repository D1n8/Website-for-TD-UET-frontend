import { useState } from "react";
import { INews } from "../modules";
import { format } from 'date-fns';
import UpdateNewsModal from "./modals/UpdateNewsModal";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function News(props: INews) {
    const [isOpenUpdateNews, setIsOpenUpdateNews] = useState(false);
    const role = useSelector((state: RootState) => state.auth.role)

    return (
        <div className="news-card">
            <div className="news-card__container">
                <img src={props.image} alt="News image" />
                <h3 className="news-card__title">{props.title}</h3>
                <p className="news-card__text">
                    {props.content}
                </p>
                <p className="news-card__date">{format(props.published_at, 'dd.MM.yyyy')}</p>
                <div className="btns-container">
                    {role === 'admin' && (<button className="btn btn__update" onClick={() => setIsOpenUpdateNews(true)}>Изменить</button>)}
                    {role === 'admin' && (<button className="btn btn__delete">Удалить</button>)}
                </div>
            </div>
            <UpdateNewsModal isOpen={isOpenUpdateNews} onClose={() => setIsOpenUpdateNews(false)} news={props}/>
        </div>
    );
}

export default News