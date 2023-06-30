import {
  all,
  takeLatest,
  put,
  call,
  select,
  delay,
} from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { actions } from './slice';
import { actions as appActions } from 'stores/slice';
import { RootState } from 'stores';
import { PAGE_PATH } from 'constants/index';
import { fetchHomeTasksDetailApi, deleteHomeTasksApi } from 'api';
import { HomeTask } from 'types';

export default function* rootSaga() {
  yield all([watchDeleteHomeTasks(), watchFetchHomeTasksDetail()]);
}

export function* watchDeleteHomeTasks() {
  yield takeLatest(actions.deleteHomeTasks, deleteHomeTasks);
}

function* deleteHomeTasks(action) {
  const item = action.payload;

  try {
    const response = yield call(deleteHomeTasksApi, item.id);
    const result = response.data;

    yield put(actions.deleteHomeTasksSuccess(result));
    yield put(appActions.goUrl(PAGE_PATH.HOME_TASK_LIST));
  } catch (error) {
    yield put(actions.deleteHomeTasksFailed(error));
    console.error(error);
  }
}

export function* watchFetchHomeTasksDetail() {
  yield takeLatest(actions.fetchHomeTasksDetail, fetchHomeTasksDetail);
}

function* fetchHomeTasksDetail(action) {
  const item = action.payload;

  try {
    yield put(appActions.setLoading(true));
    yield put(actions.fetchHomeTasksDetailSuccess([]));

    const homeId = yield select((state: RootState) => state.app.currentHome.id);
    const response: AxiosResponse<HomeTask[]> = yield call(
      fetchHomeTasksDetailApi,
      item,
      homeId
    );
    const result: HomeTask[] = response.data;
    yield put(actions.fetchHomeTasksDetailSuccess(result));
    yield delay(250);
    yield put(appActions.setLoading(false));
  } catch (error) {
    yield put(actions.fetchHomeTasksDetailFailed(error));
    console.error(error);
  }
}
