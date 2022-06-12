import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatisticsByHomeTask } from 'types';

export interface State {
  statistics: StatisticsByHomeTask;
}

const initialState: State = {
  statistics: { key: [], count: [] },
};

const taskStatisticsSlice = createSlice({
  name: 'taskStatistics',
  initialState,
  reducers: {
    fetchHomeTaskStatisticsItem: (state, action: PayloadAction<string>) => {},
    fetchHomeTaskStatisticsItemSuccess: (
      state,
      action: PayloadAction<StatisticsByHomeTask>
    ) => {
      state.statistics.key = action.payload.key;
      state.statistics.count = action.payload.count;
    },
    fetchHomeTaskStatisticsItemFailed: (state, action) => {},
  },
});

export const { actions, reducer } = taskStatisticsSlice;
