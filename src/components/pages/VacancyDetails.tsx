import { useParams } from "react-router-dom";
import Activity from "../Activity";
import ApplyModal from "../modals/ApplyModal";
import { useState } from "react";
import { useGetVacancyByIdQuery } from "../../features/vacanciesApi";
import { parseDate, parseFormatType } from "../../utils";
import { userIsAdmin } from "../../features/userApi";
import UpdateVacancyModal from "../modals/UpdateVacancyModal";

const VacancyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const vacancyId = id ? parseInt(id) : undefined;
    const { data: vacancy, isLoading, isError } = useGetVacancyByIdQuery(vacancyId!, {
        skip: !vacancyId,
    })
    const [isOpenApply, setIsOpenApply] = useState(false);
    const [isOpenUpdateVacancy, setIsOpenUpdateVacancy] = useState(false);

    const formattedDate = parseDate(typeof vacancy?.published_at === 'undefined' ? '' : vacancy?.published_at);
    const format = parseFormatType(typeof vacancy?.format_type === 'undefined' ? 'office' : vacancy?.format_type);

    if (isLoading) {
        return (<p>Загружаем данные о вакансии</p>);
    }

    if (isError) {
        return (<p>Вакансия не найдена</p>);
    }

    return (
        <div className="vacancy-details" key={vacancyId}>
            {/* <button className="btn btn__back">Вернуться</button> */}
            <div className="vacancy-details__container">
                <div className="vacancy-details__textbox">
                    <h2 className="vacancy-details__title">{vacancy?.title}</h2>
                    {!userIsAdmin &&
                        <svg className='favorite' width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.7998 2.21876C18.3464 3.7654 18.4057 6.25412 16.9343 7.87258L9.56199 15.9815L2.19062 7.87256C0.719294 6.2541 0.778548 3.76534 2.32519 2.2187C4.05211 0.491783 6.89622 0.649585 8.42187 2.55665L9.5625 3.9819L10.7021 2.55649C12.2278 0.649423 15.0729 0.491839 16.7998 2.21876Z" stroke="#B0B0B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }

                    <p className="vacancy-details__salary">Зарплата {vacancy?.salary_min} - {vacancy?.salary_max} рублей</p>
                    <div className="activity">
                        {vacancy?.activities.map((item) =>
                            <Activity key={item} type={item} />
                        )}
                    </div>
                    <div>
                        <p className="vacancy-details__info">Формат работы: {format}</p>
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
                        {userIsAdmin ?
                            (
                                <div className="btns-container">
                                    <button className="btn btn__update" onClick={() => setIsOpenUpdateVacancy(true)}>Изменить</button>
                                    <button className="btn btn__delete">Удалить</button>
                                </div>

                            )
                            :
                            (<button className="btn btn_submit" onClick={() => setIsOpenApply(true)}>Откликнуться</button>)
                        }
                        <p className="vacancy-details__published-at">Опубликовано {formattedDate}</p>
                    </div>
                </div>
            </div>
            <ApplyModal isOpen={isOpenApply} onClose={() => setIsOpenApply(false)}></ApplyModal>
            <UpdateVacancyModal isOpen={isOpenUpdateVacancy} onClose={() => setIsOpenUpdateVacancy(false)} vacancy={vacancy ? vacancy : { title: '', description: '', salary_max: 0, salary_min: 0, location: '', format_type: 'online', employment_type: 'contract', experience_type: 'none' }} />
        </div>
    );
}

export default VacancyDetails;