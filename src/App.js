import { useContext } from "react";

import { Route, Navigate, Routes } from "react-router-dom";

import LoginPage from "./login/LoginPage";
import Home from "./home/Home";
import AddReminder from "./add/AddReminder";
import EditReminder from "./edit/EditReminder";
import Settings from "./settings/Settings";
import PrivacyPolicy from "./privacy/PrivacyPolicy";
import ImageGeneration from "./image/ImageGeneration";
import DataContext from "./data/data-context";
import "./App.css";

function App() {
  const dataCtx = useContext(DataContext);
  const isAuthChecked = dataCtx.isAuthChecked;

  if (!isAuthChecked) {
    return <div></div>;
  }

  return (
    <Routes>
      {dataCtx.user ? (
        <>
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
          <Route
            path="/generate"
            element={
              <div className="column">
                <ImageGeneration />
              </div>
            }
            exact
          />
          <Route
            path="/edit/:id"
            element={
              <div className="column">
                <EditReminder />
              </div>
            }
            exact
          />
          <Route
            path="/privacy"
            element={
              <div className="column">
                <PrivacyPolicy />
              </div>
            }
            exact
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LoginPage />} exact />
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/privacy"
            element={
              <div className="column">
                <PrivacyPolicy />
              </div>
            }
            exact
          />
        </>
      )}
    </Routes>
  );
}

export default App;
