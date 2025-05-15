import VacancyDetails from "./components/pages/VacancyDetails";
import About from "./components/pages/About";
import { ABOUT_ROUTE, VACANCY_DETAILS_ROUTE, VACANCIES_LIST_ROUTE, CONTACTS_ROUTE, NEWS_ROUTE, ADMIN_ROUTE } from "./consts";
// import Home from "./components/pages/Home";
import Vacancies from "./components/pages/Vacancies";
import Contacts from "./components/pages/Contacts";
import NewsPage from "./components/pages/NewsPage";
import Admin from "./components/pages/Admin";

export const routes = [
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    // {
    //     path: HOME_ROUTE,
    //     Component: Home
    // },
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