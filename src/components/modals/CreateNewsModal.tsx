import { useState } from "react";
import Modal from "./Modal";

interface ICreateNewsProps {
    isOpen: boolean,
    onClose: () => void
}

function CreateNewsModal({ isOpen, onClose }: ICreateNewsProps) {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);

    return (<>
        {
            isOpen && (
                <Modal onClose={onClose}>
                    <h2 className="modal__title">Создать новость</h2>
                    <form className="news-modal">
                        <div className="input-box">
                            <label htmlFor="title">Заголовок:</label>
                            <input type="text" id='title' placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="content">Текст:</label>
                            <textarea id="content" placeholder="Текст" value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="img">Изображение:</label>
                            <input type="file" id="img" accept='image/*' onChange={(e) => setImage(e.target.files && e.target.files[0])}/>
                        </div>
                    </form>
                    <button className="btn">Сохранить</button>

                </Modal>
            )
        }</>);
}

export default CreateNewsModal;