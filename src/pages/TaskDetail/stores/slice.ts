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

const taskDetailSlice = createSlice({
  name: 'taskDetailSlice',
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

export const { actions, reducer } = taskDetailSlice;
