import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import DataContext from "./data-context";

function DataProvider(props) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({
    subscription: false,
    reminders: [
      {
        id: 1,
        name: "Joshua Salas",
        relationship: "friend",
        date: "1999-05-19",
        type: "birthday",
        description: "",
        card: false,
        gift: false,
        style: "simple",
      },
      {
        id: 2,
        name: "Yearly Cub Scouts",
        relationship: "friend",
        date: "1999-05-20",
        type: "other",
        description: "",
        card: false,
        gift: false,
        style: "simple",
      },
      {
        id: 3,
        name: "Martin Salas",
        relationship: "father",
        date: "2025-01-01",
        type: "birthday",
        description: "",
        card: false,
        gift: false,
        style: "simple",
      },
      {
        id: 4,
        name: "Christmas",
        relationship: "friend",
        date: "1999-12-25",
        type: "holiday",
        description: "",
        card: false,
        gift: false,
        style: "simple",
      },
      {
        id: 5,
        name: "Natalie Portman",
        relationship: "friend",
        date: "2021-02-29",
        type: "anniversary",
        description: "",
        card: false,
        gift: false,
        style: "romantic",
      },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", true);
  };

  function addReminder(reminder) {
    const newReminders = [...userProfile.reminders, reminder];
    setUserProfile((prevState) => {
      return {
        ...prevState,
        reminders: newReminders,
      };
    });
  }

  const dataContext = {
    user: user,
    setUser: setUser,
    userProfile: userProfile,
    setUserProfile: setUserProfile,
    handleLogout: handleLogout,
    addReminder: addReminder,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
