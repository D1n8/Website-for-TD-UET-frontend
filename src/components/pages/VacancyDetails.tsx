import { useParams } from "react-router-dom";
import { mockVacancies } from "../../mockVacancies";
import EmploymentType from "../EmploymentType";

const VacancyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const vacancyId = Number(id);
    const vacancy = mockVacancies.find(vacancy => vacancy.id === vacancyId)

    return (
        <div className="vacancy-details">
            <div className="vacancy-details__container">
                <h2 className="vacancy-details__title">{vacancy?.title}</h2>
                <span className="vacancy-details__salary">Зарплата от {vacancy?.salary_min} рублей</span>
                {vacancy?.employment_type.map((item) => 
                    <EmploymentType type={ item }/>
                )}
            </div>
        </div>
    )
}

export default VacancyDetails