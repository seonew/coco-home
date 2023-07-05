import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores';
import { CHART } from 'constants/index';

import styled from 'styled-components';
import { StatisticsByHomeTask } from 'types';
import Doughnut from '../../components/charts/Doughnut';

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
  const { keys, counts } = statistics;
  const data = {
    labels: keys,
    datasets: [
      {
        label: '# of Votes',
        data: counts,
        backgroundColor: CHART.BACKGROUND_COLOR,
        borderColor: CHART.BORDER_COLOR,
        borderWidth: 1,
      },
    ],
  };

  const target =
    counts.length > 1 && counts[0] === counts[1]
      ? keys.map((item) => item)
      : keys[0];

  return (
    <>
      <Doughnut title={title} data={data} />
      <Text>
        <span>
          {year}년 {month}월 <span className="mr5">{description}</span>
          <strong>
            <span className="mr5">{target}</span>
          </strong>
          입니다.
        </span>
      </Text>
    </>
  );
};

export default memo(Contents);
