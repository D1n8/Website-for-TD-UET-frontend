import aboutBg from '../../../public/about-bg-1.png'
import hands from '../../../public/icons8-рукопожатие-60.png'
import money from '../../../public/Bank Note 03 (1).svg'
import clock from '../../../public/Clock (1).svg'

const About = () => {
    return (
        <div className="about-page">
            <div className="about-page__container">
                <h2 className="about-page__title">Торговый дом УЭТ</h2>
                <div style={{ display: 'flex', gap: '30px', marginBottom: "50px" }}>
                    <div className="about-page__descr">
                        <p className="about-page__text def"><b>ТД УЭТ</b> — сервис поставок инженерного оборудования для промышленных предприятий России,
                            основанный на базе инжиниринговой компании, опыт работы которой в этой отрасли составляет более 15 лет.</p>
                        <p className="about-page__text"><b>ТД УЭТ</b> способствует росту и развитию промышленности в России,
                            предоставляя качественные инженерные решения и сервисы</p>
                    </div>

                    <img className='about-bg' src={aboutBg} alt="" />

                </div>

                <div className="company-values">
                    <p className='subtitle'>Основные ценности компании</p>
                    <div className="company-values__container">
                        <div className="value-box">
                            <img src={money} alt="" className="money" />
                            <p className="value-box__text">Доступность. <br />Предоставление оборудования по ценам ниже заводских</p>
                        </div>
                        <div className="value-box">
                            <img src={clock} alt="" className="clock" />
                            <p className="value-box__text">Удобство. <br />Интернет-магазин с более чем 500 000 товаров и современным сервисом для клиентов</p>
                        </div>
                        <div className="value-box">
                            <img className='hands' src={hands} alt="" />
                            <p className="value-box__text">Надежность. <br />Сотрудничество с более чем 100 партнерами</p>
                        </div>
                    </div>
                </div>
                <div className="career">
                    <p className="subtitle career__subtitle">Карьерный рост</p>
                    <div className="career__container">
                        <div className="item-box step-1">
                            <p className="item-box__text"><b className='item-box__title'>Корпоративная культура</b> <br /> Дружелюбный коллектив, регулярные мероприятия и конкурсы</p>
                        </div>
                        <div className="item-box step-2">
                            <p className="item-box__text"><b className='item-box__title'>Наставничество</b> <br /> Система кураторства, обеспечивающая поддержку в адаптационный период</p>
                        </div>
                        <div className="item-box step-3">
                            <p className="item-box__text"><b className='item-box__title'>Обучение с нуля</b> <br />Продвинутая программа обучения для новых сотрудников</p>
                        </div>
                    </div>
                </div>


                {/* <div className="about-page__text">
                А также комфортные условия труда, современный офис, наземная парковка и удобное расположение.
                Компания получила награды за заботу о сотрудниках, корпоративную культуру и карьерный рост
            </div> */}
            </div>
        </div >
    )
}

export default About