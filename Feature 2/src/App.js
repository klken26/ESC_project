import './App.css';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Load_data from './load_data.js'
import Hi from './hi.js'
import Button from './button.js'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Button/>} exact/>
          <Route path="/search" element={<Load_data/>} />
          <Route path="/hi" element={<Hi/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
