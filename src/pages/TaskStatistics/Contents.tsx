import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { chart } from 'constants/index';

import styled from 'styled-components';
import { StatisticsByHomeTask } from 'types';
import Doughnut from './charts/Doughnut';

interface ContentProps {
  title: string;
  description: string;
}

const Text = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 30px 20px;
  background-color: #fff;
`;

const Contents = ({ title, description }: ContentProps) => {
  const currentDate = useSelector<RootState, { year: number; month: number }>(
    (state) => state.taskList.currentDate
  );
  const year = currentDate.year;
  const month = currentDate.month;

  const statistics = useSelector<RootState, StatisticsByHomeTask>(
    (state) => state.taskStatistics.statistics
  );
  const { key, count } = statistics;
  const data = {
    labels: key,
    datasets: [
      {
        label: '# of Votes',
        data: count,
        backgroundColor: chart.BACKGROUND_COLOR,
        borderColor: chart.BORDER_COLOR,
        borderWidth: 1,
      },
    ],
  };

  const target = (
    <>
      {count.length > 1 && count[0] === count[1]
        ? key.map((item) => {
            return item + ' ';
          })
        : key[0]}
    </>
  );

  return (
    <>
      <Doughnut title={title} data={data} />
      <Text>
        <span>
          {year}년 {month}월 {description} <strong>{target}</strong>
          입니다.
        </span>
      </Text>
    </>
  );
};

export default memo(Contents);
