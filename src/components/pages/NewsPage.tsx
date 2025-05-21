import { format } from "date-fns";
import { INews } from "../../modules";
import News from "../News";
import { userIsAdmin } from "../../features/userApi";
import { useState } from "react";
import CreateNewsModal from "../modals/CreateNewsModal";

const mockNews: INews[] = [
    {
        id: 1,
        title: "ТД УЭТ запускает новую линейку электрооборудования",
        content: "Компания ТД УЭТ объявила о запуске новой серии трансформаторов и комплектующих для промышленного применения. Продукция ориентирована на повышение энергоэффективности.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6iCPcwId-luInbLWJ0H4suuTswbf8iP6FUA&s",
        published_at: new Date("2025-04-30T09:00:00"),
    },
    {
        id: 2,
        title: "ТД УЭТ открывает новое представительство в Казани",
        content: "В рамках расширения регионального присутствия компания ТД УЭТ открыла новый офис и складской комплекс в Казани.",
        image: "https://avatars.mds.yandex.net/get-altay/15148849/2a0000019473bbcbccee5f50f83a345d5743/L_height",
        published_at: new Date("2025-04-28T11:30:00"),
    },
    {
        id: 3,
        title: "ТД УЭТ принял участие в выставке 'Электро-2025'",
        content: "На международной выставке 'Электро-2025' ТД УЭТ представил свои новейшие разработки и заключил несколько ключевых контрактов с партнёрами.",
        image: "https://avatars.mds.yandex.net/get-altay/14563476/2a0000019473bcf5b3474d59fd9a9c693905/orig",
        published_at: new Date("2025-04-25T15:15:00"),
    },
    {
        id: 4,
        title: "ТД УЭТ внедрил систему контроля качества на всех этапах производства",
        content: "Компания завершила внедрение автоматизированной системы контроля качества, охватывающей весь производственный цикл от поставки компонентов до отгрузки готовой продукции.",
        image: "https://uralenergotel.ru/_ipx/f_webp&s_380x204/img/uploads/slider/mob-slide1.png",
        published_at: new Date("2025-04-20T10:45:00"),
    },
    {
        id: 5,
        title: "ТД УЭТ запускает корпоративную обучающую платформу",
        content: "Для повышения квалификации сотрудников и партнёров компания разработала собственную онлайн-платформу с курсами по электротехнике и продукции ТД УЭТ.",
        image: "https://uralenergotel.ru/_ipx/f_webp&s_600x650/img/index/power-generation.png",
        published_at: new Date("2025-04-18T08:00:00"),
    }
];

const topNews: INews = {
    id: 13,
    title: "ТД УЭТ запускает корпоративную обучающую платформу",
    content: "Для повышения квалификации сотрудников и партнёров компания разработала собственную онлайн-платформу с курсами по электротехнике и продукции ТД УЭТ.",
    image: "https://avatars.mds.yandex.net/get-altay/15148849/2a0000019473bbcbccee5f50f83a345d5743/L_height",
    published_at: new Date("2025-05-05T08:00:00")
}



function NewsPage() {
    const [isOpenCreateNews, setIsOpenCreateNews] = useState(false);

    return (<div className="news-page">
        <div className="news-page__container">
            <h2 className="news-page__title">Новости</h2>
            {userIsAdmin && (<button className="btn create-news" onClick={() => setIsOpenCreateNews(true)}>Создать новость</button>)}
            <div className="main-news">
                <div className="main-news__textbox">
                    <p className="main-news__text">
                        <h3 className="main-news__title">{topNews.title}</h3>
                        {topNews.content}
                    </p>
                    <p className="main-news__date">{format(topNews.published_at, 'dd.MM.yyyy')}</p>
                    {userIsAdmin && (<button className="btn btn__delete">Удалить</button>)}
                </div>

                <img src={topNews.image} alt="News image" />
            </div>
            <div className="news-page__box">
                {mockNews.map(news =>
                    <News key={news.id}
                        id={news.id}
                        title={news.title}
                        content={news.content}
                        image={news.image}
                        published_at={news.published_at} />
                )}
            </div>
        </div>
        <CreateNewsModal isOpen={isOpenCreateNews} onClose={() => setIsOpenCreateNews(false)} />
    </div>)
}

export default NewsPage