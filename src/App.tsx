import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { actions } from 'stores/slice';
import { RootState } from './stores';
import constants from './constants/index';

import styled from 'styled-components';
import Callback from './pages/AuthCallback';
import CallbackKakao from './pages/AuthCallback/Kakao';
import Home from './pages/Home';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import HomeRegister from './pages/HomeRegister';
import TaskStatistics from './pages/TaskStatistics';
import TaskRegister from './pages/TaskRegister';
import TaskList from './pages/TaskList';
import TaskDetail from './pages/TaskDetail';
import RefrigeratorRegister from './pages/RefrigeratorRegister';
import RefrigeratorList from './pages/RefrigeratorList';
import SearchList from './pages/SearchList';
import MenuBar from './components/MenuBar';
import ConfirmModal from 'components/ConfirmModal';
import AlertModal from 'components/AlertModal';

const AppLayout = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const Layout = styled.div`
  width: 100%;
  margin-top: 66px;
  padding-bottom: 10px;
  flex: 1;
  overflow-y: auto;
`;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loginService());
    dispatch(actions.initialize());
  }, [dispatch]);

  return (
    <AppLayout>
      <Switch>
        <Route exact path={constants.PAGE_PATH.LOGIN} component={Login} />
        <Route
          exact
          path={constants.PAGE_PATH.AUTH_CALLBACK}
          component={Callback}
        />
        <Route
          exact
          path={constants.PAGE_PATH.AUTH_CALLBACK_KAKAO}
          component={CallbackKakao}
        />
        <PrivateRoute
          path={[
            constants.PAGE_PATH.SEARCH_HOME_TASK_LIST,
            constants.PAGE_PATH.REFRIGERATOR_REGISTER,
            constants.PAGE_PATH.REFRIGERATOR_LIST,
            constants.PAGE_PATH.HOME_TASK_LIST,
            constants.PAGE_PATH.HOME_TASK_DETAIL,
            constants.PAGE_PATH.HOME_TASK_REGISTER,
            constants.PAGE_PATH.HOME_TASK_STATISTICS,
            constants.PAGE_PATH.HOME_REGISTER,
            constants.PAGE_PATH.MYPAGE,
            constants.PAGE_PATH.MAIN,
          ]}
        >
          <Layout>
            <Route
              path={constants.PAGE_PATH.REFRIGERATOR_REGISTER}
              component={RefrigeratorRegister}
            />
            <Route
              exact
              path={constants.PAGE_PATH.HOME_TASK_REGISTER}
              component={TaskRegister}
            />
            <Route
              exact
              path={constants.PAGE_PATH.HOME_REGISTER}
              component={HomeRegister}
            />
            <Route
              exact
              path={constants.PAGE_PATH.HOME_TASK_DETAIL}
              component={TaskDetail}
            />
            <Route
              exact
              path={constants.PAGE_PATH.SEARCH_HOME_TASK_LIST}
              component={SearchList}
            />
            <Route
              exact
              path={constants.PAGE_PATH.REFRIGERATOR_LIST}
              component={RefrigeratorList}
            />
            <Route
              exact
              path={constants.PAGE_PATH.HOME_TASK_LIST}
              component={TaskList}
            />
            <Route
              exact
              path={constants.PAGE_PATH.HOME_TASK_STATISTICS}
              component={TaskStatistics}
            />
            <Route exact path={constants.PAGE_PATH.MYPAGE} component={Mypage} />
            <Route exact path={constants.PAGE_PATH.MAIN} component={Home} />
          </Layout>

          <Route
            exact
            path={[
              constants.PAGE_PATH.SEARCH_HOME_TASK_LIST,
              constants.PAGE_PATH.REFRIGERATOR_LIST,
              constants.PAGE_PATH.HOME_TASK_STATISTICS,
              constants.PAGE_PATH.HOME_TASK_LIST,
              constants.PAGE_PATH.MYPAGE,
              constants.PAGE_PATH.MAIN,
            ]}
          >
            <MenuBar />
          </Route>
          <ConfirmModal />
          <AlertModal />
        </PrivateRoute>

        <Redirect path="*" to="/" />
      </Switch>
    </AppLayout>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.app.isAuthenticated
  );

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? children : <Redirect to={constants.PAGE_PATH.LOGIN} />
      }
    />
  );
};

export default memo(App);
