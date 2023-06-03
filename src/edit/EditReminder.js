import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Modal from "../modal/Modal";
import DataContext from "../data/data-context";
import "./EditReminder.css";

function useDidMount() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return didMount;
}

function EditReminder() {
  const didMount = useDidMount();
  const dataCtx = useContext(DataContext);
  const userProfile = dataCtx.userProfile;
  const { id } = useParams();
  const editingReminder = userProfile.reminders.find(
    (reminder) => reminder.id === id
  );
  const [type, setType] = useState(
    editingReminder?.type.charAt(0).toUpperCase() +
      editingReminder?.type.slice(1).toLowerCase() || "Birthday"
  );
  const [name, setName] = useState(editingReminder?.name || "");
  const [date, setDate] = useState(editingReminder?.date || "");
  const [relationship, setRelationship] = useState(
    editingReminder?.relationship.charAt(0).toUpperCase() +
      editingReminder?.relationship.slice(1).toLowerCase() || "Friend"
  );
  const [style, setStyle] = useState(
    editingReminder?.style.charAt(0).toUpperCase() +
      editingReminder?.style.slice(1).toLowerCase() || "Simple"
  );
  const [description, setDescription] = useState(
    editingReminder?.description || ""
  );
  const [card, setCard] = useState(editingReminder?.card || false);
  const [gift, setGift] = useState(editingReminder?.gift || false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [navigateHome, setNavigateHome] = useState(false);
  const [hasButton, setHasButton] = useState(false);

  useEffect(() => {
    if (didMount) {
      setRelationship("Friend");
      setStyle("Simple");
      setCard(false);
      setGift(false);
      setDescription("");
    }
  }, [type]);

  const types = userProfile.subscription
    ? ["Birthday", "Anniversary", "Holiday", "Other"]
    : ["Birthday"];

  const relationships = [
    "Friend",
    "Family",
    "Father",
    "Mother",
    "Uncle",
    "Aunt",
    "Cousin",
    "Grandfather",
    "Grandmother",
    "Brother",
    "Sister",
    "Son",
    "Daughter",
    "Nephew",
    "Niece",
    "Boyfriend",
    "Girlfriend",
    "Husband",
    "Wife",
    "Partner",
    "Co-worker",
    "Boss",
    "Teacher",
    "Student",
    "Neighbor",
  ];

  const styles = [
    "Simple",
    "Funny",
    "Romantic",
    "Sentimental",
    "Cheerful",
    "Warm",
    "Formal",
    "Casual",
    "Witty",
    "Inspirational",
    "Sincere",
    "Heartfelt",
    "Enthusiastic",
    "Youthful",
    "Nostalgic",
    "Playful",
    "Energetic",
    "Classy",
    "Sophisticated",
    "Motivational",
    "Creative",
    "Joyful",
  ];

  let nameText = "Name";
  if (type === "Holiday") {
    nameText = "Holiday";
  } else if (type === "Other") {
    nameText = "Event";
  }

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

  async function handleEditReminder() {
    if (checkFormValidity()) {
      const newReminder = {
        id: id,
        name: name,
        relationship: relationship.toLowerCase(),
        date: date,
        type: type.toLowerCase(),
        description: description,
        card: card,
        gift: gift,
        style: style.toLowerCase(),
      };
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataCtx.user.accessToken}`, // Assuming you have user token in your context
        },
        body: JSON.stringify(newReminder),
      };

      await fetch(
        `${process.env.REACT_APP_backendUrl}/api/users/${dataCtx.user.uid}/reminders/${id}`,
        requestOptions
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          dataCtx.editReminder(newReminder);
          openModal(
            "Reminder Updated",
            "Your reminder has been updated.",
            false,
            true
          );
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }
  return (
    <>
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title={title}
          content={content}
          hasButton={hasButton}
          navigateHome={navigateHome}
        />
      )}
      <div className="top-panel">
        <div className="left-icon">
          <Link className="text-buttons" to="/home">
            <div className="text-buttons">Cancel</div>
          </Link>
        </div>
        <h1 className="addReminder-h1">Edit Reminder</h1>
        <div className="right-icons">
          <Link className="text-buttons" onClick={handleEditReminder}>
            <div className="text-buttons">Confirm</div>
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

export default EditReminder;
