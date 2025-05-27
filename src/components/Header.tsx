import { useNavigate } from 'react-router-dom'
import logo from '../../public/logo.png'
import { ABOUT_ROUTE, CONTACTS_ROUTE, FEEDBACK_ROUTE, NEWS_ROUTE, RESPONSES_ROUTE, VACANCIES_LIST_ROUTE } from '../consts'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../features/authSlice';

function Header() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const role = useSelector((state: RootState) => state.auth.role);

    const handleLogout = () => {
        dispatch(logout());

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
    }

    return (
        <div className="header">
            <div className="header__container">
                {/* <button className="btn-reset burger">
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                </button> */}
                <div className="logo-container">
                    <img src={logo} alt="ТД УЭТ" className="img logo" />
                    <h1 className="title">УЭТ</h1>
                    {role === 'admin' && <h3 style={{ fontSize: '14px' }}>Админ</h3>}
                </div>
                <nav className="nav">
                    <a onClick={() => history(VACANCIES_LIST_ROUTE)} className="nav__item">Вакансии</a>
                    <a onClick={() => history(ABOUT_ROUTE)} className="nav__item">О нас</a>
                    <a onClick={() => history(CONTACTS_ROUTE)} className="nav__item">Контакты</a>
                    <a onClick={() => history(NEWS_ROUTE)} className="nav__item">Новости</a>
                    {role === 'admin' && (
                        <a onClick={() => history(RESPONSES_ROUTE)} className="nav__item">Отклики</a>
                    )}
                    {role === 'admin' && (
                        <a onClick={() => history(FEEDBACK_ROUTE)} className="nav__item last">Обратная связь</a>
                    )}
                    {role === 'admin' && (
                        <button onClick={() => handleLogout()} className="btn">Выйти</button>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Header