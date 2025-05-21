import { useState } from "react";
import { userIsAdmin } from "../features/userApi";
import { INews } from "../modules";
import { format } from 'date-fns';
import UpdateNewsModal from "./modals/UpdateNewsModal";

function News(props: INews) {
    const [isOpenUpdateNews, setIsOpenUpdateNews] = useState(false);

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
                    {userIsAdmin && (<button className="btn btn__update" onClick={() => setIsOpenUpdateNews(true)}>Изменить</button>)}
                    {userIsAdmin && (<button className="btn btn__delete">Удалить</button>)}
                </div>
            </div>
            <UpdateNewsModal isOpen={isOpenUpdateNews} onClose={() => setIsOpenUpdateNews(false)} news={props}/>
        </div>
    );
}

export default News