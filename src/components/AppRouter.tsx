import { Navigate, Route, Routes } from "react-router-dom"
import { privateRoutes, routes } from "../routes"
import { VACANCIES_LIST_ROUTE } from "../consts"
import { userIsAdmin } from "../features/userApi"

const AppRouter = () => {

    return (
        <main className="main">
            <Routes>
                {
                    userIsAdmin && privateRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                {
                    routes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                <Route path="*" element={<Navigate to={VACANCIES_LIST_ROUTE}/>} />
   
            </Routes>
        </main>
    )
}

export default AppRouter