import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RefrigeratorFood } from 'types';

export interface State {
  currentRefrigeratorFoods: RefrigeratorFood[] | null;
}

const initialState: State = {
  currentRefrigeratorFoods: null,
};

const refrigeratorListSlice = createSlice({
  name: 'refrigeratorList',
  initialState,
  reducers: {
    deleteRefrigeratorFoods: (state, action) => {},
    deleteRefrigeratorFoodsSuccess: (state, action) => {},
    deleteRefrigeratorFoodsFailed: (state, action) => {},
    setFoodCount: (state, action) => {},
    setFoodCountSuccess: (state) => {},
    setFoodCountFailed: (state, action) => {},
    fetchRefrigeratorFoods: (state) => {},
    fetchRefrigeratorFoodsSuccess: (
      state,
      action: PayloadAction<RefrigeratorFood[]>
    ) => {
      state.currentRefrigeratorFoods = action.payload;
    },
    fetchRefrigeratorFoodsFailed: (state, action) => {},
  },
});

export const { actions, reducer } = refrigeratorListSlice;
