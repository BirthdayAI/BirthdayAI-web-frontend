import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import UpgradePopup from "../upgrade/UpgradePopup";
import Modal from "../modal/Modal";
import DataContext from "../data/data-context";
import "./AddReminder.css";

function AddReminder() {
  const [type, setType] = useState("Birthday");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [style, setStyle] = useState("Simple");
  const [description, setDescription] = useState("");
  const [card, setCard] = useState(false);
  const [gift, setGift] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [navigateHome, setNavigateHome] = useState(false);
  const [hasButton, setHasButton] = useState(false);
  const [isUpgradePopupOpen, setIsUpgradePopupOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const dataCtx = useContext(DataContext);
  const userProfile = dataCtx.userProfile;

  useEffect(() => {
    setRelationship("Friend");
    setStyle("Simple");
    setCard(false);
    setGift(false);
    setDescription("");
  }, [type]);

  const types = userProfile.subscription
    ? ["Birthday", "Anniversary", "Holiday", "Other"]
    : ["Birthday"];

  const relationships = ["Friend", "Family", "Colleague", "Other"];

  const styles = ["Simple", "Style2", "Style3"]; // Add or modify as needed

  let nameText = "Name";
  if (type === "Holiday") {
    nameText = "Holiday";
  } else if (type === "Other") {
    nameText = "Event";
  }

  const openUpgradePopup = () => {
    setIsUpgradePopupOpen(true);
  };

  const closeUpgradePopup = () => {
    setIsUpgradePopupOpen(false);
  };

  // This function will be used to show the SuccessModal
  const showSuccessModal = () => setIsSuccessModalOpen(true);

  // This function will be used to hide the SuccessModal
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  const openModal = (title, content, booleanButton = false, home = false) => {
    if (booleanButton !== hasButton) {
      setHasButton(booleanButton);
    }
    if (home !== navigateHome) {
      setNavigateHome(home);
    }
    setTitle(title);
    setContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function checkFormValidity() {
    if (name === "") {
      openModal("Form Error", "Please enter a name.");
      return false;
    }
    if (date === "") {
      openModal("Form Error", "Please enter a date.");
      return false;
    }
    if (type === "Birthday") {
      if (relationship === "") {
        openModal("Form Error", "Please enter a relationship.");
        return false;
      }
    }
    if (type !== "Other") {
      if (style === "") {
        openModal("Form Error", "Please enter a style.");
        return false;
      }
    }
    if (gift) {
      if (description === "") {
        openModal("Form Error", "Please enter a description.");
        return false;
      }
    }
    return true;
  }

  function handleAddReminder() {
    if (checkFormValidity()) {
      if (!userProfile.subscription && userProfile.reminders.length >= 5) {
        openModal(
          "Upgrade Required",
          "You have reached the maximum number of reminders. Please upgrade to add more reminders.",
          true,
          false
        );
      } else {
        const newReminder = {
          id: userProfile.reminders.length + 1,
          name: name,
          relationship: relationship,
          date: date,
          type: type.toLowerCase(),
          description: description,
          card: card,
          gift: gift,
          style: style.toLowerCase(),
        };
        dataCtx.addReminder(newReminder);
        openModal(
          "Reminder Added",
          "Your reminder has been added.",
          false,
          true
        );
      }
    }
  }
  return (
    <>
      {isSuccessModalOpen && (
        <Modal
          onClose={closeSuccessModal}
          title="Congratulations!"
          content="You have successfully upgraded your account!"
        />
      )}
      {isUpgradePopupOpen && (
        <UpgradePopup
          onClose={closeUpgradePopup}
          openModal={showSuccessModal}
        />
      )}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title={title}
          content={content}
          hasButton={hasButton}
          navigateHome={navigateHome}
          openUpgradePopup={openUpgradePopup}
        />
      )}
      <div className="top-panel">
        <div className="left-icon">
          <Link className="text-buttons" to="/home">
            <div className="text-buttons">Cancel</div>
          </Link>
        </div>
        <h1 className="addReminder-h1">Add Reminder</h1>
        <div className="right-icons">
          <Link className="text-buttons" onClick={handleAddReminder}>
            <div className="text-buttons">Add</div>
          </Link>
        </div>
      </div>
      <div className="addReminder-body">
        <label htmlFor="Type">Type of Reminder:</label>
        <select
          id="Type"
          name="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {types.map((rel, index) => (
            <option key={index} value={rel}>
              {rel}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="name">{nameText}:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />

        {type === "Birthday" && (
          <>
            <label htmlFor="relationship">Relationship:</label>
            <select
              id="relationship"
              name="relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            >
              {relationships.map((rel, index) => (
                <option key={index} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
            <br />
          </>
        )}

        {type !== "Other" && (
          <>
            <label htmlFor="style">Style for AI Recommended Messages:</label>
            <select
              id="style"
              name="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              {styles.map((sty, index) => (
                <option key={index} value={sty}>
                  {sty}
                </option>
              ))}
            </select>
            <br />
          </>
        )}

        {userProfile.subscription && type !== "Other" && (
          <>
            <label>Add-Ons:</label>
            <div className="checkbox-wrapper">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="card"
                  name="card"
                  checked={card}
                  onChange={(e) => setCard(e.target.checked)}
                />
                <label htmlFor="card">Birthday/Event Card</label>
              </div>
              {(type === "Birthday" ||
                type === "Anniversary" ||
                type === "") && (
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="gift"
                    name="gift"
                    checked={gift}
                    onChange={(e) => setGift(e.target.checked)}
                  />
                  <label htmlFor="gift">Gift Recommendation</label>
                </div>
              )}
            </div>
            <br />
          </>
        )}
        {gift && (
          <>
            <label htmlFor="description">
              Brief Description of Individual:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="To help AI make better gift suggestions"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
          </>
        )}
      </div>
    </>
  );
}

export default AddReminder;
