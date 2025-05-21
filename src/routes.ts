import VacancyDetails from "./components/pages/VacancyDetails";
import About from "./components/pages/About";
import { ABOUT_ROUTE, VACANCY_DETAILS_ROUTE, VACANCIES_LIST_ROUTE, CONTACTS_ROUTE, NEWS_ROUTE, ADMIN_ROUTE, RESPONSES_ROUTE, FEEDBACK_ROUTE } from "./consts";
import Vacancies from "./components/pages/Vacancies";
import Contacts from "./components/pages/Contacts";
import NewsPage from "./components/pages/NewsPage";
import Admin from "./components/pages/Admin";
import Responses from "./components/pages/Responses";
import Feedback from "./components/pages/Feedback";

export const routes = [
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: VACANCY_DETAILS_ROUTE + '/:id', 
        Component: VacancyDetails
    },
    {
        path: VACANCIES_LIST_ROUTE,
        Component: Vacancies
    },
    {
        path: CONTACTS_ROUTE,
        Component: Contacts
    },
    {
        path: NEWS_ROUTE,
        Component: NewsPage
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin    
    }
]

export const privateRoutes = [
    {
        path: RESPONSES_ROUTE,
        Component: Responses
    },
    {
        path: FEEDBACK_ROUTE,
        Component: Feedback
    }
]