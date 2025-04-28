import { IVacancy } from '../src/modules';

export const mockVacancies: IVacancy[] = [
  {
    id: 1,
    title: 'Фронтендер',
    location: 'Москва, офис',
    description: 'Разработка пользовательских интерфейсов для корпоративных решений',
    requirements: 'Знание JS, HTML, CSS',
    responsibilities: 'Верстка сайтов',
    employment_type: ['Фронтенд', 'Веб', 'Верстка'],
    salary_min: 30000,
    salary_max: 60000,
    published_at: '19.04.2025'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    location: 'Удалённо',
    description: 'Создание дизайн-систем и прототипирование интерфейсов',
    requirements: 'Опыт работы в Figma',
    responsibilities: 'Figma, Photoshop',
    employment_type: ['Дизайн'],
    salary_min: 45000,
    salary_max: 50000,
    published_at: '20.04.2025'
  }
];