import {
  all,
  takeLatest,
  put,
  call,
  select,
  getContext,
  delay,
  take,
} from '@redux-saga/core/effects';
import { actions } from './slice';
import { actions as myHomeListActions } from '../pages/Mypage/stores/slice';
import {
  fetchCurrentHomeInfoApi,
  updateUserApi,
  deleteHomesApi,
  fetchHomeTasksAlertApi,
  loginGuestApi,
  fetchUserInfoApi,
} from '../api';
import { fetchRefrigeratorSummaryApi } from '../api/refrigerator';
import store, { RootState } from 'stores';
import { AxiosResponse } from 'axios';
import constants from 'constants/index';
import { Home, HomeAlert, User } from 'types';

export default function* rootSaga() {
  yield all([
    watchDeleteHomeId(),
    watchUpdateHomeId(),
    watchFetchCurrentHomeInfo(),
    watchFetchRefrigeratorSummary(),
    watchFetchHomeTasksAlert(),
    watchGoTaskRegisterPage(),
    watchFetchMainHomeInfo(),
    watchLogin(),
    watchLoginGuest(),
    watchLogout(),
    watchInitialize(),
    watchGoUrl(),
    watchFetchUserInfo(),
    watchShowConfirmModal(),
  ]);
}

export function* watchInitialize() {
  yield takeLatest(actions.initialize, initialize);
}

function* initialize() {
  try {
    const isAuthenticated = yield select(
      (state: RootState) => state.app.isAuthenticated
    );
    const history = yield getContext('history');
    history.listen((location) => {
      const path = location.pathname;
      if (path === constants.PAGE_PATH.LOGIN && isAuthenticated) {
        store.dispatch(actions.logout());
      }
    });

    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );
    if (homeId !== '') {
      yield put(actions.fetchCurrentHomeInfo(homeId));
    }

    yield put(actions.initializeSuccess());
  } catch (error) {
    yield put(actions.initializeFailed(error));
    console.error(error);
  }
}

export function* watchFetchMainHomeInfo() {
  yield takeLatest(actions.fetchMainHomeInfo, fetchMainHomeInfo);
}

function* fetchMainHomeInfo(action) {
  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );

    if (homeId !== '') {
      yield put(actions.fetchCurrentHomeInfo(homeId));
      yield put(actions.fetchRefrigeratorSummary(homeId));
      yield put(actions.fetchHomeTasksAlert());
    }
  } catch (error) {
    console.error(error);
  }
}

export function* watchGoTaskRegisterPage() {
  yield takeLatest(actions.goTaskRegisterPage, goTaskRegisterPage);
}

function* goTaskRegisterPage(action) {
  try {
    yield put(actions.goUrl(constants.PAGE_PATH.HOME_REGISTER));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFetchHomeTasksAlert() {
  yield takeLatest(actions.fetchHomeTasksAlert, fetchHomeTasksAlert);
}

function* fetchHomeTasksAlert(action) {
  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );
    const response: AxiosResponse<HomeAlert[]> = yield call(
      fetchHomeTasksAlertApi,
      homeId
    );
    const result: HomeAlert[] = response.data;

    yield put(actions.fetchHomeTasksAlertSuccess(result));
  } catch (error) {
    yield put(actions.fetchHomeTasksAlertFailed(error));
    console.error(error);
  }
}

export function* watchFetchRefrigeratorSummary() {
  yield takeLatest(actions.fetchRefrigeratorSummary, fetchRefrigeratorSummary);
}

function* fetchRefrigeratorSummary(action) {
  const homeId = action.payload;

  try {
    const response: AxiosResponse<Record<string, string>[]> = yield call(
      fetchRefrigeratorSummaryApi,
      homeId
    );
    const result: Record<string, string>[] = response.data;

    yield put(actions.fetchRefrigeratorSummarySuccess(result));
  } catch (error) {
    yield put(actions.fetchRefrigeratorSummaryFailed(error));
    console.error(error);
  }
}

export function* watchDeleteHomeId() {
  yield takeLatest(actions.deleteHomeId, deleteHomeId);
}

function* deleteHomeId(action) {
  const homeId = action.payload;

  try {
    const response = yield call(deleteHomesApi, homeId);
    const nextHomeList = response.data;

    let nextHomeId = '';
    if (nextHomeList.length > 0) {
      nextHomeId = nextHomeList[0].homeId;
    }
    yield put(actions.updateHomeId(nextHomeId));

    yield put(myHomeListActions.fetchHomeListSuccess(nextHomeList));
    yield put(actions.deleteHomeIdSuccess());
  } catch (error) {
    yield put(actions.deleteHomeIdFailed(error));
    console.error(error);
  }
}

export function* watchUpdateHomeId() {
  yield takeLatest(actions.updateHomeId, updateHomeId);
}

function* updateHomeId(action) {
  const homeId = action.payload;

  try {
    const response = yield call(updateUserApi, homeId);
    const result = response.data;

    localStorage.setItem('lastHomeId', result);
    yield put(actions.updateHomeIdSuccess(result));
    yield put(actions.setInit(true));
    yield put(myHomeListActions.setInit(true));
  } catch (error) {
    yield put(actions.updateHomeIdFailed(error));
    console.error(error);
  }
}

export function* watchFetchCurrentHomeInfo() {
  yield takeLatest(actions.fetchCurrentHomeInfo, fetchCurrentHomeInfo);
}

function* fetchCurrentHomeInfo(action) {
  const homeId = action.payload;

  try {
    yield put(actions.setLoading(true));
    const response: AxiosResponse<Home> = yield call(
      fetchCurrentHomeInfoApi,
      homeId
    );
    const result = response.data;

    yield put(actions.fetchCurrentHomeInfoSuccess(result));
    yield delay(250);
    yield put(actions.setLoading(false));
    yield put(actions.setInit(false));
  } catch (error) {
    yield put(actions.fetchCurrentHomeInfoFailed(error));
    console.error(error);
  }
}

export function* watchFetchUserInfo() {
  yield takeLatest(actions.fetchUserInfo, fetchUserInfo);
}

function* fetchUserInfo(action) {
  try {
    const response = yield call(fetchUserInfoApi);
    const result: User = response.data;

    yield put(actions.fetchUserInfoSuccess(result));
  } catch (error) {
    console.error(error);
  }
}

export function* watchShowConfirmModal() {
  yield takeLatest(actions.showConfirmModal, showConfirmModal);
}

function* showConfirmModal(action) {
  const { title, text, confirmAction } = action.payload;

  try {
    yield put(actions.resetConfirmModal());
    yield put(
      actions.setConfirmModal({ open: true, title, text, confirmAction })
    );
  } catch (error) {
    console.error(error);
  }
}

export function* watchLogin() {
  yield takeLatest(actions.login, login);
}

function* login(action) {
  const { token, name, lastHomeId, imgUrl, userId } = action.payload;

  try {
    localStorage.setItem('access_token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('lastHomeId', lastHomeId);
    yield put(
      actions.loginSuccess({ token, name, lastHomeId, imgUrl, userId })
    );

    yield put(actions.initialize());
    yield take(actions.initializeSuccess);

    const history = yield getContext('history');
    history.push(constants.PAGE_PATH.MYPAGE);
  } catch (error) {
    console.error(error);
  }
}

export function* watchLoginGuest() {
  yield takeLatest(actions.loginGuest, loginGuest);
}

function* loginGuest() {
  const history = yield getContext('history');

  try {
    const response = yield call(loginGuestApi);
    const { access_token, name, lastHomeId, imgUrl, userId } = response.data;

    yield put(
      actions.login({
        token: access_token,
        name,
        lastHomeId,
        imgUrl,
        userId,
      })
    );
  } catch (error) {
    console.error(error);
    history.push(constants.PAGE_PATH.LOGIN);
  }
}

export function* watchLogout() {
  yield takeLatest(actions.logout, logout);
}

function* logout() {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('lastHomeId');
    yield put(actions.logoutSuccess());
  } catch (error) {
    console.error(error);
  }
}

export function* watchGoUrl() {
  yield takeLatest(actions.goUrl, goUrl);
}

function* goUrl(action) {
  const url = action.payload;

  try {
    const history = yield getContext('history');
    history.push(url);
  } catch (error) {
    console.error(error);
  }
}
