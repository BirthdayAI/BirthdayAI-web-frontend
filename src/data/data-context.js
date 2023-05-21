import { createContext } from "react";

const DataContext = createContext({
  user: null,
  setUser: () => {},
  userProfile: null,
  setUserProfile: () => {},
  handleLogout: () => {},
  addReminder: () => {},
});

export default DataContext;
