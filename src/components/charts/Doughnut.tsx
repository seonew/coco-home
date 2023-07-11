import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { memo } from 'react';

const Root = styled.div`
  padding: 0.9rem 1.3rem;
  border-bottom: 1px solid #f2f2f2;
  background-color: #fff;
`;

const DoughnutChart = ({ data }) => {
  return (
    <Root>
      <Doughnut type={'doughnut'} data={data} />
    </Root>
  );
};

export default memo(DoughnutChart);
