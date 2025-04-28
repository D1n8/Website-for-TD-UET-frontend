import { useParams } from "react-router-dom";
import { mockVacancies } from "../../mockVacancies";

const VacancyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const vacancyId = Number(id);
    const vacancy = mockVacancies.find(vacancy => vacancy.id === vacancyId)

    return (
        <div className="vacancy-details">
            <div className="vacancy-details__container">
                <h2 className="vacancy-details__title">{vacancy?.title}</h2>
                
            </div>
        </div>
    )
}

export default VacancyDetails