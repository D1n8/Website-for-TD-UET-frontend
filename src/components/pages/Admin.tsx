function Admin() {
    return (
        <div className="admin">
            <form action="POST" className="admin__form">
                <h2 className="admin__title">Вход администратора</h2>
                <input className="modal-input admin__input" type="email" name="email" placeholder="Email" />
                <input className="modal-input admin__input" type="password" name="password" placeholder="Пароль" />
                <button className="btn">Войти</button>
            </form>
        </div>);
}

export default Admin;