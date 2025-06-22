import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import AdminColors from "./Pages/AdminColors";
import AdminFonts from "./Pages/AdminFonts";
import Settings from "./Pages/Settings";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import PrivateRouteUser from "./components/PrivateRouteUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/colors" element={<AdminColors />} />
          <Route path="/admin/fonts" element={<AdminFonts />} />
        </Route>
        <Route element={<PrivateRouteUser />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
