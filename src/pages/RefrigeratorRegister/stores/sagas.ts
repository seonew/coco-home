import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import { actions } from './slice';
import { actions as appActions } from 'stores/slice';
import { RootState } from 'stores';
import { PAGE_PATH } from 'constants/index';
import { insertRefrigeratorFoodsApi } from 'api/refrigerator';
import { RefrigeratorFood } from 'types';

export default function* rootSaga() {
  yield all([watchInsertUserData()]);
}

export function* watchInsertUserData() {
  yield takeLatest(actions.insertUserRegisterRefrigeratorData, insertUserData);
}

function* insertUserData(action) {
  const item = action.payload;

  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );

    const { targetItem, space, count, priority, expirationDay, date } = item;
    let nextItem: RefrigeratorFood = {
      id: '',
      homeId,
      targetItem,
      space,
      count,
      priority,
    };

    if (expirationDay > 0) {
      nextItem = { ...nextItem, expirationDay };
    } else {
      nextItem = { ...nextItem, date };
    }

    yield call(insertRefrigeratorFoodsApi, nextItem);
    yield put(actions.insertUserRegisterRefrigeratorDataSuccess(item));
    yield put(appActions.goUrl(PAGE_PATH.REFRIGERATOR_LIST));
  } catch (error) {
    yield put(actions.insertUserRegisterRefrigeratorDataFailed(error));
    console.error(error);
  }
}
