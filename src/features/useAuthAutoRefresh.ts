import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setAuth, logout } from './authSlice';
import { userApi } from './userApi';

const REFRESH_INTERVAL = 1 * 60 * 1000;

export const useAuthAutoRefresh = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
  const role = useSelector((state: RootState) => state.auth.role);
  const [triggerRefresh] = userApi.useRefreshTokenMutation();

  useEffect(() => {
    if (!refreshToken) return;

    const interval = setInterval(async () => {
      try {
        const response = await triggerRefresh({ refresh: refreshToken }).unwrap();

        dispatch(setAuth({
          accessToken: response.access,
          refreshToken: response.refresh,
          role: role || 'admin',
        }));
      } catch (error) {
        dispatch(logout());
        console.log(error)
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [refreshToken, dispatch, triggerRefresh, role]);
};