
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
          <input
            type="text"
            placeholder="Должность или ключевые слова"
          />
          <input
            type="number"
            placeholder="Зарплата от ($)"
          />
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
                description={vacancy.description} />
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