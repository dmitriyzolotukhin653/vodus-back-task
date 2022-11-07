import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const TaskSelect: FC = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link to="/promotions" style={{ textDecoration: 'none' }}>
        <Button variant="contained" endIcon={<SendIcon />}>
          To Promotions Table
        </Button>
      </Link>
      <Link to="/draggable" style={{ textDecoration: 'none' }}>
        <Button variant="contained" endIcon={<SendIcon />}>
          To Draggable Table
        </Button>
      </Link>
    </Stack>
  );
};

export default TaskSelect;
