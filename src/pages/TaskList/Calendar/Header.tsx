import { memo, useCallback } from 'react';

interface HeaderProps {
  year: number;
  month: number;
  onClickMovedMonth: (year: number, month: number, text: string) => void;
}

const Header = ({ year, month, onClickMovedMonth }: HeaderProps) => {
  let monthName = '';

  switch (month) {
    case 1:
      monthName = '1월';
      break;
    case 2:
      monthName = '2월';
      break;
    case 3:
      monthName = '3월';
      break;
    case 4:
      monthName = '4월';
      break;
    case 5:
      monthName = '5월';
      break;
    case 6:
      monthName = '6월';
      break;
    case 7:
      monthName = '7월';
      break;
    case 8:
      monthName = '8월';
      break;
    case 9:
      monthName = '9월';
      break;
    case 10:
      monthName = '10월';
      break;
    case 11:
      monthName = '11월';
      break;
    case 12:
      monthName = '12월';
      break;
  }

  const handleChangeItem = useCallback(
    (e) => {
      onClickMovedMonth(year, month, e.target.title);
    },
    [month, onClickMovedMonth, year]
  );

  return (
    <div className="calendar-container__header">
      <div
        className="calendar-container__btn calendar-container__title"
        title="previous"
        onClick={handleChangeItem}
      >
        이전
      </div>

      <h3 className="calendar-container__title">
        {year}년 {monthName}
      </h3>
      <div
        className="calendar-container__btn calendar-container__title"
        title="next"
        onClick={handleChangeItem}
      >
        다음
      </div>
    </div>
  );
};

export default memo(Header);
