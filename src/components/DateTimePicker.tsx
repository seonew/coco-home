import { memo, useState } from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';

interface DateTimePickerProps {
  onClickItem: (date: Date) => void;
}

const DateTimePickerContainer = ({ onClickItem }: DateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onClickItem(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        toolbarTitle={false}
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        minDate={new Date('2021-11-01T00:00')}
        inputFormat="yyyy/MM/dd hh:mm a"
        mask="___/__/__ __:__ _M"
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default memo(DateTimePickerContainer);
