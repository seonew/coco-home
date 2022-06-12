import { memo, useEffect, useCallback, CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'stores';
import { actions } from './stores/slice';
import { actions as taskRegisterActions } from '../TaskRegister/stores/slice';
import constants, { pageNameByPathName } from 'constants/index';
import styled from 'styled-components';
import { HomeListItem, HomeTasksByDate } from 'types';

import PieChartIcon from '@material-ui/icons/PieChart';
import AddIcon from '@material-ui/icons/Add';
import Calendar from './Calendar';
import FloatingButton from 'components/FloatingButton';
import Search from 'components/Search';
import EmptyHome from 'pages/HomeInfo/EmptyHome';
import Header from 'components/Header';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
`;

const Container = styled.div`
  animation: fadeIn 0.4s ease-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const CalendarContainer = styled.div`
  background-color: #fff;
  padding: 20px 2px 40px;
  margin-bottom: 10px;
`;

const floatingTopButtonStyle: CSSProperties = {
  position: 'fixed',
  right: 15,
  bottom: 0,
  height: 160,
};

const floatingButtonStyle: CSSProperties = {
  position: 'fixed',
  right: 15,
  bottom: 0,
  height: 110,
};

const TaskList = () => {
  const currentCalendarHomeTasks = useSelector<RootState, HomeTasksByDate>(
    (state) => state.taskList.currentCalendarHomeTasks
  );
  const currentDate = useSelector<RootState, { year: number; month: number }>(
    (state) => state.taskList.currentDate
  );
  const year = currentDate.year;
  const month = currentDate.month;
  const homeId = useSelector<RootState, string>(
    (state) => state.app.currentHome.id
  );
  const homeList = useSelector<RootState, HomeListItem[] | null>(
    (state) => state.mypage.homeList
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickSearchItem = useCallback(
    (text) => {
      dispatch(actions.searchHomeTasks(text));
    },
    [dispatch]
  );

  const handleClickButton = useCallback(
    (url) => () => {
      history.push(url);
    },
    [history]
  );

  const handleClickRegisterButton = useCallback(() => {
    dispatch(taskRegisterActions.goRegisterPageToCreate());
  }, [dispatch]);

  useEffect(() => {
    if (homeId !== '') {
      dispatch(actions.fetchHomeTasksByDate({ year, month }));
    }
  }, [year, month, dispatch, homeId]);

  return (
    <Root>
      <Header text={pageNameByPathName[constants.PAGE_PATH.HOME_TASK_LIST]} />
      {homeId ? (
        <Container>
          <Search
            onClickItem={handleClickSearchItem}
            placeholder={'여기에 검색어를 입력해주세요.'}
          />
          <CalendarContainer>
            <Calendar
              year={currentDate.year}
              month={currentDate.month}
              items={currentCalendarHomeTasks}
            />
          </CalendarContainer>
          <>
            <FloatingButton
              color={'primary'}
              title={'add'}
              style={floatingTopButtonStyle}
              onClick={handleClickRegisterButton}
            >
              <AddIcon />
            </FloatingButton>
            <FloatingButton
              color={'secondary'}
              title={'statistics'}
              style={floatingButtonStyle}
              onClick={handleClickButton(
                constants.PAGE_PATH.HOME_TASK_STATISTICS
              )}
            >
              <PieChartIcon />
            </FloatingButton>
          </>
        </Container>
      ) : (homeList?.length as number) > 0 ? (
        <EmptyHome displayText={'선택'} />
      ) : (
        <EmptyHome displayText={'등록'} />
      )}
    </Root>
  );
};

export default memo(TaskList);
