import { useState } from "react";
import Modal from "./Modal";

interface IUpdateNewsProps {
    isOpen: boolean,
    onClose: () => void
}

function UpdateNewsModal({isOpen, onClose} : IUpdateNewsProps) {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    // добавить состояние картинки
    return (<>
        {
            isOpen && (
                <Modal onClose={onClose}>
                    <h2 className="modal__title">Создать новость</h2>
                    <form action="POST" className="news-modal">
                        <label htmlFor="title">Заголовок</label>
                        <input type="text" id='title' placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)}/>

                        <label htmlFor="content">Текст</label>
                        <input type="text" id="content" placeholder="Текст" value={content} onChange={(e) => setContent(e.target.value)}/>
                        {/*Добавление изображения */}

                        <button type="button" className="btn">Сохранить</button>
                    </form>
                </Modal>
            )
        }</>);
}

export default UpdateNewsModal;