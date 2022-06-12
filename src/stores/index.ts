import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { reducer as appReducer } from './slice';
import { reducer as mypageReducer } from '../pages/Mypage/stores/slice';
import { reducer as homeRegisterReducer } from '../pages/HomeRegister/stores/slice';
import { reducer as taskStatisticsReducer } from '../pages/TaskStatistics/stores/slice';
import { reducer as taskRegisterReducer } from '../pages/TaskRegister/stores/slice';
import { reducer as taskListReducer } from '../pages/TaskList/stores/slice';
import { reducer as taskDetailReducer } from '../pages/TaskDetail/stores/slice';
import { reducer as refrigeratorRegisterReducer } from '../pages/RefrigeratorRegister/stores/slice';
import { reducer as refrigeratorListReducer } from '../pages/RefrigeratorList/stores/slice';
import createSagaMiddleware from 'redux-saga';

import saga from './sagas';
import mypageSaga from '../pages/Mypage/stores/sagas';
import homeRegisterSaga from '../pages/HomeRegister/stores/sagas';
import taskStatisticsSaga from '../pages/TaskStatistics/stores/sagas';
import taskRegisterSaga from '../pages/TaskRegister/stores/sagas';
import taskListSaga from '../pages/TaskList/stores/sagas';
import taskDetailSaga from '../pages/TaskDetail/stores/sagas';
import refrigeratorRegisterSaga from '../pages/RefrigeratorRegister/stores/sagas';
import refrigeratorListSaga from '../pages/RefrigeratorList/stores/sagas';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  app: appReducer,
  mypage: mypageReducer,
  homeRegister: homeRegisterReducer,
  taskStatistics: taskStatisticsReducer,
  taskRegister: taskRegisterReducer,
  taskList: taskListReducer,
  taskDetail: taskDetailReducer,
  refrigeratorRegister: refrigeratorRegisterReducer,
  refrigeratorList: refrigeratorListReducer,
});

export const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

export function* rootSaga() {
  yield all([
    saga(),
    mypageSaga(),
    homeRegisterSaga(),
    taskRegisterSaga(),
    taskStatisticsSaga(),
    taskListSaga(),
    taskDetailSaga(),
    refrigeratorRegisterSaga(),
    refrigeratorListSaga(),
  ]);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
