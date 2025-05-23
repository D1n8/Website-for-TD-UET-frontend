import { useState } from "react";
import { IApplication } from "../modules";
import DeleteModal from "./modals/DeleteModal";

function ResponseCard(props: IApplication) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="response-card">
            <div className="response-card__container">
                <h3 className="response-card__who">{props.surname} {props.name} {props.patronymic}</h3>
                <p className="response-card__info"><strong>Email:</strong> {props.email}</p>
                <p className="response-card__info"><strong>Телефон:</strong> {props.phone}</p>
                <p className="response-card__resume"><strong>Резюме:</strong> {props.resume_text}</p>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <a
                        href={props.resume_file}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="response-card__file"
                    >
                        Скачать файл резюме
                    </a>
                    <button className="btn btn__delete" onClick={() => setIsOpen(true)}>Удалить</button>
                </div>
            </div>
            <DeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} type='application' id={props.id}/>
        </div>
    );
}

export default ResponseCard;
