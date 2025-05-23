import { useState } from "react";
import { IContactRequests } from "../modules";
import DeleteModal from "./modals/DeleteModal";

function FeedbackCard(props: IContactRequests) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="feedback-card">
            <div className="feedback-card__container">
                <div className="feedback-card__who">
                    <p className="feedback-card__name">{props.surname}</p>
                    <p className="feedback-card__name">{props.name}</p>
                    <p className="feedback-card__name">{props.patronymic}</p>
                </div>
                <div className="feedback-card__contacts-box">
                    <p className="feedback-card__contact">{props.email}</p>
                    <p className="feedback-card__contact">{props.phone}</p>
                </div>
                <p className="feedback-card__msg">
                    {props.message}
                </p>
                <button className="btn btn__delete" onClick={() => setIsOpen(true)}>Удалить</button>
            </div>
            <DeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} id={props.id} type="request"/>
        </div>
    );
}

export default FeedbackCard;