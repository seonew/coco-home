import { memo, useState } from 'react';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import constants from 'constants/index';

interface DatePickerProps {
  date?: Date;
  onClickItem: (date: Date) => void;
}

const modifiers = {
  sunday: { daysOfWeek: [0] },
  saterday: { daysOfWeek: [6] },
};

const modifiersStyles = {
  saterday: {
    color: '#979797',
    backgroundColor: 'white',
  },
  sunday: {
    color: '#979797',
    backgroundColor: 'white',
  },
  selected: {
    color: 'white',
    backgroundColor: '#f85142',
  },
  outside: {
    backgroundColor: 'white',
  },
};

const DatePickerContainer = ({ date, onClickItem }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState(date ?? new Date());

  const months = constants.CALENDAR.MONTHS;
  const weekdays = constants.CALENDAR.WEEKDAYS;
  const format = 'yyyy-MM-dd';

  const handleDateChange = (currentDate) => {
    setSelectedDate(currentDate);
    onClickItem(currentDate);
  };

  const parseDate = (str, format, locale) => {
    const date = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(date)) {
      return date;
    }
    return undefined;
  };

  const formatDate = (date, format, locale) => {
    return dateFnsFormat(date, format, { locale });
  };

  return (
    <div className="day-picker">
      <DayPickerInput
        value={selectedDate}
        onDayChange={handleDateChange}
        dayPickerProps={{
          selectedDays: new Date(selectedDate),
          months: months,
          weekdaysShort: weekdays,
          modifiers: modifiers,
          modifiersStyles: modifiersStyles,
        }}
        formatDate={formatDate}
        format={format}
        parseDate={parseDate}
      />
    </div>
  );
};

export default memo(DatePickerContainer);
