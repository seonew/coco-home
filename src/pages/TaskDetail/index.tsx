import { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'stores';
import { actions } from './stores/slice';
import { HomeTask } from 'types';
import { PAGE_PATH, PageNameByPathName } from 'constants/index';

import styled from 'styled-components';
import List from './List';
import Skeleton from './Skeleton';
import Header from 'components/Header';

interface ParamTypes {
  year: string;
  month: string;
  day: string;
}

const Root = styled.div`
  height: 100%;
  background-color: #f4f4f4;
`;

const TaskDetail = () => {
  const dispatch = useDispatch();
  const currentHomeTasks = useSelector<RootState, HomeTask[] | null>(
    (state) => state.taskDetail.currentHomeTasks
  );
  const loading = useSelector<RootState, boolean>((state) => state.app.loading);

  const param = useParams<ParamTypes>();
  const { year, month, day } = param;

  useEffect(() => {
    const targetDate = { year: year, month: month, day: day };
    dispatch(actions.fetchHomeTasksDetail(targetDate));
  }, [day, dispatch, month, year]);

  return (
    <Root>
      <Header text={PageNameByPathName[PAGE_PATH.HOME_TASK_DETAIL]} />
      {loading ? <Skeleton /> : <List items={currentHomeTasks} />}
    </Root>
  );
};

export default memo(TaskDetail);
