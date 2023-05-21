import { Route, Navigate, Routes } from "react-router-dom";

import LoginPage from "./login/LoginPage";
import Home from "./home/Home";
import AddReminder from "./add/AddReminder";
import Settings from "./settings/Settings";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} exact />
      <Route
        path="/home"
        element={
          <div className="column">
            <Home />
          </div>
        }
        exact
      />
      <Route
        path="/add"
        element={
          <div className="column">
            <AddReminder />
          </div>
        }
        exact
      />
      <Route
        path="/settings"
        element={
          <div className="column">
            <Settings />
          </div>
        }
        exact
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
