import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { HomeTask } from 'types';

interface DayInfo {
  name: Array<string>;
}

interface WeekProps {
  days: string[];
  items: Record<string, HomeTask[]>;
  onDisplayItemInfo: (day: number) => void;
}

const Content = styled.div`
  position: absolute;
  top: 24px;

  display: inline-block;
  min-width: 2px;
  height: 6px;
  padding: 0px 2px;
  background-color: #ff1744;
  background-image: linear-gradient(150deg, #ff1744, #ff1744 50%, #b2102f);
  border-radius: 18px;
  font-size: 10px;
  line-height: 18px;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
  vertical-align: top;
`;

const Week = ({ days, items, onDisplayItemInfo }: WeekProps) => {
  const handleDisplayItemInfo = useCallback(
    (selectedDay) => () => {
      onDisplayItemInfo(selectedDay);
    },
    [onDisplayItemInfo]
  );

  return (
    <div className="calendar-table__row">
      {days.map((day, index) => {
        const dayInfo: DayInfo = {
          name: [],
        };
        if (items[day] && items[day].length > 0) {
          if (items[day].length > 1) {
            items[day].map((item) => {
              return dayInfo.name.push(item.space);
            });
          } else if (items[day].length === 1) {
            dayInfo.name.push(items[day][0].space);
          } else {
          }
        }

        return (
          <div className="calendar-table__col" key={index}>
            {dayInfo.name.length > 0 ? (
              <div
                className="calendar-table__item"
                onClick={handleDisplayItemInfo(day)}
              >
                <div>{day}</div>
                <Content />
              </div>
            ) : (
              <div className="calendar-table__item">
                <div>{day}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Week);
