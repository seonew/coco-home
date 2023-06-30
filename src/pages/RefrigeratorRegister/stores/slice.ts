import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RefrigeratorFood } from 'types';

export interface State {
  showCalendar: boolean;
}

const initialState: State = {
  showCalendar: false,
};

const registerRefrigeratorSlice = createSlice({
  name: 'registerRefrigeratorSlice',
  initialState,
  reducers: {
    setShowCalendar: (state, action) => {
      state.showCalendar = action.payload;
    },
    insertUserRegisterRefrigeratorData: (
      state,
      action: PayloadAction<RefrigeratorFood>
    ) => {},
    insertUserRegisterRefrigeratorDataSuccess: (
      state,
      action: PayloadAction<RefrigeratorFood>
    ) => {
      state.showCalendar = false;
    },
    insertUserRegisterRefrigeratorDataFailed: (state, action) => {},
  },
});

export const { actions, reducer } = registerRefrigeratorSlice;
