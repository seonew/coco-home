import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeTask, HomeTasksByDate } from 'types';

export interface State {
  date: Date;
  cycle: Record<string, unknown>;

  currentCalendarHomeTasks: HomeTasksByDate;
  currentDate: { year: number; month: number };
  searchList: HomeTask[] | null;
}

const initialState: State = {
  date: new Date(),
  cycle: {
    value: 0,
    unit: '',
  },
  currentCalendarHomeTasks: {},
  currentDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  },
  searchList: null,
};

const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    searchHomeTasks: (state, action: PayloadAction<string>) => {},
    searchHomeTasksSuccess: (state, action: PayloadAction<HomeTask[]>) => {
      state.searchList = action.payload;
    },
    searchHomeTasksFailed: (state, action) => {},
    fetchHomeTasksByDate: (
      state,
      action: PayloadAction<Record<string, unknown>>
    ) => {},
    fetchHomeTasksByDateSuccess: (
      state,
      action: PayloadAction<HomeTasksByDate>
    ) => {
      state.currentCalendarHomeTasks = action.payload;
    },
    fetchHomeTasksByDateFailed: (state, action) => {},
    setYearMonth: (state, action: PayloadAction<Record<string, unknown>>) => {},
    setYearMonthSuccess: (
      state,
      action: PayloadAction<{ year: number; month: number }>
    ) => {
      state.currentDate.year = action.payload.year;
      state.currentDate.month = action.payload.month;
      state.currentCalendarHomeTasks = {};
    },
    setYearMonthFailed: (state, action) => {},
  },
});

export const { actions, reducer } = taskListSlice;
