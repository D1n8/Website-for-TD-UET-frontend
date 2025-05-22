import './style/css/App.css'
import AppRouter from './components/AppRouter'
import Header from './components/Header'
import { useDispatch } from 'react-redux';
import { setAuth } from './features/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const role = localStorage.getItem('userRole');

    if (accessToken && refreshToken && role) {
      dispatch(setAuth({
        accessToken,
        refreshToken,
        role,
      }));
    }
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <AppRouter />
    </div>
  )
}

export default App
