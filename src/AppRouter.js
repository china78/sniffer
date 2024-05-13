import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HistoryComp from './pages/history';
import MoreComp from './pages/more';
import FooterContainer from './components/FooterContainer';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HistoryComp footer={<FooterContainer />} />} />
        <Route path="/more" element={<MoreComp footer={<FooterContainer />} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
