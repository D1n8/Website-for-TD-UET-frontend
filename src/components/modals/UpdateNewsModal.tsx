import { useState, useEffect } from "react";
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

    useEffect(() => {
        setTitle(news.title);
        setContent(news.content);
        setImage(null);
    }, [news]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        if (image) {
            formData.append('image', image);
        }

        try {
            await updateNews({ id: news.id, formData: formData }).unwrap();
            onClose();
        } catch (error) {
            console.error("Ошибка при создании:", error);
        }
    };

    return (
        <>
            {isOpen && (
                <Modal onClose={onClose}>
                    <button className="close" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                        </svg>
                    </button>
                    <h2 className="modal__title">Редактировать новость</h2>
                    <form className="news-modal" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label htmlFor="title">Заголовок:</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Заголовок"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="content">Текст:</label>
                            <textarea
                                id="content"
                                placeholder="Текст"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="img">Изображение:</label>
                            <input
                                type="file"
                                id="img"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            />
                        </div>
                        <button type="submit" className="btn">Сохранить</button>
                    </form>
                </Modal>
            )}
        </>
    );
}

export default UpdateNewsModal;
