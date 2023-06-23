import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import DataContext from "./data-context";

function useDidMount() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return didMount;
}

function DataProvider(props) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  let [sessionId, setSessionId] = useState("");
  /*const [userProfile, setUserProfile] = useState({
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
  });*/
  const navigate = useNavigate();
  const location = useLocation();
  const didMount = useDidMount();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);
      if (currentUser) {
        await fetch(`${process.env.REACT_APP_backendUrl}/api/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
          body: JSON.stringify({
            id: currentUser.uid,
            phoneNumber: currentUser.phoneNumber,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            let userProfile = { ...data.user };
            if (userProfile.reminders === undefined) {
              userProfile.reminders = [];
            }
            if (userProfile.cards === undefined) {
              userProfile.cards = [];
            }
            userProfile.reminders = Object.values(userProfile.reminders);
            userProfile.cards = Object.values(userProfile.cards);
            setUserProfile(userProfile);
            setUser(currentUser);
            setIsAuthChecked(true);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        if (location.pathname === "/") {
          navigate("/home", true);
        }
      } else {
        setIsAuthChecked(true);
        setUser(null);
        setUserProfile(null);
        if (location.pathname !== "/privacy") {
          navigate("/", true);
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div></div>;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/", true);
  };

  function addReminder(reminder) {
    const reminders = userProfile.reminders || [];
    const newReminders = [reminders, reminder];
    setUserProfile((prevState) => {
      return {
        ...prevState,
        reminders: newReminders,
      };
    });
  }

  function deleteReminder(id) {
    const newReminders = userProfile.reminders.filter(
      (reminder) => reminder.id !== id
    );
    setUserProfile((prevState) => {
      return {
        ...prevState,
        reminders: newReminders,
      };
    });
  }

  function editReminder(reminder) {
    const newReminders = userProfile.reminders.map((r) =>
      r.id === reminder.id ? reminder : r
    );
    setUserProfile((prevState) => {
      return {
        ...prevState,
        reminders: newReminders,
      };
    });
  }

  function addCard(card) {
    const cards = userProfile.cards || [];
    const newCards = [...cards, card];
    setUserProfile((prevState) => {
      return {
        ...prevState,
        cards: newCards,
      };
    });
  }

  function editCard(card) {
    const newCards = userProfile.cards.map((c) =>
      c.id === card.id ? card : c
    );
    setUserProfile((prevState) => {
      return {
        ...prevState,
        cards: newCards,
      };
    });
  }

  function deleteCard(id) {
    const newCards = userProfile.cards.filter((card) => card.id !== id);
    setUserProfile((prevState) => {
      return {
        ...prevState,
        cards: newCards,
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
    isAuthChecked: isAuthChecked,
    sessionId: sessionId,
    setSessionId: setSessionId,
    deleteReminder: deleteReminder,
    editReminder: editReminder,
    addCard: addCard,
    editCard: editCard,
    deleteCard: deleteCard,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
