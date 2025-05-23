import { configureStore } from '@reduxjs/toolkit'
import { vacanciesApi } from './features/vacanciesApi'
import { userApi } from './features/userApi'
import authReducer from './features/authSlice'
import { newsApi } from './features/newsApi'

export const store = configureStore({
  reducer: {
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(vacanciesApi.middleware)
      .concat(userApi.middleware)
      .concat(newsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
