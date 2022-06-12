import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeTask } from 'types';

export interface State {
  currentHomeTasks: HomeTask[] | null;
  currentType: string;
}

const initialState: State = {
  currentHomeTasks: null,
  currentType: '',
};

const registerDetailSlice = createSlice({
  name: 'registerDetail',
  initialState,
  reducers: {
    deleteHomeTasks: (state, action) => {},
    deleteHomeTasksSuccess: (state, action) => {},
    deleteHomeTasksFailed: (state, action) => {},
    fetchHomeTasksDetail: (state, action) => {},
    fetchHomeTasksDetailSuccess: (state, action: PayloadAction<HomeTask[]>) => {
      state.currentHomeTasks = action.payload;
    },
    fetchHomeTasksDetailFailed: (state, action) => {},
  },
});

export const { actions, reducer } = registerDetailSlice;
