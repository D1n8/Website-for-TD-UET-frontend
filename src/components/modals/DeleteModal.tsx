import { useNavigate } from "react-router-dom";
import { useDeleteVacancyMutation } from "../../features/vacanciesApi";
import Modal from "./Modal";
import { VACANCIES_LIST_ROUTE } from "../../consts";
import { useDeleteNewsMutation } from "../../features/newsApi";

interface IDeleteModal {
    isOpen: boolean,
    onClose: () => void,
    id: number,
    type: 'vacancy' | 'news'
}

function DeleteModal({ isOpen, onClose, id, type }: IDeleteModal) {
    const history = useNavigate();
    const [deleteVacancy] = useDeleteVacancyMutation();
    const [deleteNews] = useDeleteNewsMutation();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (type === 'vacancy') {
                await deleteVacancy(id).unwrap();
                history(VACANCIES_LIST_ROUTE);
            } else if (type === 'news'){
                await deleteNews(id).unwrap();
                onClose()
            }
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
                        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Вы точно хотите удалить?</h2>
                        <div style={{ display: "flex", justifyContent: 'center' }}>
                            <button className="btn btn__delete" style={{ marginRight: '20px' }} onClick={(e) => {
                                handleDelete(e);
                            }}>Удалить</button>
                            <button className="btn btn__close" onClick={() => onClose()}>Отменить</button>
                        </div>
                    </Modal>)
            }</>);
}

export default DeleteModal;