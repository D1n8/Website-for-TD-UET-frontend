
import { useNavigate } from 'react-router-dom';
import { IVacancyCard } from '../modules';
import { VACANCY_DETAILS_ROUTE } from '../consts';

export const VacancyCard = (props: IVacancyCard) => {
  const history = useNavigate()
  return (
    <div className="vacancy-card">
      <div className="vacancy-card__header">
        <h3 className="vacancy-card__title">{props.title}</h3>
      </div>
      <span className='vacancy-card__employment'>{props.employment_type}</span>

      <p className="vacancy-card__description">{props.description}</p>
      <span className="vacancy-card__salary">{props.salary_min} - {props.salary_max} рублей</span>
      <span className="vacancy-card__location">{props.location}</span>   
      <button onClick={() => history(VACANCY_DETAILS_ROUTE + `/${props.id}`)} className="vacancy-card__button vacancy-card__button_more">Подробнее</button>
      <button className="vacancy-card__button vacancy-card__button_submit">Откликнуться</button>
    </div>
  );
};