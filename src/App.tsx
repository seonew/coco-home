import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import { actions } from 'stores/slice';
import { AUTH_KAKAO_URI, AUTH_URI, PAGE_PATH } from './constants/index';

import styled from 'styled-components';
import Callback from './pages/AuthCallback';
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
import PrivateRoute from 'components/PrivateRoute';

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
    dispatch(actions.initialize());
  }, [dispatch]);

  return (
    <AppLayout>
      <Switch>
        <Route exact path={PAGE_PATH.LOGIN} component={Login} />
        <Route
          exact
          path={PAGE_PATH.AUTH_CALLBACK}
          render={(routeProps) => (
            <Callback {...routeProps} authUri={AUTH_URI} />
          )}
        />
        <Route
          exact
          path={PAGE_PATH.AUTH_CALLBACK_KAKAO}
          render={(routeProps) => (
            <Callback {...routeProps} authUri={AUTH_KAKAO_URI} />
          )}
        />
        <PrivateRoute
          path={[
            PAGE_PATH.SEARCH_HOME_TASK_LIST,
            PAGE_PATH.REFRIGERATOR_REGISTER,
            PAGE_PATH.REFRIGERATOR_LIST,
            PAGE_PATH.HOME_TASK_LIST,
            PAGE_PATH.HOME_TASK_DETAIL,
            PAGE_PATH.HOME_TASK_REGISTER,
            PAGE_PATH.HOME_TASK_STATISTICS,
            PAGE_PATH.HOME_REGISTER,
            PAGE_PATH.MYPAGE,
            PAGE_PATH.MAIN,
          ]}
        >
          <Layout>
            <Route
              path={PAGE_PATH.REFRIGERATOR_REGISTER}
              component={RefrigeratorRegister}
            />
            <Route
              exact
              path={PAGE_PATH.HOME_TASK_REGISTER}
              component={TaskRegister}
            />
            <Route
              exact
              path={PAGE_PATH.HOME_REGISTER}
              component={HomeRegister}
            />
            <Route
              exact
              path={PAGE_PATH.HOME_TASK_DETAIL}
              component={TaskDetail}
            />
            <Route
              exact
              path={PAGE_PATH.SEARCH_HOME_TASK_LIST}
              component={SearchList}
            />
            <Route
              exact
              path={PAGE_PATH.REFRIGERATOR_LIST}
              component={RefrigeratorList}
            />
            <Route exact path={PAGE_PATH.HOME_TASK_LIST} component={TaskList} />
            <Route
              exact
              path={PAGE_PATH.HOME_TASK_STATISTICS}
              component={TaskStatistics}
            />
            <Route exact path={PAGE_PATH.MYPAGE} component={Mypage} />
            <Route exact path={PAGE_PATH.MAIN} component={Home} />
          </Layout>

          <Route
            exact
            path={[
              PAGE_PATH.SEARCH_HOME_TASK_LIST,
              PAGE_PATH.REFRIGERATOR_LIST,
              PAGE_PATH.HOME_TASK_STATISTICS,
              PAGE_PATH.HOME_TASK_LIST,
              PAGE_PATH.MYPAGE,
              PAGE_PATH.MAIN,
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

export default App;
