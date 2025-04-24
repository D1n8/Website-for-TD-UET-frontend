
import { IVacancyCard } from '../modules';

export const VacancyCard = (props: IVacancyCard) => {
  return (
    <div className="vacancy-card">
      <div className="vacancy-card__header">
        {/* <h3 className="vacancy-card__title">{props.title}</h3> */}
      </div>
      <span className='vacancy-card__employment'>{props.employment_type}</span>

      <p className="vacancy-card__description">{props.description}</p>
      <span className="vacancy-card__salary">{props.salary_min} - {props.salary_max} рублей</span>
      <span className="vacancy-card__location">{props.location}</span>   
      <button className="vacancy-card__button">Откликнуться</button>
    </div>
  );
};