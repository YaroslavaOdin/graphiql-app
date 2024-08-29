import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'

interface historyTypes {
  history: undefined;
}

const initialState: historyTypes = {
  history: undefined,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,

  reducers: {},
});

// export const {  } = historySlice.actions;

// export const {  } = historySlice.selectors;
export default historySlice.reducer;
