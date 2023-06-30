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
import {
  fetchRefrigeratorFoodsApi,
  updateRefrigeratorFoodsApi,
  deleteRefrigeratorFoodsApi,
} from 'api/refrigerator';
import { AxiosResponse } from 'axios';
import { RefrigeratorFood } from 'types';

export default function* rootSaga() {
  yield all([
    watchDeleteRefrigeratorFoods(),
    watchSetFoodCount(),
    watchFetchRefrigeratorFoods(),
  ]);
}

export function* watchDeleteRefrigeratorFoods() {
  yield takeLatest(actions.deleteRefrigeratorFoods, deleteRefrigeratorFoods);
}

function* deleteRefrigeratorFoods(action) {
  const item = action.payload;

  try {
    const response = yield call(deleteRefrigeratorFoodsApi, item.id);
    const result = response.data;

    yield put(actions.deleteRefrigeratorFoodsSuccess(result));
    yield put(actions.fetchRefrigeratorFoods());
    yield put(appActions.goUrl(PAGE_PATH.REFRIGERATOR_LIST));
  } catch (error) {
    yield put(actions.deleteRefrigeratorFoodsFailed(error));
    console.error(error);
  }
}

export function* watchSetFoodCount() {
  yield takeLatest(actions.setFoodCount, setFoodCount);
}

function* setFoodCount(action) {
  const item = action.payload;

  try {
    let fn = updateRefrigeratorFoodsApi;
    if (item.count === 0) {
      fn = deleteRefrigeratorFoodsApi;
    }

    yield call(fn, item.id);

    yield put(actions.setFoodCountSuccess());
    yield put(actions.fetchRefrigeratorFoods());
  } catch (error) {
    yield put(actions.setFoodCountFailed(error));
    console.error(error);
  }
}

export function* watchFetchRefrigeratorFoods() {
  yield takeLatest(actions.fetchRefrigeratorFoods, fetchRefrigeratorFoods);
}

function* fetchRefrigeratorFoods(action) {
  try {
    yield put(appActions.setLoading(true));
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );
    const response: AxiosResponse<RefrigeratorFood[]> = yield call(
      fetchRefrigeratorFoodsApi,
      homeId
    );
    const result: RefrigeratorFood[] = response.data;

    yield put(actions.fetchRefrigeratorFoodsSuccess(result));
    yield delay(250);
    yield put(appActions.setLoading(false));
  } catch (error) {
    yield put(actions.fetchRefrigeratorFoodsFailed(error));
    console.error(error);
  }
}
