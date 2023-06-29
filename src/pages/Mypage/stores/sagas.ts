import {
  all,
  takeLatest,
  put,
  call,
  delay,
  take,
} from '@redux-saga/core/effects';
import { actions } from './slice';
import { actions as appActions } from 'stores/slice';
import { fetchMyHomeListApi } from 'api';
import { AxiosResponse } from 'axios';
import { HomeListItem } from 'types';
import { PAGE_PATH } from 'constants/index';

export default function* rootSaga() {
  yield all([
    watchFetchHomeList(),
    watchGoHomeRegisterPageToCreate(),
    watchGoHomeRegisterPageToEdit(),
    watchSelectHome(),
    watchDeleteHome(),
  ]);
}

export function* watchDeleteHome() {
  yield takeLatest(actions.deleteHome, deleteHome);
}

function* deleteHome(action) {
  const { homeId } = action.payload;

  try {
    yield put(appActions.deleteHomeId(homeId));
  } catch (error) {
    console.error(error);
  }
}

export function* watchSelectHome() {
  yield takeLatest(actions.selectHome, selectHome);
}

function* selectHome(action) {
  const homeId = action.payload;

  try {
    yield put(appActions.updateHomeId(homeId));
    yield put(actions.setEdited(false));
    yield take(appActions.updateHomeIdSuccess);
    yield put(appActions.goUrl(PAGE_PATH.MAIN));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGoHomeRegisterPageToCreate() {
  yield takeLatest(
    actions.goHomeRegisterPageToCreate,
    goHomeRegisterPageToCreate
  );
}

function* goHomeRegisterPageToCreate(action) {
  const homeId = action.payload;

  try {
    yield put(appActions.updateHomeId(homeId));
    yield put(actions.setEdited(false));
    yield take(appActions.updateHomeIdSuccess);
    yield put(appActions.goUrl(PAGE_PATH.HOME_REGISTER));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGoHomeRegisterPageToEdit() {
  yield takeLatest(actions.goHomeRegisterPageToEdit, goHomeRegisterPageToEdit);
}

function* goHomeRegisterPageToEdit(action) {
  const homeId = action.payload;

  try {
    yield put(appActions.updateHomeId(homeId));
    yield put(actions.setEdited(true));
    yield take(appActions.updateHomeIdSuccess);
    yield put(appActions.goUrl(PAGE_PATH.HOME_REGISTER));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFetchHomeList() {
  yield takeLatest(actions.fetchHomeList, fetchHomeList);
}

function* fetchHomeList(action) {
  try {
    yield put(appActions.setLoading(true));
    const response: AxiosResponse<HomeListItem[]> = yield call(
      fetchMyHomeListApi
    );
    const result: HomeListItem[] = response.data;

    yield put(actions.fetchHomeListSuccess(result));
    yield delay(250);
    yield put(appActions.setLoading(false));
    yield put(actions.setInit(false));
  } catch (error) {
    yield put(actions.fetchHomeListFailed(error));
    console.error(error);
  }
}
