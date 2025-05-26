import { useGetAllContactRequestsQuery } from "../../features/contactRequestsApi";
import FeedbackCard from "../FeedbackCard";

function Feedback() {
    const { data: requests } = useGetAllContactRequestsQuery();

    return (
        <div className="feedback-page">
            <h2 className="feedback-page__title">Обращения</h2>
            <div className="feedback-page__container">
                {requests && 
                    requests.map((req) => (
                        <FeedbackCard key={req.id} id={req.id} surname={req.surname} name={req.name} patronymic={req.patronymic} email={req.email} phone={req.phone} message={req.message}/>
                    ))
                }
            </div>
        </div>);
}

export default Feedback;