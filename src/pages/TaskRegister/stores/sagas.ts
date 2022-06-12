import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import { actions } from './slice';
import { actions as appActions } from 'stores/slice';
import { RootState } from 'stores';
import constants from 'constants/index';
import { insertHomesTasksApi, updateHomeTasksApi } from 'api';
import { HomeTask } from 'types';

export default function* rootSaga() {
  yield all([
    watchInsertTaskRegister(),
    watchUpdateTaskRegister(),
    watchGoRegisterPageToCreate(),
    watchGoRegisterPageToEdit(),
  ]);
}

export function* watchUpdateTaskRegister() {
  yield takeLatest(actions.updateTaskRegister, updateTaskRegister);
}

function* updateTaskRegister(action) {
  const item = action.payload;

  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );

    yield call(updateHomeTasksApi, { ...item, homeId });
    yield put(actions.updateTaskRegisterSuccess(item));
    yield put(appActions.goUrl(constants.PAGE_PATH.HOME_TASK_LIST));
  } catch (error) {
    yield put(actions.updateTaskRegisterFailed(error));
    console.error(error);
  }
}

export function* watchInsertTaskRegister() {
  yield takeLatest(actions.insertTaskRegister, insertTaskRegister);
}

function* insertTaskRegister(action) {
  const item = action.payload;

  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );

    yield call(insertHomesTasksApi, { ...item, homeId });
    yield put(actions.insertTaskRegisterSuccess(item));
    yield put(appActions.goUrl(constants.PAGE_PATH.HOME_TASK_LIST));
  } catch (error) {
    yield put(actions.insertTaskRegisterFailed(error));
    console.error(error);
  }
}

export function* watchGoRegisterPageToCreate() {
  yield takeLatest(actions.goRegisterPageToCreate, goRegisterPageToCreate);
}

function* goRegisterPageToCreate() {
  try {
    const result: HomeTask | null = null;
    yield put(actions.setSelectedItem(result));
    yield put(actions.setEdit(false));
    yield put(appActions.goUrl(constants.PAGE_PATH.HOME_TASK_REGISTER));
  } catch (error) {
    console.error(error);
  }
}

export function* watchGoRegisterPageToEdit() {
  yield takeLatest(actions.goRegisterPageToEdit, goRegisterPageToEdit);
}

function* goRegisterPageToEdit(action) {
  const item = action.payload;

  try {
    const homeId: string = yield select(
      (state: RootState) => state.app.currentHome.id
    );
    const result: HomeTask = {
      id: item.id,
      homeId: homeId,
      member: { name: item.member.name, id: item.member.id },
      space: item.space,
      targetItem: item.targetItem,
      work: item.work,
      date: item.date,
      cycle: {
        value: item.cycle.value,
        unit: item.cycle.unit,
      },
    };
    yield put(actions.setSelectedItem(result));
    yield put(actions.setEdit(true));
    yield put(appActions.goUrl(constants.PAGE_PATH.HOME_TASK_REGISTER));
  } catch (error) {
    console.error(error);
  }
}
