import { useContext } from "react";

import { Route, Navigate, Routes } from "react-router-dom";

import LoginPage from "./login/LoginPage";
import Home from "./home/Home";
import AddReminder from "./add/AddReminder";
import EditReminder from "./edit/EditReminder";
import Settings from "./settings/Settings";
import DataContext from "./data/data-context";
import "./App.css";

function App() {
  const dataCtx = useContext(DataContext);
  const isAuthChecked = dataCtx.isAuthChecked;
  return (
    <Routes>
      <Route path="/" element={isAuthChecked && <LoginPage />} exact />
      <Route
        path="/home"
        element={
          isAuthChecked && (
            <div className="column">
              <Home />
            </div>
          )
        }
        exact
      />
      {dataCtx.user && (
        <>
          <Route
            path="/add"
            element={
              isAuthChecked && (
                <div className="column">
                  <AddReminder />
                </div>
              )
            }
            exact
          />
          <Route
            path="/settings"
            element={
              isAuthChecked && (
                <div className="column">
                  <Settings />
                </div>
              )
            }
            exact
          />
          <Route
            path="/edit/:id"
            element={
              isAuthChecked && (
                <div className="column">
                  <EditReminder />
                </div>
              )
            }
            exact
          />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
