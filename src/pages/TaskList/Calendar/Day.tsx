import { CSSProperties, memo, ReactNode, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'stores';
import styled from 'styled-components';

interface DayProp {
  children?: ReactNode;
  day: string;
}

const todayStyle: CSSProperties = {
  color: '#fff',
  fontWeight: 'bold',
  width: '23px',
  height: '18px',
  backgroundColor: '#ff1744',
  borderRadius: '20px',
};

const Today = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 5px;
  height: 44px;
`;

const Day = ({ children, day }: DayProp) => {
  const currentDate = useSelector<RootState, { year: number; month: number }>(
    (state) => state.taskList.currentDate
  );
  const year = currentDate.year;
  const month = currentDate.month;
  const history = useHistory();

  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth() + 1;
  const isNow = thisYear === year && thisMonth === month;
  const today = new Date().getDate().toString();

  const handleDisplayItemInfo = useCallback(
    (selectedDay) => () => {
      history.push(
        '/home/task/detail/' + year + '/' + month + '/' + selectedDay
      );
    },
    [history, month, year]
  );

  return (
    <div
      className="calendar-table__item"
      onClick={children ? handleDisplayItemInfo(day) : undefined}
    >
      <Today style={isNow && today === day ? todayStyle : undefined}>
        {day}
      </Today>
      {children}
    </div>
  );
};

export default memo(Day);
