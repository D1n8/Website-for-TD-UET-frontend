import { useState } from "react";
import Modal from "./Modal";
import { IInput } from "./CreateVacancyModal";
import { formatType, employmentType, experienceType, IVacancy } from "../../modules";

interface UpdateVacancyModal {
    isOpen: boolean,
    onClose: () => void,
    vacancy: IVacancy | {title: '', description: '', salary_max: 0, salary_min: 0}//ДОПОЛНИТЬ
}

function UpdateVacancyModal({isOpen, onClose, vacancy}: UpdateVacancyModal) {
    const [title, setTitle] = useState<string>(vacancy?.title);
    const [descr, setDescr] = useState<string>(vacancy.description);
    const [minSalary, setMinSalary] = useState<number>(vacancy.salary_min);
    const [maxSalary, setMaxSalary] = useState<number>(vacancy.salary_max); 
    // брать состояние из вакансии
    const [activities, setActivities] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [requirements, setRequirements] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [responsibilities, setResponsibilities] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [formatType, setFormatType] = useState<formatType>('office');
    const [employment, setEmployment] = useState<employmentType>('full_time');
    const [experience, setExperience] = useState<experienceType>('none');

    const handleChangeFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormatType(e.target.value as formatType);
    }

    const handleChangeEmployment = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEmployment(e.target.value as employmentType);
    }

    const hanldeChangeExperience = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setExperience(e.target.value as experienceType);
    }

    // требования
    const addRequirement = () => {
        setRequirements([...requirements, { id: Date.now(), name: '' }]);
    }

    const updateRequirement = (id: number, name: string) => {
        setRequirements(requirements.map((req) => (
            req.id === id ? { ...req, name: name } : req
        )));
    }

    const removeRequirement = (id: number) => {
        setRequirements(requirements.filter((req) => req.id !== id));
    }

    // обязанности
    const addResposibility = () => {
        setResponsibilities([...responsibilities, { id: Date.now(), name: '' }])
    }

    const updateResposibility = (id: number, name: string) => {
        setResponsibilities(responsibilities.map((res) => (
            res.id === id ? { ...res, name: name } : res
        )));
    }

    const removeResposibility = (id: number) => {
        setResponsibilities(responsibilities.filter((res) => res.id !== id));
    }

    //сферы деятельности
    const addActivity = () => {
        setActivities([...activities, { id: Date.now(), name: '' }]);
    }

    const updateActivity = (id: number, name: string) => {
        setActivities(activities.map((act) => (
            act.id === id ? { ...act, name: name } : act
        )));
    }

    const removeActivity = (id: number) => {
        setActivities(activities.filter((act) => act.id !== id));
    }

    return (
        <>
            {
                isOpen && (
                    <Modal onClose={onClose}>
                        <h2 className="modal__title">Создать вакансию</h2>
                        <form className="create-vacancy-modal" action="POST">
                            <label htmlFor="title">Название</label>
                            <input className="input" type="text" id="title" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <label htmlFor="descr">Описание</label>
                            <textarea id="descr" placeholder="Описание" value={descr} onChange={(e) => setDescr(e.target.value)}/>
                            <div className="top-container">
                                <div id="requirements" className="items-box requirements-box">
                                    <p>Требования</p>
                                    {
                                        requirements.map((req) => (
                                            <div className="requirement-container" key={req.id}>
                                                <input className="input input__spec" type="text" placeholder="Требование" onChange={(e) => updateRequirement(req.id, e.target.value)} />
                                                <button className="delete-btn" type='button' onClick={() => removeRequirement(req.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                                        <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))
                                    }
                                    <button type="button" className="btn add-btn" onClick={addRequirement}>Добавить требование</button>
                                </div>

                                <div className="items-box responsibilities-box">
                                    <p>Обязанности</p>
                                    {
                                        responsibilities.map((res) => (
                                            <div className="resposibility-container" key={res.id}>
                                                <input className="input input__spec" type="text" placeholder="Обязанность" onChange={(e) => updateResposibility(res.id, e.target.value)} />
                                                <button className="delete-btn" type='button' onClick={() => removeResposibility(res.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                                        <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))
                                    }
                                    <button type="button" className="btn add-btn" onClick={addResposibility}>Добавить обязанность</button>
                                </div>
                            </div>

                            <div className="top-container">
                                <div className="items-box salary-container">
                                    <p>Зарплата</p>
                                    <input className="input" type="number" id="min" placeholder="Минимальная зарплата ₽" value={minSalary} onChange={(e) => setMinSalary(Number(e.target.value))}/>
                                    <input className="input" type="number" id="max" placeholder="Максимальная зарплата ₽" value={maxSalary} onChange={(e) => setMaxSalary(Number(e.target.value))}/>
                                </div>

                                <div className="items-box activities-box">
                                    <p>Виды деятельности</p>
                                    {
                                        activities.map((act) => (
                                            <div className="activity-container" key={act.id}>
                                                <input className="input input__spec" type="text" placeholder="Вид деятельности" onChange={(e) => updateActivity(act.id, e.target.value)} />
                                                <button className="delete-btn" type='button' onClick={() => removeActivity(act.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                                                        <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))
                                    }
                                    <button type="button" className="btn add-btn" onClick={addActivity}>Добавить деятельность</button>
                                </div>
                            </div>
                            <div className="top-container">
                                <div className="format-container items-box">
                                    <label htmlFor="format">Формат работы</label>
                                    <select className="type-selector" id="format" value={formatType} onChange={handleChangeFormat}>
                                        <option value="office">Офис</option>
                                        <option value="hybrid">Гибрид</option>
                                        <option value="online">Онлайн</option>
                                    </select>
                                </div>

                                <div className="employment-container items-box">
                                    <label htmlFor="employment">Занятость</label>
                                    <select className="type-selector" id="employment" value={employment} onChange={handleChangeEmployment}>
                                        <option value="full_time">Полная</option>
                                        <option value="part_time">Частичная</option>
                                        <option value="intern">Стажировка</option>
                                    </select>
                                </div>
                            </div>

                            <div className="top-container">
                                <div className="location-container items-box">
                                    <label htmlFor="city">Город</label>
                                    <input className="input" id="city" type="text" placeholder="Город" />
                                </div>

                                <div className="items-box experience-container">
                                    <label htmlFor="exp">Опыт работы</label>
                                    <select className="type-selector" id="exp" value={experience} onChange={hanldeChangeExperience}>
                                        <option value="none">Не имеет значения</option>
                                        <option value="zero">Нет опыта</option>
                                        <option value="1-3_years">От 1 до 3 лет</option>
                                        <option value="3-6_years">От 3 до 6 лет</option>
                                        <option value="more_6_years">Более 6 лет</option>
                                    </select>
                                </div>
                            </div>

                            <button className="btn">Сохранить</button>
                        </form>
                    </Modal>)
            }
        </>
    );
}

export default UpdateVacancyModal;