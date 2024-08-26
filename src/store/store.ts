import { combineReducers, configureStore } from '@reduxjs/toolkit';
import historySlice from './reducers/historySlice';
import apiLanguageSlice from './reducers/apiLanguageSlice';

export const rootReducer = combineReducers({
  history: historySlice,
  [apiLanguageSlice.reducerPath]: apiLanguageSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiLanguageSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];