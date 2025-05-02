import { Navigate, Route, Routes } from "react-router-dom"
import { routes } from "../routes"
import { VACANCIES_LIST_ROUTE } from "../consts"

const AppRouter = () => {

    return (
        <main className="main">
            <Routes>
                {routes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                <Route path="*" element={<Navigate to={VACANCIES_LIST_ROUTE}/>} />
   
            </Routes>
        </main>
    )
}

export default AppRouter