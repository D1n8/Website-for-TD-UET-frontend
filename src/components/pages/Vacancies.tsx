
import { VacancyCard } from '../VacancyCard';
import { mockVacancies } from '../../mockVacancies';

const Vacancies = () => {

  const filteredVacancies = mockVacancies;

  return (
    <div className="vacancies">
      {/* <h1 className='vacancies__title title'>Наши вакансии</h1> */}
      <div className="vacancies__container">
        <div className="filters">
          <h2 className="filters__title">Фильтры</h2>

          <div className="filter-group">
            <p className="filters__label">Ключевые слова</p>
            <input className="input" type="text" placeholder="Профессия" />
          </div>

          <div className="filter-group">
            <p className="filters__label">Формат работы</p>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="format" value="remote" />
                <span>Удалённый</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="format" value="hybrid" />
                <span>Гибрид</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="format" value="onsite" />
                <span>На месте работодателя</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <p className="filters__label">Опыт работы</p>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="experience" value="any" />
                <span>Не имеет значения</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="experience" value="noexp" />
                <span>Нет опыта</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="experience" value="1-3" />
                <span>От 1 до 3 лет</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="experience" value="3-6" />
                <span>От 3 до 6 лет</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="experience" value="6+" />
                <span>Более 6 лет</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <p className="filters__label">Зарплата от ... ₽</p>
            <input className="input" type="number" placeholder="Сумма" />
          </div>

          <button className='filter-btn-submit'>Найти</button>
        </div>

        <div className="vacancies-list">
          <h2 className="vacancies-list__title">Активные вакансии</h2>
          {filteredVacancies.length > 0 ? (
            filteredVacancies.map(vacancy => (
              <VacancyCard
                key={vacancy.id}
                id={vacancy.id}
                title={vacancy.title}
                employment_type={vacancy.employment_type}
                salary_min={vacancy.salary_min}
                salary_max={vacancy.salary_max}
                published_at={vacancy.published_at}
                location={vacancy.location}
                description={vacancy.description}
                format={vacancy.format} />
            ))
          ) : (
            <p className="no-results">Ничего не найдено. Попробуйте изменить параметры поиска.</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default Vacancies;