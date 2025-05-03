interface IApplyModal{
  isOpen: boolean,
  onClose: () => void
}

function ApplyModal({isOpen, onClose}: IApplyModal) {
  if (!isOpen) return null
  return (
    <div className="apply-modal">
      <div className="backdrop">
        <div className="apply-modal__container">
          <div className="apply-modal__textbox">
            <h3 className="apply-modal__title">Заполните форму</h3>
            <button className="close" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
            </button>
            <form action="POST" className="apply-modal__form" onSubmit={(e) => {
              e.preventDefault()
              //отправка формы
              onClose()
            }}>
              <div className="input-box">
                <label>Фамилия:</label>
                <input type="text" name="lastName" placeholder="Иванов" required />
              </div>
              <div className="input-box">
                <label>Имя:</label>
                <input type="text" name="firstName" placeholder="Иван" required />
              </div>
              <div className="input-box">
                <label>Отчество:</label>
                <input type="text" name="middleName" placeholder="Иванович*" />
              </div>
              <div className="input-box">
                <label>Дата рождения:</label>
                <input type="date" name="dob" required />
              </div>
              <div className="input-box">
                <label>Email:</label>
                <input type="email" name="email" required placeholder="example@email.com" />
              </div>
              <div className="input-box">
                <label>Телефон:</label>
                <input type="tel" name="phone" required placeholder="+7(000) 000-00-00" />
              </div>
              <div className="input-box textarea">
                <label>Сопроводительное письмо:</label>
                <textarea name="coverLetter" placeholder="Если есть*" />
              </div>
              <div className="input-box file">
                <label>Резюме (PDF, DOCX):</label>
                <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
              </div>
              <div className="btn-container">
                <button className="btn btn-submit" type="submit">Отправить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>)
}

export default ApplyModal;