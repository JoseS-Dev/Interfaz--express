import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import AdminColors from "./Pages/AdminColors";
import AdminFonts from "./Pages/AdminFonts";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import AdminUsers from "./Pages/AdminUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/colors" element={<AdminColors />} />
          <Route path="/admin/fonts" element={<AdminFonts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
