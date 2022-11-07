import { FC, CSSProperties, useState } from 'react';
import { Dayjs } from 'dayjs';
import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { DateRangeType } from './types';

type DateRangePickerProps = {
  sx?: CSSProperties;
  onChange?: (value: DateRangeType) => void;
};

const DateRangePicker: FC<DateRangePickerProps> = ({
  sx = {},
  onChange = () => {},
}) => {
  const [value, setValue] = useState<DateRangeType>([null, null]);

  const handleStartDateChange = (date: Dayjs | null) => {
    const newValue = [date, value[1]] as DateRangeType;
    setValue(newValue);
    onChange(newValue);
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    const newValue = [value[0], date] as DateRangeType;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
        <DatePicker
          label="Start Date"
          renderInput={(params) => <TextField {...params} />}
          value={value[0]}
          onChange={handleStartDateChange}
          inputFormat="YYYY-MM-DD"
        />
        <Box sx={{ margin: '0 12px' }}> to </Box>
        <DatePicker
          label="End Date"
          renderInput={(params) => <TextField {...params} />}
          value={value[1]}
          onChange={handleEndDateChange}
          inputFormat="YYYY-MM-DD"
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
