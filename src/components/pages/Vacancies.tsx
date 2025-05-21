
import { useGetAllVacanciesQuery } from '../../features/vacanciesApi';
import { VacancyCard } from '../VacancyCard';
import { useState } from 'react';
import { userIsAdmin } from '../../features/userApi';
import CreateVacancyModal from '../modals/CreateVacancyModal';

const Vacancies = () => {
  const { data: vacancies, isError, isLoading } = useGetAllVacanciesQuery();
  const filteredVacancies = vacancies;
  const [sum, setSum] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="vacancies">
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
            <p className="filters__label">Зарплата от {(sum && Number(sum) >= 0) ? sum : '...'} ₽</p>
            <input className="input" min={0} type="number" placeholder="Сумма" value={sum} onChange={(e) => setSum(e.target.value)}/>
          </div>

          <button className='filter-btn-submit'>Найти</button>
        </div>

        <div className="vacancies-list">
          <h2 className="vacancies-list__title">Активные вакансии: {vacancies?.length}</h2>
          {
            userIsAdmin && (<button className='btn create-vac' onClick={() => setIsOpenModal(true)}>Создать вакансию</button>)
          }
          {
            isLoading && <p>Загружаем вакансии</p>
          }
          { isError ? (
            <p className="no-results">Ничего не найдено. Попробуйте изменить параметры поиска.</p>
          ) : (
            filteredVacancies?.map(vacancy => (
              <VacancyCard
                key={vacancy.id}
                id={vacancy.id}
                title={vacancy.title}
                activities={vacancy.activities}
                employment_type={vacancy.employment_type}
                salary_min={vacancy.salary_min}
                salary_max={vacancy.salary_max}
                published_at={vacancy.published_at}
                location={vacancy.location}
                description={vacancy.description}
                format_type={vacancy.format_type} 
                experience_type={vacancy.experience_type}/>
            ))
          )}
        </div>
      </div>
      <CreateVacancyModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}/>
    </div>

  );
};

export default Vacancies;