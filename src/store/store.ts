import { combineReducers, configureStore } from '@reduxjs/toolkit';
import historySlice from './reducers/historySlice';
import apiLanguageSlice from './reducers/apiLanguageSlice';

export const rootReducer = combineReducers({
  history: historySlice,
  [apiLanguageSlice.reducerPath]: apiLanguageSlice.reducer,
});

// export function setupStore(preloadedState?: Partial<RootState>): Store<RootState> {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiLanguageSlice.middleware),
//     preloadedState,
//   });
// }

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiLanguageSlice.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
