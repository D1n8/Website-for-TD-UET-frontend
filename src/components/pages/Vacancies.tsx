
import { useGetAllVacanciesQuery } from '../../features/vacanciesApi';
import { VacancyCard } from '../VacancyCard';
import { useState } from 'react';
import CreateVacancyModal from '../modals/CreateVacancyModal';
import { experienceType, formatType } from '../../modules';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Vacancies = () => {
  const [keyWords, setKeyWords] = useState<string>('');
  const [minSalary, setMinSalary] = useState<string>('');
  const [formatType, setFormatType] = useState<formatType>('');
  const [location, setLocation] = useState<string>('');
  const [experience, setExperience] = useState<experienceType>('none');

  const role = useSelector((state: RootState) => state.auth.role);

  const [isOpenModal, setIsOpenModal] = useState(false);
  
  const { data: vacancies, isError, isLoading } = useGetAllVacanciesQuery({
    title: keyWords,
    min_salary: minSalary ? Number(minSalary) : undefined,
    format_type: formatType,
    location: location,
    experience_type: experience
  });

  function handleReset(){
    setKeyWords('');
    setMinSalary('');
    setFormatType('');
    setLocation('');
    setExperience('none')
  }

  return (
    <div className="vacancies">
      <div className="vacancies__container">
        <div className="filters">
          <h2 className="filters__title">Фильтры</h2>

          <div className="filter-group">
            <p className="filters__label">Ключевые слова</p>
            <input className="input" type="text" placeholder="Профессия" value={keyWords} onChange={(e) => setKeyWords(e.target.value)} />
          </div>

          <div className="filter-group">
            <p className="filters__label">Формат работы</p>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="format" value="online" checked={formatType === 'online'} onChange={(e) => setFormatType(e.target.value as formatType)} />
                <span>Удалённый</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="format" value="hybrid" checked={formatType === 'hybrid'} onChange={(e) => setFormatType(e.target.value as formatType)} />
                <span>Гибрид</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="format" value="office" checked={formatType === 'office'} onChange={(e) => setFormatType(e.target.value as formatType)} />
                <span>Офис</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="format" value="" checked={formatType === ''} onChange={(e) => setFormatType(e.target.value as formatType)} />
                <span>Не важен</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <div className="filters__label">Город</div>
            <input className="input" type="text" placeholder="Город" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="filter-group">
            <p className="filters__label">Опыт работы</p>
            <div className="radio-group">
              <label className="radio-option">
                <input type="radio" name="experience" value="none" checked={experience === 'none'} onChange={(e) => setExperience(e.target.value as experienceType)}/>
                <span>Не имеет значения</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="experience" value="zero" checked={experience === 'zero'} onChange={(e) => setExperience(e.target.value as experienceType)}/>
                <span>Нет опыта</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="experience" value="one_to_three_years" checked={experience === 'one_to_three_years'} onChange={(e) => setExperience(e.target.value as experienceType)}/>
                <span>От 1 до 3 лет</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="experience" value="three_to_six_years" checked={experience === 'three_to_six_years'} onChange={(e) => setExperience(e.target.value as experienceType)}/>
                <span>От 3 до 6 лет</span>
              </label>
              <label className="radio-option">
                <input type="radio" name="experience" value="more_six_years" checked={experience === 'more_six_years'} onChange={(e) => setExperience(e.target.value as experienceType)}/>
                <span>Более 6 лет</span>
              </label>
            </div>
          </div>

          <div className="filter-group">
            <p className="filters__label">Зарплата от {(minSalary && Number(minSalary) >= 0) ? minSalary : '...'} ₽</p>
            <input className="input" min={0} type="number" placeholder="Сумма" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} />
          </div>

          <button className='filter-btn-submit' onClick={() => handleReset()}>Сбросить</button>
        </div>

        <div className="vacancies-list">
          <h2 className="vacancies-list__title">Активные вакансии: {vacancies?.length}</h2>
          {
            role === 'admin' && (<button className='btn create-vac' onClick={() => setIsOpenModal(true)}>Создать вакансию</button>)
          }
          {
            isLoading && <p>Загружаем вакансии</p>
          }
          {isError || vacancies?.length == 0 ? (
            <p className="no-results">Ничего не найдено. Попробуйте изменить параметры поиска.</p>
          ) : (
            vacancies?.map(vacancy => (
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
                experience_type={vacancy.experience_type} />
            ))
          )}
        </div>
      </div>
      <CreateVacancyModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </div>
  );
};

export default Vacancies;