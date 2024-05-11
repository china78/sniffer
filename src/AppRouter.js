import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HistoryComp from './pages/history';
import MoreComp from './pages/more';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HistoryComp />} />
        <Route path="/more" element={<MoreComp />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
