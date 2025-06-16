import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Admin from './Pages/Admin';
import AdminColors from './Pages/AdminColors';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/colors' element={<AdminColors/>}/>
      </Routes>
    </Router>
  );
}

export default App;
