import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import { actions } from './slice';
import { RootState } from 'stores';
import { fetchHomeTaskStatisticsTargetApi } from 'api';
import { AxiosResponse } from 'axios';
import { StatisticsByHomeTask } from 'types';

export default function* rootSaga() {
  yield all([watchFetchHomeTaskStatisticsItem()]);
}

export function* watchFetchHomeTaskStatisticsItem() {
  yield takeLatest(
    actions.fetchHomeTaskStatisticsItem,
    fetchHomeTaskStatisticsItem
  );
}

function* fetchHomeTaskStatisticsItem(action) {
  const type = action.payload;

  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );
    const currentDate: { year: number; month: number } = yield select(
      (state) => state.taskList.currentDate
    );
    const year = currentDate.year;
    const month = currentDate.month;

    let target = '';
    if (type === 'MEMBER') {
      target = 'member';
    } else if (type === 'ITEM') {
      target = 'targetItem';
    } else if (type === 'WORK') {
      target = 'work';
    }

    const response: AxiosResponse<StatisticsByHomeTask> = yield call(
      fetchHomeTaskStatisticsTargetApi,
      year,
      month,
      homeId,
      target
    );
    const result: StatisticsByHomeTask = response.data;

    yield put(actions.fetchHomeTaskStatisticsItemSuccess(result));
  } catch (error) {
    yield put(actions.fetchHomeTaskStatisticsItemFailed(error));
    console.error(error);
  }
}
