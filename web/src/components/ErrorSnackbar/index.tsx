import { FC } from 'react';
import { Alert, Box, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ErrorSnackbarProps = {
  open: boolean;
  error: string | null;
  onClose: () => void;
};

const ErrorSnackbar: FC<ErrorSnackbarProps> = ({ open, error, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={(event, reason) => reason !== 'clickaway' && onClose()}
  >
    <Alert severity="error" sx={{ alignItems: 'center' }}>
      <Box sx={{ transform: 'translateY(1px)' }}>
        {error}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Alert>
  </Snackbar>
);

export default ErrorSnackbar;
