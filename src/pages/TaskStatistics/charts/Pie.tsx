import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';

const Root = styled.div`
  padding: 0.9rem 1.3rem;
  border-bottom: 1px solid #f2f2f2;
  background-color: #fff;
`;

const PieChart = (props) => {
  const { data, title } = props;

  return (
    <Root>
      <div>
        <h2>{title}</h2>
      </div>
      <Pie type={'pie'} data={data} />
    </Root>
  );
};

export default PieChart;
