import './style/css/App.css';
import AppRouter from './components/AppRouter';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { setAuth } from './features/authSlice';
import { useEffect } from 'react';
import { useAuthAutoRefresh } from './features/useAuthAutoRefresh';

function App() {
  const dispatch = useDispatch();
  useAuthAutoRefresh();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const role = localStorage.getItem('role');

    if (accessToken && refreshToken && role) {
      dispatch(setAuth({ accessToken, refreshToken, role}));
    }

  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
