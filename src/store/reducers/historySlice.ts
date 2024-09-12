import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface historyTypes {
  request: string[];
}
const isBrowser = typeof window !== 'undefined';
const localStorageRequest = isBrowser && localStorage.getItem('requests') ;

const initialState: historyTypes = {
  request: (localStorageRequest && JSON.parse(localStorageRequest)) || [],

};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  selectors: {
    selectRequest: state => state.request,
  },

  reducers: {
    storeRequest: (state, { payload }: PayloadAction<string>) => {
      state.request?.push(payload);
      localStorage.setItem('requests', JSON.stringify(state.request));
    },
  },
});

export const { storeRequest } = historySlice.actions;

export const { selectRequest } = historySlice.selectors;
export default historySlice.reducer;
