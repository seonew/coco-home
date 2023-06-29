import { memo, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actions } from './stores/slice';
import { RootState } from 'stores';
import { StatisticsByHomeTask } from 'types';
import { PAGE_PATH, pageNameByPathName } from 'constants/index';

import styled from 'styled-components';
import SquareColorRound from 'components/SquareColorRound';
import Empty from 'components/Empty';
import Contents from './Contents';
import Header from 'components/Header';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  margin: 10px 0;
`;

const TaskStatistics = () => {
  const [type, setType] = useState('MEMBER');
  const [title, setTitle] = useState('누가 얼마나 참여했나요?');
  const [description, setDescription] = useState('가장 많은 참여를 한 사람은');

  const statistics = useSelector<RootState, StatisticsByHomeTask>(
    (state) => state.taskStatistics.statistics
  );
  const { key } = statistics;

  const dispatch = useDispatch();
  useEffect(() => {
    if (type === 'MEMBER') {
      dispatch(actions.fetchHomeTaskStatisticsItem(type));
    }
  }, [dispatch, type]);

  const handleClickStatistics = useCallback(
    (newType) => () => {
      if (newType === 'MEMBER') {
        setTitle('누가 얼마나 참여했나요?');
        setDescription('가장 많은 참여를 한 사람은');
      } else if (newType === 'ITEM') {
        setTitle('가장 많이 관리한 것은?');
        setDescription('가장 많이 관리한 대상은');
      } else if (newType === 'WORK') {
        setTitle('가장 많이 한 것은?');
        setDescription('가장 많이 한 일은');
      }
      setType(newType);
      dispatch(actions.fetchHomeTaskStatisticsItem(newType));
    },
    [dispatch]
  );

  return (
    <Root>
      <Header text={pageNameByPathName[PAGE_PATH.HOME_TASK_STATISTICS]} />
      <Container>
        <SquareColorRound
          text={'사용자'}
          color={'#f2f4f6'}
          onClickItem={handleClickStatistics('MEMBER')}
        />
        <SquareColorRound
          text={'집안일'}
          color={'#f2f4f6'}
          onClickItem={handleClickStatistics('WORK')}
        />
        <SquareColorRound
          text={'대상'}
          color={'#f2f4f6'}
          onClickItem={handleClickStatistics('ITEM')}
        />
      </Container>
      {key.length > 0 ? (
        <Container>
          <Contents title={title} description={description} />
        </Container>
      ) : (
        <Empty
          text="등록된 데이터가 없어요 ㅠ.ㅠ"
          description="데이터를 추가해 주세요 :)"
        />
      )}
    </Root>
  );
};

export default memo(TaskStatistics);
