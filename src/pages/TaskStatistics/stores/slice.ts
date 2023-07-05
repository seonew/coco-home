import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatisticsByHomeTask } from 'types';

export interface State {
  statistics: StatisticsByHomeTask;
}

const initialState: State = {
  statistics: { keys: [], counts: [] },
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
      state.statistics.keys = action.payload.keys;
      state.statistics.counts = action.payload.counts;
    },
    fetchHomeTaskStatisticsItemFailed: (state, action) => {},
  },
});

export const { actions, reducer } = taskStatisticsSlice;
