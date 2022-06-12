import {
  all,
  take,
  takeLatest,
  put,
  call,
  select,
} from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { RootState } from 'stores';
import { actions } from './slice';
import { actions as appActions } from 'stores/slice';
import { insertHomesApi, updateHomesApi, fetchMemberUsersApi } from 'api';
import constants from 'constants/index';
import { Home, HomeMember } from 'types';

export default function* rootSaga() {
  yield all([
    watchInitialize(),
    watchInsert(),
    watchUpdate(),
    watchSearchMemberUser(),
    watchAddHomeMembers(),
    watchAddHomeItem(),
    watchRemoveHomeItem(),
  ]);
}

export function* watchInitialize() {
  yield takeLatest(actions.initialize, initialize);
}

function* initialize() {
  try {
    const edited: boolean = yield select(
      (state: RootState) => state.mypage.edited
    );
    let nextHome: Home = {
      id: '',
      displayName: '',
      spaces: constants.HOME.SPACES,
      members: [],
      works: constants.HOME.WORKS,
      items: constants.HOME.ITEMS,
    };

    if (edited) {
      const homeId = yield select(
        (state: RootState) => state.app.currentHome.id
      );
      yield put(appActions.fetchCurrentHomeInfo(homeId));
      yield take(appActions.fetchCurrentHomeInfoSuccess);

      const currentHome: Home = yield select(
        (state: RootState) => state.app.currentHome
      );
      nextHome = {
        ...currentHome,
      };
    }

    yield put(actions.initializeSuccess(nextHome));
  } catch (error) {
    yield put(actions.initializeFailed(error));
    console.error(error);
  }
}

export function* watchInsert() {
  yield takeLatest(actions.insertMyHomeRegister, insert);
}

function* insert(action) {
  const item = action.payload;

  try {
    const edited: boolean = yield select(
      (state: RootState) => state.mypage.edited
    );
    let homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );

    if (edited) {
      yield put(actions.updateMyHomeRegister(item));
    } else {
      const response: AxiosResponse<Home> = yield call(insertHomesApi, item);
      const result: Home = response.data;
      homeId = result.id;

      yield put(actions.insertMyHomeRegisterSuccess());
      yield put(appActions.fetchCurrentHomeInfo(result.id));
    }

    yield put(appActions.updateHomeId(homeId));
    yield put(appActions.goUrl(constants.PAGE_PATH.MYPAGE));
  } catch (error) {
    yield put(actions.insertMyHomeRegisterFailed(error));
    console.error(error);
  }
}

export function* watchUpdate() {
  yield takeLatest(actions.updateMyHomeRegister, update);
}

function* update(action) {
  const item = action.payload;

  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );
    yield call(updateHomesApi, {
      ...item,
      id: homeId,
    });

    yield put(actions.updateMyHomeRegisterSuccess());
    yield put(appActions.fetchCurrentHomeInfo(homeId));
  } catch (error) {
    yield put(actions.updateMyHomeRegisterFailed(error));
    console.error(error);
  }
}

export function* watchSearchMemberUser() {
  yield takeLatest(actions.searchMemberUser, searchMemberUser);
}

function* searchMemberUser(action) {
  const name = action.payload;

  try {
    const response: AxiosResponse<HomeMember[]> = yield call(
      fetchMemberUsersApi,
      name
    );
    const result: HomeMember[] = response.data;
    const members = yield select(
      (state: RootState) => state.homeRegister.nextHome.members
    );
    let nextItems: HomeMember[] = [];

    result.forEach((item) => {
      let added = false;
      members.forEach((member) => {
        if (member.userId === item.userId) {
          added = true;
        }
      });
      nextItems.push({ ...item, added });
    });

    yield put(
      actions.searchMemberUserSuccess(nextItems.length > 0 ? nextItems : result)
    );
  } catch (error) {
    yield put(actions.searchMemberUserFailed(error));
    console.error(error);
  }
}

export function* watchAddHomeMembers() {
  yield takeLatest(actions.addHomeMembers, addHomeMembers);
}

function* addHomeMembers(action) {
  const searchMember = action.payload;

  try {
    const memberList: HomeMember[] = yield select(
      (state: RootState) => state.homeRegister.nextHome.members
    );

    const newMemberList = [...memberList];
    searchMember.map((current) => {
      return newMemberList.push(current);
    });

    yield put(actions.addHomeMembersSuccess(newMemberList));
  } catch (error) {
    yield put(actions.addHomeMembersFailed(error));
    console.error(error);
  }
}

export function* watchAddHomeItem() {
  yield takeLatest(actions.addNextHomeItem, addNextHomeItem);
}

function* addNextHomeItem(action) {
  const { currentType, text } = action.payload;

  try {
    if (currentType === 'spaces') {
      yield put(actions.addHomeSpaces(text));
    } else if (currentType === 'works') {
      yield put(actions.addHomeWorks(text));
    } else if (currentType === 'items') {
      yield put(actions.addHomeItems(text));
    }
    yield put(appActions.setDialogContent(text));
  } catch (error) {
    console.error(error);
  }
}

export function* watchRemoveHomeItem() {
  yield takeLatest(actions.removeNextHomeItem, removeNextHomeItem);
}

function* removeNextHomeItem(action) {
  const { currentType, text } = action.payload;

  try {
    if (currentType === 'spaces') {
      yield put(actions.removeHomeSpaces(text));
    } else if (currentType === 'works') {
      yield put(actions.removeHomeWorks(text));
    } else if (currentType === 'items') {
      yield put(actions.removeHomeItems(text));
    }
    yield put(appActions.setDialogContent(''));
  } catch (error) {
    console.error(error);
  }
}
