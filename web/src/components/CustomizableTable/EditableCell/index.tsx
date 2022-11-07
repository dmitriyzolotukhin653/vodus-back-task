import { FC, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import ModeEdit from '@mui/icons-material/ModeEdit';

import classes from './styles.module.css';

type EditableCellProps = {
  id: string;
  text: string;
  canChangeTableData: boolean;
  columnId?: string;
  onChange?: (id: string, value: string, columnId?: string) => void;
};

const EditableCell: FC<EditableCellProps> = ({
  text,
  id,
  onChange,
  columnId,
  canChangeTableData,
}) => {
  const [inEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState(text);

  const handleChange = () => {
    if (!(canChangeTableData && onChange)) return;
    onChange(id, value, columnId);
    setEditMode(false);
  };

  if (inEditMode)
    return (
      <Box className={classes['edit-input__active']}>
        <TextField
          defaultValue={text}
          variant="standard"
          onChange={(event) => setValue(event.target.value)}
        />{' '}
        <Box className={classes['edit-input__active_icons']}>
          <Check onClick={handleChange} />{' '}
          <Close onClick={() => setEditMode(false)} />
        </Box>
      </Box>
    );

  return (
    <Box className={classes['edit-input']}>
      <Typography>{text}</Typography>{' '}
      {onChange && <ModeEdit onClick={() => setEditMode(true)} />}
    </Box>
  );
};

export default EditableCell;
