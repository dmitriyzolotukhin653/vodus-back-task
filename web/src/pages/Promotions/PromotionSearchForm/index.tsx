import { FC, MouseEventHandler, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

import DateRangePicker from '../../../components/DateRangePicker';
import { DateRangeType } from '../../../components/DateRangePicker/types';
import { PromotionsSearchParams } from '../../../context/promotionsContext';
import { useSwitch } from '../../../utils/hooks/switch';
import ErrorSnackbar from '../../../components/ErrorSnackbar';

type PromotionSearchFormType = {
  onSubmit: (data: Partial<PromotionsSearchParams>) => void;
};

const PromotionSearchForm: FC<PromotionSearchFormType> = ({ onSubmit }) => {
  const [dateRange, setDateRange] = useState<DateRangeType>([null, null]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [errorSnackbarOpen, openErrorSnackbar, closeErrorSnackbar] =
    useSwitch();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    const resultObj: Partial<PromotionsSearchParams> = {};

    const startDate = dateRange[0];
    const endDate = dateRange[1];

    if (searchQuery) resultObj.search = searchQuery;

    if (startDate) {
      if (!startDate.isValid()) {
        setError('Incorrect date format');
        openErrorSnackbar();
        return;
      }
      resultObj.startDate = startDate.toISOString();
    }

    if (endDate) {
      if (!endDate.isValid()) {
        setError('Incorrect date format');
        openErrorSnackbar();
        return;
      }
      resultObj.endDate = endDate.toISOString();
    }

    onSubmit(resultObj);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        flexWrap: 'wrap',
      }}
    >
      <TextField
        label={'Seach Query'}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <DateRangePicker onChange={setDateRange} sx={{ padding: '0 16px' }} />
      <Button type="button" onClick={handleSubmit}>
        Search
      </Button>
      <ErrorSnackbar
        error={error}
        onClose={closeErrorSnackbar}
        open={errorSnackbarOpen}
      />
    </Box>
  );
};

export default PromotionSearchForm;
