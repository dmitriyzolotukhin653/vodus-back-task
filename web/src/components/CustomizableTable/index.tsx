import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from '@mui/material';

import { CustomTableColumn, CustomTableRow } from './types';
import EditableCell from './EditableCell';
import classes from './style.module.css';

type CustomizableTableProps = {
  columns: Array<CustomTableColumn>;
  rows: Array<CustomTableRow>;
  canChangeTableData?: boolean;
  onAddColumn?: (id: string) => void;
  onAddRow?: (id: string) => void;
  onRemoveColumn?: (id: string) => void;
  onRemoveRow?: (id: string) => void;
  onChangeColumn?: (id: string, value: string) => void;
  onChangeRow?: (id: string, value: string, columnId?: string) => void;
};

const lastColumnStyles = {
  width: 20,
};

const CustomizableTable: FC<CustomizableTableProps> = ({
  columns,
  rows,
  onAddColumn,
  onAddRow,
  onRemoveColumn,
  onRemoveRow,
  onChangeColumn,
  onChangeRow,
  canChangeTableData = true,
}) => {
  const handleAddColumn = () => {
    if (!(canChangeTableData && onAddColumn)) return;
    onAddColumn(uuidv4());
  };

  const handleAddRow = () => {
    if (!(canChangeTableData && onAddRow)) return;
    onAddRow(uuidv4());
  };

  const handleRemoveColumn = (id: string) => {
    if (!(canChangeTableData && onRemoveColumn)) return;
    onRemoveColumn(id);
  };

  const handleRemoveRow = (id: string) => {
    if (!(canChangeTableData && onRemoveRow)) return;
    onRemoveRow(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <EditableCell
                  text={column.name}
                  id={column.id}
                  canChangeTableData={canChangeTableData}
                  onChange={onChangeColumn}
                />
              </TableCell>
            ))}
            <TableCell sx={lastColumnStyles}>
              <Box className={classes['table-icon-wrapper']}>
                <AddCircle onClick={handleAddColumn} />
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <EditableCell
                    id={row.id}
                    text={row.data[column.id]}
                    columnId={column.id}
                    canChangeTableData={canChangeTableData}
                    onChange={onChangeRow}
                  />
                </TableCell>
              ))}
              <TableCell sx={lastColumnStyles}>
                {onRemoveRow && (
                  <Box className={classes['table-icon-wrapper']}>
                    <RemoveCircle onClick={() => handleRemoveRow(row.id)} />
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {onRemoveColumn && (
                  <Box className={classes['table-icon-wrapper']}>
                    <RemoveCircle
                      onClick={() => handleRemoveColumn(column.id)}
                    />
                  </Box>
                )}
              </TableCell>
            ))}
            <TableCell sx={lastColumnStyles}>
              <Box className={classes['table-icon-wrapper']}>
                <AddCircle onClick={handleAddRow} />
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CustomizableTable;
