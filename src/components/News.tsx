import { userIsAdmin } from "../features/userApi";
import { INews } from "../modules";
import { format } from 'date-fns';

function News(props: INews) {
    return (
        <div className="news-card">
            <div className="news-card__container">
                <img src={props.image} alt="News image" />
                <h3 className="news-card__title">{props.title}</h3>
                <p className="news-card__text">
                    {props.content}
                </p>
                <p className="news-card__date">{format(props.published_at, 'dd.MM.yyyy')}</p>
                {userIsAdmin && (<button className="btn btn__delete">Удалить</button>)}
            </div>
        </div>
    );
}

export default News