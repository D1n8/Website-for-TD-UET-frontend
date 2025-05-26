import { useParams } from "react-router-dom";
import Activity from "../Activity";
import ApplyModal from "../modals/ApplyModal";
import { useState } from "react";
import { useGetVacancyByIdQuery } from "../../features/vacanciesApi";
import { parseDate, parseEmploymentType, parseExperienceType, parseFormatType } from "../../utils";
import UpdateVacancyModal from "../modals/UpdateVacancyModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import DeleteModal from "../modals/DeleteModal";

const VacancyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const vacancyId = id ? parseInt(id) : undefined;
    const role = useSelector((state: RootState) => state.auth.role);
    const { data: vacancy, isLoading, isError } = useGetVacancyByIdQuery(vacancyId!, {
        skip: !vacancyId,
    })
    const [isOpenApply, setIsOpenApply] = useState(false);
    const [isOpenUpdateVacancy, setIsOpenUpdateVacancy] = useState(false);
    const [isOpenDeleteVacancy, setIsOpenDeleteVacancy] = useState(false);

    const formattedDate = parseDate(typeof vacancy?.published_at === 'undefined' ? '' : vacancy?.published_at);
    const format = parseFormatType(typeof vacancy?.format_type === 'undefined' ? '' : vacancy?.format_type);
    const experience = parseExperienceType(typeof vacancy?.experience_type === 'undefined' ? '' : vacancy?.experience_type);
    const employment = parseEmploymentType(typeof vacancy?.employment_type === 'undefined' ? 'full_time' : vacancy?.employment_type);

    if (isLoading) {
        return (<p>Загружаем данные о вакансии</p>);
    }

    if (isError) {
        return (<p>Вакансия не найдена</p>);
    }

    return (
        <div className="vacancy-details" key={vacancyId}>
            <div className="vacancy-details__container">
                <div className="vacancy-details__textbox">
                    <h2 className="vacancy-details__title">{vacancy?.title}</h2>

                    <p className="vacancy-details__salary">Зарплата {vacancy?.salary_min} - {vacancy?.salary_max} рублей</p>
                    <div className="activity">
                        {vacancy?.activities.map((item) =>
                            <Activity key={item} type={item} />
                        )}
                    </div>
                    <div>
                        <p className="vacancy-details__info">Формат работы: {format}</p>
                        <p className="vacancy-details__info">Опыт работы: {experience}</p>
                        <p className="vacancy-details__info">Занятость: {employment}</p>
                        <p className="vacancy-details__info">Место: г. {vacancy?.location}</p>
                    </div>

                    <div className="vacancy-details__descr box">
                        <h3 className="vacancy-details__subtitle">Информация о вакансии</h3>
                        <p className="vacancy-details__text">{vacancy?.description}</p>
                    </div>
                    <div className="vacancy-details__requirements box">
                        <h3 className="vacancy-details__subtitle">Требования</h3>
                        <ul className="vacancy-details__text list">
                            {vacancy?.requirements.map(req => (
                                <li className="requirements-item">{req}</li>
                            ))}</ul>
                    </div>
                    <div className="vacancy-details__responsibilities box">
                        <h3 className="vacancy-details__subtitle">Обязанности</h3>
                        <ul className="vacancy-details__text list">
                            {vacancy?.responsibilities.map(req => (
                                <li className="responsibilities-item">{req}</li>
                            ))}</ul>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {role === 'admin' ?
                            (
                                <div className="btns-container">
                                    <button className="btn btn__update" onClick={() => setIsOpenUpdateVacancy(true)}>Изменить</button>
                                    <button className="btn btn__delete" onClick={() => setIsOpenDeleteVacancy(true)}>Удалить</button>
                                </div>

                            )
                            :
                            (<button className="btn btn_submit" onClick={() => setIsOpenApply(true)}>Откликнуться</button>)
                        }
                        <p className="vacancy-details__published-at">Опубликовано {formattedDate}</p>
                    </div>
                </div>
            </div>
            <ApplyModal isOpen={isOpenApply} onClose={() => setIsOpenApply(false)} id={vacancy ? vacancy.id : 0}></ApplyModal>
            <DeleteModal isOpen={isOpenDeleteVacancy} onClose={() => setIsOpenDeleteVacancy(false)} id={vacancy ? vacancy.id : 0} type="vacancy"/>
            <UpdateVacancyModal isOpen={isOpenUpdateVacancy} onClose={() => setIsOpenUpdateVacancy(false)} vacancy={vacancy ? vacancy : { id: 0, title: '', description: '', salary_max: 0, salary_min: 0, location: '', format_type: 'online', employment_type: 'contract', experience_type: 'none' }} />
        </div>
    );
}

export default VacancyDetails;