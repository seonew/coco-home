import {
  all,
  takeLatest,
  put,
  call,
  select,
  delay,
} from '@redux-saga/core/effects';
import { actions } from './slice';
import { actions as appActions } from 'stores/slice';
import { RootState } from 'stores';
import { PAGE_PATH } from 'constants/index';
import { fetchHomeTasksByDateApi, searchHomeTasksApi } from 'api';
import { AxiosResponse } from 'axios';
import { HomeTask, HomeTasksByDate } from 'types';

export default function* rootSaga() {
  yield all([
    watchSearchHomeTasks(),
    watchSetYearMonth(),
    watchFetchHomeTasksByDate(),
  ]);
}

export function* watchSearchHomeTasks() {
  yield takeLatest(actions.searchHomeTasks, searchHomeTasks);
}

function* searchHomeTasks(action) {
  const keyword = action.payload;

  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );
    const response: AxiosResponse<HomeTask[]> = yield call(
      searchHomeTasksApi,
      keyword,
      homeId
    );
    const result: HomeTask[] = response.data;

    yield put(actions.searchHomeTasksSuccess(result));
    yield put(appActions.goUrl(PAGE_PATH.SEARCH_HOME_TASK_LIST));
  } catch (error) {
    yield put(actions.searchHomeTasksFailed(error));
    console.error(error);
  }
}

export function* watchSetYearMonth() {
  yield takeLatest(actions.setYearMonth, setYearMonth);
}

function* setYearMonth(action) {
  const { year, month, actionType } = action.payload;

  try {
    let nextYear = year;
    let nextMonth = month;

    if ('previous' === actionType) {
      if (nextMonth === 1) {
        nextMonth = 12;
        nextYear--;
      } else {
        nextMonth--;
      }
    } else {
      if (nextMonth === 12) {
        nextMonth = 1;
        nextYear++;
      } else {
        nextMonth++;
      }
    }

    yield put(
      actions.setYearMonthSuccess({ year: nextYear, month: nextMonth })
    );
  } catch (error) {
    yield put(actions.setYearMonthFailed(error));
    console.error(error);
  }
}

export function* watchFetchHomeTasksByDate() {
  yield takeLatest(actions.fetchHomeTasksByDate, fetchHomeTasksByDate);
}

function* fetchHomeTasksByDate(action) {
  const { year, month } = action.payload;

  try {
    yield delay(250);
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );
    const response: AxiosResponse<HomeTasksByDate> = yield call(
      fetchHomeTasksByDateApi,
      year,
      month,
      homeId
    );
    const result: HomeTasksByDate = response.data;

    yield put(actions.fetchHomeTasksByDateSuccess(result));
  } catch (error) {
    yield put(actions.fetchHomeTasksByDateFailed(error));
    console.error(error);
  }
}
