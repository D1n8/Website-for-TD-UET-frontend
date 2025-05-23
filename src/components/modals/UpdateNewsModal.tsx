import { useState } from "react";
import Modal from "./Modal";
import { INews } from "../../modules";
import { useUpdateNewsMutation } from "../../features/newsApi";

interface IUpdateNewsProps {
    isOpen: boolean,
    onClose: () => void,
    news: INews
}

function UpdateNewsModal({ isOpen, onClose, news }: IUpdateNewsProps) {
    const [title, setTitle] = useState<string>(news.title);
    const [content, setContent] = useState<string>(news.content);
    const [image, setImage] = useState<File | null>(null);

    const [updateNews] = useUpdateNewsMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        if (image) {
            formData.append('image', image);
        }

        try {
            await updateNews({id: news.id, formData: formData}).unwrap();
            onClose();
        } catch (error) {
            console.error("Ошибка при создании:", error);
        }
    };

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
                    <button className="btn" onClick={(e) => handleSubmit(e)}>Сохранить</button>

                </Modal>
            )
        }</>);
}

export default UpdateNewsModal;