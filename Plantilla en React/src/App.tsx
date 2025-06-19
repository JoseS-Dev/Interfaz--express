import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Admin from './Pages/Admin';
import AdminColors from './Pages/AdminColors';
import AdminFonts from './Pages/AdminFonts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/colors' element={<AdminColors/>}/>
        <Route path='/admin/fonts' element={<AdminFonts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
