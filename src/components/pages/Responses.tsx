import { useGetAllApplicationsQuery } from "../../features/applicationsApi";
import ResponseCard from "../ResponseCard";

function Responses() {
    const {data: applications} = useGetAllApplicationsQuery();

    return (
    <div className="responses-page">
        <div className="responses-page__container">
            { applications && 
                applications.map((res) => (
                    <ResponseCard id={res.id} name={res.name} surname={res.surname} patronymic={res.patronymic} email={res.email} phone={res.phone} resume_text={res.resume_text} resume_file={res.resume_file} vacancy={res.vacancy}/>
                ))
            }
        </div>
    </div>);
}

export default Responses;