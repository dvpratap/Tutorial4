import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import './App.css'
import SearchPage from './SearchPage';
import DataPage from './DataPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/searchPage" element={<SearchPage/>} />
        <Route path="dataPage" element={<DataPage/>} />
      </Routes>
    </Router>
  )
}

export default App