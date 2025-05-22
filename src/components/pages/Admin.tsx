import { useState } from "react";
import { useLoginMutation } from "../../features/userApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { VACANCIES_LIST_ROUTE } from "../../consts";

function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useNavigate();
    const [login, { isLoading, isError }] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { access, refresh } = await login({ email, password }).unwrap();

            const role = 'admin';

            dispatch(setAuth({
                accessToken: access,
                refreshToken: refresh,
                role
            }));

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('userRole', role);

            history(VACANCIES_LIST_ROUTE);
        } catch (err) {
            console.error('Ошибка входа:', err);
        }
    };

    return (
        <div className="admin">
            <form className="admin__form" onSubmit={handleSubmit}>
                <h2 className="admin__title">Вход администратора</h2>

                <input
                    className="modal-input admin__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="modal-input admin__input"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn" type="submit" disabled={isLoading}>
                    {isLoading ? 'Вход...' : 'Войти'}
                </button>

                {isError && <p style={{ color: 'red' }}>Ошибка входа</p>}
            </form>
        </div>
    );
}

export default Admin;
