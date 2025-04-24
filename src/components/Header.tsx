import { useNavigate } from 'react-router-dom'
import logo from '../../public/logo.png'
import { ABOUT_ROUTE, CONTACTS_ROUTE, NEWS_ROUTE, VACANCIES_LIST_ROUTE } from '../consts'

function Header() {
    const history = useNavigate()
    return (
        <div className="header">
            {/* <button className="btn-reset burger">
                <span className="burger__line"></span>
                <span className="burger__line"></span>
                <span className="burger__line"></span>
            </button> */}
            <div className="logo-container">
                <img src={logo} alt="ТД УЭТ" className="img logo" />
                <h1 className="title">УЭТ</h1>
            </div>
            <nav className="nav">
                <a onClick={() => history(VACANCIES_LIST_ROUTE)} className="nav__item"><span>Вакансии</span></a>
                <a onClick={() => history(ABOUT_ROUTE)} className="nav__item"><span>О нас</span></a>
                <a onClick={() => history(CONTACTS_ROUTE)} className="nav__item"><span>Контакты</span></a>
                <a onClick={() => history(NEWS_ROUTE)} className="nav__item"><span>Новости</span></a>
            </nav>
        </div>
    )
}

export default Header