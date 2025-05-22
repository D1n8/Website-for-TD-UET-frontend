import { useNavigate } from "react-router-dom";
import { useDeleteVacancyMutation } from "../../features/vacanciesApi";
import Modal from "./Modal";
import { VACANCIES_LIST_ROUTE } from "../../consts";

interface IDeleteVacancyModal {
    isOpen: boolean,
    onClose: () => void,
    id: number
}

function DeleteVacancyModal({ isOpen, onClose, id }: IDeleteVacancyModal) {
    const history = useNavigate();
    const [deleteVacancy] = useDeleteVacancyMutation();

    const handleDeleteVacancy = async () => {
        try {
            await deleteVacancy(id).unwrap();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    return (
        <>
            {
                isOpen && (
                    <Modal onClose={onClose}>
                        <h2>Вы точно хотите удалить?</h2>
                        <button className="btn" onClick={(e) => {
                            e.preventDefault();
                            handleDeleteVacancy();
                            history(VACANCIES_LIST_ROUTE);
                        }}>Удалить</button>
                        <button className="btn btn__close" onClick={() => onClose()}>Отменить</button>
                    </Modal>)
            }</>);
}

export default DeleteVacancyModal;