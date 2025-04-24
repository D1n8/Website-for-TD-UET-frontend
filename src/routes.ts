import Vacancy from "./components/pages/Vacancy";
import About from "./components/pages/About";
import { ABOUT_ROUTE, VACANCY_ROUTE, HOME_ROUTE, VACANCIES_LIST_ROUTE } from "./consts";
import Home from "./components/pages/Home";
import Vacancies from "./components/pages/Vacancies";

export const routes = [
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: VACANCY_ROUTE, 
        Component: Vacancy
    },
    {
        path: VACANCIES_LIST_ROUTE,
        Component: Vacancies
    }
]