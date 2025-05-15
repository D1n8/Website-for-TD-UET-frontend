
import { useNavigate } from 'react-router-dom';
import { IVacancyCard } from '../modules';
import { VACANCY_DETAILS_ROUTE } from '../consts';
import { useState } from 'react';
import ApplyModal from './ApplyModal';
import Activity from './Activity';
import { parseDate, parseFormatType } from '../utils';

export const VacancyCard = (props: IVacancyCard) => {
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  const formattedDate = parseDate(props.published_at);
  const format = parseFormatType(props.format_type);

  return (
    <div className="vacancy-card">
      <div className="vacancy-card__container">
        <h3 className="vacancy-card__title">{props.title}</h3>
        <svg className='favorite' width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.7998 2.21876C18.3464 3.7654 18.4057 6.25412 16.9343 7.87258L9.56199 15.9815L2.19062 7.87256C0.719294 6.2541 0.778548 3.76534 2.32519 2.2187C4.05211 0.491783 6.89622 0.649585 8.42187 2.55665L9.5625 3.9819L10.7021 2.55649C12.2278 0.649423 15.0729 0.491839 16.7998 2.21876Z" stroke="#B0B0B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <p className="vacancy-card__salary">Зарплата {props.salary_min} - {props.salary_max} рублей</p>
        <div className="activity">
          {props?.activities.map(item =>
            <Activity key={item} type={item} />
          )}
        </div>

        <p className="vacancy-card__description">{props.description}</p>
        <p className="vacancy-card__location">г. {props.location}</p>
        <p className="vacancy-card__format">{format}</p>

        <div className="btns-container">
          <button onClick={() => history(VACANCY_DETAILS_ROUTE + `/${props.id}`)} className="btn btn_more">Подробнее</button>
          <button className="btn btn_submit" onClick={() => setIsOpen(true)}>Откликнуться</button>
        </div>
        <p className="date">{formattedDate}</p>
      </div>
      <ApplyModal isOpen={isOpen} onClose={() => setIsOpen(false)}></ApplyModal>
    </div>
  );
};