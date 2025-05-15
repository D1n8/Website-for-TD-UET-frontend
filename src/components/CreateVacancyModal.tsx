import { useState } from "react";
import Modal from "./Modal";
import { employmentType, formatType } from "../modules";

interface CreateVacancyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IInput {
    id: number,
    name: string
}

function CreateVacancyModal({ isOpen, onClose }: CreateVacancyModalProps) {
    const [activities, setActivities] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [requirements, setRequirements] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [responsibilities, setResponsibilities] = useState<IInput[]>([{ id: Date.now(), name: '' }]);
    const [formatType, setFormatType] = useState<formatType>('office');
    const [employment, setEmployment] = useState<employmentType>('full_time');

    const handleChangeFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormatType(e.target.value as formatType);
    }

    const handleChangeEmployment = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEmployment(e.target.value as employmentType);
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
                            <input className="input" type="text" id="title" placeholder="Название" />
                            <label htmlFor="descr">Описание</label>
                            <textarea id="descr" placeholder="Описание" />
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
                                    <input className="input" type="number" id="min" placeholder="Минимальная зарплата ₽" />
                                    <input className="input" type="number" id="max" placeholder="Максимальная зарплата ₽" />
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
                                        {/* <option value="contract">Онлайн</option> */}
                                    </select>
                                </div>
                            </div>
                            <div className="location-container items-box">
                                <label htmlFor="city">Город</label>
                                <input className="input" id="city" type="text" placeholder="Город" />
                            </div>
                            <button className="btn">Сохранить</button>
                        </form>
                    </Modal>)
            }
        </>
    );
}

export default CreateVacancyModal;