import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { memo } from 'react';

const Root = styled.div`
  padding: 0.9rem 1.3rem;
  border-bottom: 1px solid #f2f2f2;
  background-color: #fff;
`;

const PieChart = ({ data }) => {
  return (
    <Root>
      <Pie type={'pie'} data={data} />
    </Root>
  );
};

export default memo(PieChart);
