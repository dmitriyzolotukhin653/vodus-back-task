import { FC, useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import MaterialReactTable from 'material-react-table';

import PromotionSearchForm from './PromotionSearchForm';
import { columns } from './const';
import {
  PromotionsContext,
  PromotionsSearchParams,
} from '../../context/promotionsContext';
import { useSwitch } from '../../utils/hooks/switch';
import ErrorSnackbar from '../../components/ErrorSnackbar';

const Promotions: FC = () => {
  const { promotions, loading, error, getPromotions } =
    useContext(PromotionsContext);

  const [errorSnackbarOpen, openErrorSnackbar, closeErrorSnackbar] =
    useSwitch();

  const runSearch = (params: PromotionsSearchParams) => {
    getPromotions(params);
  };

  useEffect(() => {
    getPromotions();
  }, [getPromotions]);

  useEffect(() => {
    if (error) openErrorSnackbar();
  }, [error, openErrorSnackbar]);

  return (
    <Box>
      <PromotionSearchForm onSubmit={runSearch} />
      <MaterialReactTable
        columns={columns}
        data={promotions}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={false}
        enableSorting={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        state={{ isLoading: loading }}
        muiTableBodyRowProps={{ hover: false }}
        enableGlobalFilter={false}
      />
      <ErrorSnackbar
        open={errorSnackbarOpen}
        onClose={closeErrorSnackbar}
        error={error}
      />
    </Box>
  );
};

export default Promotions;
