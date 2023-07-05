import { useCallback, memo, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../stores/slice';

import Header from './Header';
import Week from './Week';
import './calendar.css';
import { HomeTask, HomeTasksByDate } from 'types';

interface CalendarProps {
  year: number;
  month: number;
  items: HomeTasksByDate;
}

const Calendar = ({ year, month, items }: CalendarProps) => {
  const dispatch = useDispatch();
  const setDate = new Date(year, month - 1, 1);
  const firstDay = setDate.getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const dayGroups = useMemo(() => {
    return calculateDayGroups(firstDay, lastDate);
  }, [firstDay, lastDate]);

  const list = calculateTaskList(firstDay, lastDate, items);

  const handleChangeMonth = useCallback(
    (year, month, actionType) => {
      if (actionType === 'previous') {
        dispatch(actions.goToPreviousMonth({ year, month }));
      } else {
        dispatch(actions.goToNextMonth({ year, month }));
      }
    },
    [dispatch]
  );

  return (
    <div className="calendar-container">
      <div className="calendar-container__top">
        <div className="calendar-container__top__bar" />
        <div className="calendar-container__top__spring" />
        <div className="calendar-container__top__spring" />
      </div>
      <Header year={year} month={month} onClickMovedMonth={handleChangeMonth} />
      <div className="calendar-container__body">
        <div className="calendar-table">
          <div className="calendar-table__header">
            <div className="calendar-table__row">
              <div className="calendar-table__col">S</div>
              <div className="calendar-table__col">M</div>
              <div className="calendar-table__col">T</div>
              <div className="calendar-table__col">W</div>
              <div className="calendar-table__col">T</div>
              <div className="calendar-table__col">F</div>
              <div className="calendar-table__col">S</div>
            </div>
          </div>
          <div className="calendar-table__body">
            {dayGroups.map((week, index) => {
              return <Week key={index} days={week} items={list[index]} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Calendar);

const calculateDayGroups = (firstDay, lastDate) => {
  let startDayCount = 1;
  let result: string[][] = [];

  for (let i = 0; i < 6; i++) {
    let week: string[] = [];
    for (let j = 0; j < 7; j++) {
      let temp = '';
      if (i === 0 && j < firstDay) {
      } else if (startDayCount > lastDate) {
        if (i === 5 && j === 0) {
          break;
        }
      } else {
        temp = startDayCount + '';
        startDayCount++;
      }
      week.push(temp);
    }
    result.push(week);
  }
  return result;
};

const calculateTaskList = (firstDay, lastDate, items) => {
  let startDayCount = 1;
  let startDayObjCount = 0;
  let resultObj: Record<string, HomeTask[]>[] = [];

  for (let i = 0; i < 6; i++) {
    let weekObj = {};
    for (let j = 0; j < 7; j++) {
      let tempObj: HomeTask[] = [];
      if (i === 0 && j < firstDay) {
      } else if (startDayCount > lastDate) {
        if ((i === 5 && j === 0) || startDayCount === lastDate + 1) {
          break;
        }
      } else {
        tempObj = items[startDayCount];

        startDayCount++;
        startDayObjCount++;
      }
      weekObj[startDayObjCount] = tempObj;
    }
    resultObj.push(weekObj);
  }
  return resultObj;
};
