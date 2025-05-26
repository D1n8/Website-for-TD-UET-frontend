import { useState } from "react";
import { useCreateApplicationMutation } from "../../features/applicationsApi";

interface IApplyModal {
  isOpen: boolean,
  onClose: () => void,
  id: number
}

function ApplyModal({ isOpen, onClose, id }: IApplyModal) {

  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [patronymic, setPatronymic] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [resumeText, setResumeText] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [createApplication] = useCreateApplicationMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('patronymic', patronymic);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('resume_text', resumeText);
    formData.append('vacancy', id.toString());

    if (resumeFile) {
      formData.append('resume_file', resumeFile);
    }

    try {
      await createApplication(formData).unwrap();
      onClose();
    } catch (error) {
      console.error("Ошибка при создании:", error);
    }

  };

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
            <form action="POST" className="apply-modal__form" onSubmit={handleSubmit}>
              <div className="first-last-name-container">
                <div className="input-box last-name">
                  <label>Фамилия:</label>
                  <input type="text" name="lastName" placeholder="Иванов" required value={surname} onChange={(e) => setSurname(e.target.value)} />
                </div>
                <div className="input-box first-name">
                  <label>Имя:</label>
                  <input type="text" name="firstName" placeholder="Иван" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>

              <div className="input-box">
                <label>Отчество:</label>
                <input type="text" name="middleName" placeholder="Иванович*" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} />
              </div>
              {/* <div className="input-box">
                <label>Дата рождения:</label>
                <input type="date" name="dob" required />
              </div> */}
              <div className="contacts-container">
                <div className="input-box email">
                  <label>Email:</label>
                  <input type="email" name="email" required placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-box tel">
                  <label>Телефон:</label>
                  <input type="tel" name="phone" required placeholder="+7(000) 000-00-00" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="input-box textarea">
                <label>Сопроводительное письмо:</label>
                <textarea name="coverLetter" placeholder="Если есть*" value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
              </div>
              <div className="input-box file">
                <label>Резюме (PDF, DOCX):</label>
                <input type="file" name="resume" accept=".pdf,.doc,.docx" required onChange={(e) => setResumeFile(e.target.files && e.target.files[0])} />
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