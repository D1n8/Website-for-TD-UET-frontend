import { useNavigate } from 'react-router-dom'
import logo from '../../public/logo.png'
import { ABOUT_ROUTE, CONTACTS_ROUTE, NEWS_ROUTE, VACANCIES_LIST_ROUTE } from '../consts'

function Header() {
    const history = useNavigate()
    return (
        <div className="header">
            <div className="header__container">
                <button className="btn-reset burger">
                        <span className="burger__line"></span>
                        <span className="burger__line"></span>
                        <span className="burger__line"></span>
                    </button>
                <div className="logo-container">
                    <img src={logo} alt="ТД УЭТ" className="img logo" />
                    <h1 className="title">УЭТ</h1>
                </div>
                <nav className="nav">
                    <a onClick={() => history(VACANCIES_LIST_ROUTE)} className="nav__item">Вакансии</a>
                    <a onClick={() => history(ABOUT_ROUTE)} className="nav__item">О нас</a>
                    <a onClick={() => history(CONTACTS_ROUTE)} className="nav__item">Контакты</a>
                    <a onClick={() => history(NEWS_ROUTE)} className="nav__item">Новости</a>
                </nav>
            </div>
        </div>
    )
}

export default Header