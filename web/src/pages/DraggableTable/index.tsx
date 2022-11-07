import { FC, useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import { Box } from '@mui/material';
import CustomizableTable from '../../components/CustomizableTable';
import {
  CustomTableColumn,
  CustomTableRow,
} from '../../components/CustomizableTable/types';

const DraggableTable: FC = () => {
  const [isDragging, setDragging] = useState(false);
  const [columns, setColumns] = useState<Array<CustomTableColumn>>([]);
  const [rows, setRows] = useState<Array<CustomTableRow>>([]);

  const handleDragStart = () => setDragging(true);
  const handleDragStop = () => setDragging(false);

  const handleAddColumn = useCallback((id: string) => {
    setColumns((columns) => [...columns, { name: '', id }]);
  }, []);

  const handleRemoveColumn = useCallback(
    (id: string) => {
      const columnIndex = columns.findIndex((column) => column.id === id);
      if (columnIndex === -1) return;
      setColumns([
        ...columns.slice(0, columnIndex),
        ...columns.slice(columnIndex + 1),
      ]);
    },
    [columns],
  );

  const handleAddRow = useCallback((id: string) => {
    setRows((rows) => [...rows, { data: {}, id }]);
  }, []);

  const handleRemoveRow = useCallback(
    (id: string) => {
      const rowIndex = rows.findIndex((row) => row.id === id);
      if (rowIndex === -1) return;
      setRows([...rows.slice(0, rowIndex), ...rows.slice(rowIndex + 1)]);
    },
    [rows],
  );

  const handleChangeColumn = useCallback(
    (id: string, value: string) => {
      const columnIndex = columns.findIndex((column) => column.id === id);
      if (columnIndex === -1) return;
      setColumns([
        ...columns.slice(0, columnIndex),
        { ...columns[columnIndex], name: value },
        ...columns.slice(columnIndex + 1),
      ]);
    },
    [columns],
  );

  const handleChangeRow = useCallback(
    (id: string, value: string, columnId?: string) => {
      if (!columnId) return;

      const rowIndex = rows.findIndex((row) => row.id === id);
      if (rowIndex === -1) return;
      setRows([
        ...rows.slice(0, rowIndex),
        {
          ...rows[rowIndex],
          data: { ...rows[rowIndex].data, [columnId]: value },
        },
        ...rows.slice(rowIndex + 1),
      ]);
    },
    [rows],
  );

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Draggable
        bounds="parent"
        onStart={handleDragStart}
        onStop={handleDragStop}
      >
        <div style={{ display: 'inline-block' }}>
          <CustomizableTable
            columns={columns}
            rows={rows}
            onAddColumn={handleAddColumn}
            onRemoveColumn={handleRemoveColumn}
            onAddRow={handleAddRow}
            onRemoveRow={handleRemoveRow}
            canChangeTableData={!isDragging}
            onChangeColumn={handleChangeColumn}
            onChangeRow={handleChangeRow}
          />
        </div>
      </Draggable>
    </Box>
  );
};

export default DraggableTable;
