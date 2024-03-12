import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import EndUser from './components/EndUser';
import TechSupport from './components/TechSupport';
import Admin from './components/Admin';
// import './App.css';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route  path='/' element={<Login/>} />
          <Route  path="/enduser" element={<EndUser/>} />
          <Route  path="/techsupport" element={<TechSupport/>} />
          <Route  path="/admin" element={<Admin/>} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
