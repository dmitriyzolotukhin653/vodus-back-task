import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Promotions from './Promotions';
import { PromotionsProvider } from '../context/promotionsContext';
import TaskSelect from './TaskSelect';
import DraggableTable from './DraggableTable';

function App() {
  return (
    <PromotionsProvider>
      <Routes>
        <Route path="*" element={<TaskSelect />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/draggable" element={<DraggableTable />} />
      </Routes>
    </PromotionsProvider>
  );
}

export default App;
