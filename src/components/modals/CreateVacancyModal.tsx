import { useState } from "react";
import Modal from "./Modal";
import { employmentType, formatType, experienceType } from "../../modules";
import { useCreateVacancyMutation } from "../../features/vacanciesApi";

interface CreateVacancyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface IInput {
    id: number,
    name: string
}

function CreateVacancyModal({ isOpen, onClose }: CreateVacancyModalProps) {
    const [title, setTitle] = useState<string>('');
    const [descr, setDescr] = useState<string>('');
    const [minSalary, setMinSalary] = useState<number>();
    const [maxSalary, setMaxSalary] = useState<number>();
    const [location, setLocation] = useState<string>('');
    const [activities, setActivities] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [requirements, setRequirements] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [responsibilities, setResponsibilities] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [formatType, setFormatType] = useState<formatType>('office');
    const [employment, setEmployment] = useState<employmentType>('full_time');
    const [experience, setExperience] = useState<experienceType>('');

    const [createVacancy] = useCreateVacancyMutation();

    const handleCreateVacancy = async () => {
        try {
            await createVacancy({
                title: title,
                description: descr,
                salary_min: minSalary,
                salary_max: maxSalary,
                location: location,
                activities: activities.map(act => act.name),
                requirements: requirements.map(req => req.name),
                responsibilities: responsibilities.map(res => res.name),
                format_type: formatType,
                employment_type: employment,
                experience_type: experience
            }).unwrap();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

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
                        <button className="close" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                            </svg>
                        </button>
                        <h2 className="modal__title">Создать вакансию</h2>
                        <form className="create-vacancy-modal">
                            <label htmlFor="title">Название</label>
                            <input className="input" type="text" id="title" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label htmlFor="descr">Описание</label>
                            <textarea id="descr" placeholder="Описание" value={descr} onChange={(e) => setDescr(e.target.value)} />
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
                                    <input className="input" type="number" id="min" placeholder="Минимальная зарплата ₽" value={minSalary} onChange={(e) => setMinSalary(Number(e.target.value))} />
                                    <input className="input" type="number" id="max" placeholder="Максимальная зарплата ₽" value={maxSalary} onChange={(e) => setMaxSalary(Number(e.target.value))} />
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
                                    <input className="input" id="city" type="text" placeholder="Город" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>

                                <div className="items-box experience-container">
                                    <label htmlFor="exp">Опыт работы</label>
                                    <select className="type-selector" id="exp" value={experience} onChange={hanldeChangeExperience}>
                                        <option value="none">Не имеет значения</option>
                                        <option value="zero">Нет опыта</option>
                                        <option value='one_to_three_years'>От 1 до 3 лет</option>
                                        <option value="three_to_six_years">От 3 до 6 лет</option>
                                        <option value="more_six_years">Более 6 лет</option>
                                    </select>
                                </div>
                            </div>

                            <button className="btn" onClick={(e) => {
                                e.preventDefault();
                                handleCreateVacancy();
                                onClose();
                            }}>Сохранить</button>
                        </form>
                    </Modal>)
            }
        </>
    );
}

export default CreateVacancyModal;