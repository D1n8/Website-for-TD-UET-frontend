
import { VacancyCard } from '../VacancyCard';
import { IVacancy } from '../../modules';

// заглушка потом заменим на апи
const mockVacancies: IVacancy[] = [
  {
    id: 1,
    title: 'Фронтендер',
    location: 'Москва, офис',
    description: 'Разработка пользовательских интерфейсов для корпоративных решений',
    requirements: 'Знание JS, HTML, CSS',
    responsibilities: 'Верстка сайтов',
    employment_type: 'Фронтенд',
    salary_min: 3000,
    salary_max: 5550,
    published_at: ''
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    location: 'Удалённо',
    description: 'Создание дизайн-систем и прототипирование интерфейсов',
    requirements: '',
    responsibilities: 'Figma, Photoshop',
    employment_type: '',
    salary_min: 0,
    salary_max: 0,
    published_at: ''
  }
];

const Vacancies = () => {

  const filteredVacancies = mockVacancies;

  return (
    <div className="vacancies">
      <h1 className='vacancies__title title'>Наши вакансии</h1>
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