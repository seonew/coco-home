import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeListItem } from 'types';

export interface State {
  homeList: HomeListItem[] | null;
  edited: boolean;
  initialized: boolean;
}

const initialState: State = {
  homeList: null,
  edited: false,
  initialized: true,
};

const mypageSlice = createSlice({
  name: 'mypage',
  initialState,
  reducers: {
    goHomeRegisterPageToCreate: (state) => {},
    goHomeRegisterPageToEdit: (state, action) => {},
    selectHome: (state, action) => {},
    deleteHome: (state, action) => {},

    setEdited: (state, action: PayloadAction<boolean>) => {
      state.edited = action.payload;
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },

    fetchHomeList: (state) => {},
    fetchHomeListSuccess: (state, action: PayloadAction<HomeListItem[]>) => {
      state.homeList = action.payload;
    },
    fetchHomeListFailed: (state, action) => {},
  },
});

export const { actions, reducer } = mypageSlice;
