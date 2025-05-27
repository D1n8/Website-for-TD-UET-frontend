import { useState } from "react";
import { useCreateContactRequestMutation } from "../../features/contactRequestsApi";
import YandexMap from "../YandexMap"

function Contacts() {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [patronymic, setPatronymic] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const [createRequest] = useCreateContactRequestMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            await createRequest({
                surname: surname,
                name: name, 
                patronymic: patronymic,
                email: email,
                phone: phone,
                message: message
            })

            setName('');
            setSurname('');
            setPatronymic('');
            setEmail('');
            setPhone('');
            setMessage('');

            alert('Обращение успешно отправлено')
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    return (
        <div className="contacts-page">
            <div className="contacts-page__container">
                <h2 className="contacts-page__title">Связаться с нами</h2>
                <form className="form" action="#" onSubmit={handleSubmit}>
                    <h3 className="form__title">Форма обратной связи</h3>
                    <div className="form__elem">
                        <h4 className="form__subtitle">Как Вас зовут?</h4>
                        <div className="inputs-container">
                            <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} required/>
                            <input type="text" placeholder="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                            <input type="text" placeholder="Отчество*" value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
                        </div>

                    </div>
                    <div className="form__elem">
                        <h4 className="form__subtitle">Контактная информация</h4>
                        <div className="inputs-container">
                            <input type="email" name="email" id="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="tel" name="tel" id="tel" required placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </div>

                    </div>
                    <div className="form__elem">
                        <h4 className="form__subtitle">Вопросы / Комментарии</h4>
                        <div className="inputs-container">
                            <textarea className="msg" placeholder="Сообщение" required value={message} onChange={(e) => setMessage(e.target.value)}/>
                        </div>
                    </div>
                    <button className="btn btn-submit">Отправить</button>
                </form>

                <div className="info-container">
                    <YandexMap />
                    <div className="contacts-page__contacts">
                        <h2 className="contacts-page__subtitle">Контактные данные</h2>
                        <div className="links-container">
                            <a href="#" className="link wa">
                                <svg width="70" height="70" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M36 0C16.119 0 0 16.119 0 36C0 42.7536 1.89702 49.0502 5.13281 54.4512L0.322266 72L18.2461 67.2949C23.4881 70.2752 29.5395 72 36 72C55.881 72 72 55.881 72 36C72 16.119 55.881 0 36 0ZM23.6777 19.207C24.2627 19.207 24.8638 19.2035 25.3828 19.2305C26.0248 19.2455 26.7236 19.2925 27.3926 20.7715C28.1876 22.5295 29.9186 26.9397 30.1406 27.3867C30.3626 27.8337 30.5199 28.3603 30.2109 28.9453C29.9169 29.5453 29.764 29.9085 29.332 30.4395C28.885 30.9555 28.3952 31.5963 27.9902 31.9863C27.5432 32.4333 27.0817 32.9235 27.5977 33.8145C28.1137 34.7055 29.9057 37.6264 32.5547 39.9844C35.9597 43.0264 38.8326 43.9612 39.7266 44.4082C40.6206 44.8552 41.1383 44.7855 41.6543 44.1855C42.1853 43.6005 43.8844 41.5932 44.4844 40.6992C45.0694 39.8052 45.6666 39.9599 46.4766 40.2539C47.2986 40.5479 51.6822 42.7073 52.5762 43.1543C53.4702 43.6013 54.0563 43.8225 54.2812 44.1855C54.5122 44.5605 54.5125 46.3457 53.7715 48.4277C53.0305 50.5067 49.3918 52.5172 47.7598 52.6582C46.1128 52.8112 44.5757 53.3985 37.0547 50.4375C27.9827 46.8645 22.2615 37.5727 21.8145 36.9727C21.3675 36.3877 18.1816 32.1417 18.1816 27.7617C18.1816 23.3667 20.486 21.2143 21.293 20.3203C22.115 19.4263 23.0777 19.207 23.6777 19.207Z" fill="#49CC21" />
                                </svg>
                                WhatsApp
                            </a>
                            <a href="#" className="link email">
                                <svg width="70" height="70" viewBox="0 0 48 48" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 12C44 9.8 42.2 8 40 8H8C5.8 8 4 9.8 4 12M44 12V36C44 38.2 42.2 40 40 40H8C5.8 40 4 38.2 4 36V12M44 12L24 26L4 12" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Email
                            </a>

                            <a href="#" className="link tel">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(0, 72, 255, 1)" x="0px" y="0px" width="70" height="70" viewBox="0 0 50 50">
                                    <path d="M 14 3.9902344 C 8.4886661 3.9902344 4 8.4789008 4 13.990234 L 4 35.990234 C 4 41.501568 8.4886661 45.990234 14 45.990234 L 36 45.990234 C 41.511334 45.990234 46 41.501568 46 35.990234 L 46 13.990234 C 46 8.4789008 41.511334 3.9902344 36 3.9902344 L 14 3.9902344 z M 18.005859 12.033203 C 18.633859 12.060203 19.210594 12.414031 19.558594 12.957031 C 19.954594 13.575031 20.569141 14.534156 21.369141 15.785156 C 22.099141 16.926156 22.150047 18.399844 21.498047 19.589844 L 20.033203 21.673828 C 19.637203 22.237828 19.558219 22.959703 19.824219 23.595703 C 20.238219 24.585703 21.040797 26.107203 22.466797 27.533203 C 23.892797 28.959203 25.414297 29.761781 26.404297 30.175781 C 27.040297 30.441781 27.762172 30.362797 28.326172 29.966797 L 30.410156 28.501953 C 31.600156 27.849953 33.073844 27.901859 34.214844 28.630859 C 35.465844 29.430859 36.424969 30.045406 37.042969 30.441406 C 37.585969 30.789406 37.939797 31.366141 37.966797 31.994141 C 38.120797 35.558141 35.359641 37.001953 34.556641 37.001953 C 34.000641 37.001953 27.316344 37.761656 19.777344 30.222656 C 12.238344 22.683656 12.998047 15.999359 12.998047 15.443359 C 12.998047 14.640359 14.441859 11.879203 18.005859 12.033203 z"></path>
                                </svg>
                                Телефон
                            </a>
                        </div>

                    </div>
                </div>


            </div>
        </div>)
}

export default Contacts