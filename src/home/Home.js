import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UpgradePopup from "../upgrade/UpgradePopup";
import Modal from "../modal/Modal";
import DataContext from "../data/data-context";
import Anniversary from "./Anniversary";
import Birthday from "./Birthday";
import Holiday from "./Holiday";
import Other from "./Other";
import "./Home.css";

function calculateDiffDays(birthday) {
  const now = new Date();
  let year = now.getFullYear();
  const [_, month, day] = birthday.split("-");
  let nextBirthday = new Date(year, month - 1, day);

  let diffDays;
  // If today is the birthday
  if (
    now.getMonth() === nextBirthday.getMonth() &&
    now.getDate() === nextBirthday.getDate()
  ) {
    diffDays = 0;
  } else {
    // If the birthday has already passed this year, set to next year
    if (now > nextBirthday) {
      nextBirthday.setFullYear(year + 1);
    }

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    diffDays = Math.floor(Math.abs((now - nextBirthday) / oneDay)) + 1;
  }

  return diffDays;
}

function Home() {
  let [success, setSuccess] = useState(false);
  let [failure, setFailure] = useState(false);
  const dataCtx = useContext(DataContext);
  const user = dataCtx.user;
  const userProfile = dataCtx.userProfile;
  const sessionId = dataCtx.sessionId;
  const setSessionId = dataCtx.setSessionId;

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id"));
    }

    if (query.get("canceled")) {
      setFailure(true);
    }
  }, [sessionId]);

  // Add the showUpgradePopup state variable
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const sortedReminders = [...userProfile.reminders].sort((a, b) => {
    const aDiffDays = calculateDiffDays(a.date);
    const bDiffDays = calculateDiffDays(b.date);

    return aDiffDays - bDiffDays;
  });

  // This function will be used to show the SuccessModal
  const showSuccessModal = () => setIsSuccessModalOpen(true);

  // This function will be used to hide the SuccessModal
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  // This function will be used to show the UpgradePopup
  const showPopup = () => setShowUpgradePopup(true);

  // This function will be used to hide the UpgradePopup
  const closePopup = () => setShowUpgradePopup(false);

  return (
    <>
      {success && (
        <Modal
          onClose={() => setSuccess(false)}
          title="Congratulations!"
          content="You have successfully upgraded your account!"
        />
      )}
      {failure && (
        <Modal
          onClose={() => setFailure(false)}
          title="Oops!"
          content="Something went wrong with your payment. Please try again."
        />
      )}
      {isSuccessModalOpen && (
        <Modal
          onClose={closeSuccessModal}
          title="Congratulations!"
          content="You have successfully upgraded your account!"
        />
      )}
      {showUpgradePopup && (
        <UpgradePopup onClose={closePopup} openModal={showSuccessModal} />
      )}
      <div className="top-panel">
        <div className="left-icon">
          <Link to="/settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="settings-icon"
              width="30"
              height="30"
              fill="white"
              id="bi bi-gear-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
          </Link>
        </div>
        <div className="top-panel-title">
          <h1>BirthdayAI</h1>
        </div>
        <div className="right-icons">
          {!userProfile.subscription && (
            <button className="upgrade-button" onClick={showPopup}>
              Upgrade
            </button>
          )}
          <Link to="/add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="plus-icon"
              width="30"
              height="30"
              fill="white"
              id="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="ai-items">
        {sortedReminders.map((item) => {
          if (item.type === "birthday") {
            return <Birthday item={item} key={item.id} />;
          } else if (item.type === "anniversary") {
            return <Anniversary item={item} key={item.id} />;
          } else if (item.type === "holiday") {
            return <Holiday item={item} key={item.id} />;
          } else {
            return <Other item={item} key={item.id} />;
          }
        })}
        {!userProfile.subscription && (
          <h3 className="ai-upgrade-text">
            Add up to 5 reminders or upgrade to get more!
          </h3>
        )}
      </div>
    </>
  );
}

export default Home;
