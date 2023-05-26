import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Modal from "../modal/Modal";
import DeleteReminder from "../delete/DeleteReminder";
import DataContext from "../data/data-context";
import "./Home.css";

function Anniversary(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const dataCtx = useContext(DataContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDelete = () => {
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  const now = new Date();
  let year = now.getFullYear();
  const [_, month, day] = props.item.date.split("-");
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
    diffDays = Math.round(Math.abs((now - nextBirthday) / oneDay)) + 1;
  }
  let daysString = "days left";
  if (diffDays === 1) {
    daysString = "day left";
  } else if (diffDays === 0) {
    daysString = "today";
  }

  const handleDeleteClick = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dataCtx.user.accessToken}`, // Assuming you have user token in your context
      },
    };

    await fetch(
      `${process.env.REACT_APP_backendUrl}/api/users/${dataCtx.user.uid}/reminders/${props.item.id}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dataCtx.deleteReminder(props.item.id);
        openModal();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  return (
    <>
      {isDeleteOpen && (
        <DeleteReminder
          isOpen={isDeleteOpen}
          onConfirm={handleDeleteClick}
          onCancel={closeDelete}
        />
      )}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          title="Reminder Deleted"
          message="Your reminder has been deleted."
        />
      )}
      <div className="ai-item">
        <div className="top-buttons">
          <button className="delete-button" onClick={openDelete}>
            <svg
              viewBox="0 0 24 24"
              fill="#3f51b5"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* X icon for delete button */}
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#3f51b5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link to={`/edit/${props.item.id}`}>
            <button className="edit-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#3f51b5"
                id="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
          </Link>
        </div>
        <div className="svg-and-birthday">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#3f51b5"
            id="bi bi-heart-pulse"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053.918 3.995.78 5.323 1.508 7H.43c-2.128-5.697 4.165-8.83 7.394-5.857.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17c3.23-2.974 9.522.159 7.394 5.856h-1.078c.728-1.677.59-3.005.108-3.947C13.486.878 10.4.28 8.717 2.01L8 2.748ZM2.212 10h1.315C4.593 11.183 6.05 12.458 8 13.795c1.949-1.337 3.407-2.612 4.473-3.795h1.315c-1.265 1.566-3.14 3.25-5.788 5-2.648-1.75-4.523-3.434-5.788-5Z" />
            <path d="M10.464 3.314a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.5a.5.5 0 0 0 0 1H4a.5.5 0 0 0 .416-.223l1.473-2.209 1.647 4.118a.5.5 0 0 0 .945-.049l1.598-5.593 1.457 3.642A.5.5 0 0 0 12 9h3.5a.5.5 0 0 0 0-1h-3.162l-1.874-4.686Z" />
          </svg>
          <div className="ai-birthday">{props.item.date}</div>
        </div>
        <div className="left-content">
          <div className="ai-name">{props.item.name}</div>
          <div className="ai-style">Style: {props.item.style}</div>
        </div>
        <div className="right-content">
          {diffDays !== 0 ? (
            <div className="ai-days">{diffDays}</div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="red"
              id="bi bi-fire"
              viewBox="0 0 16 16"
            >
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
            </svg>
          )}
          <div className="ai-days-left">{daysString}</div>
        </div>
      </div>
    </>
  );
}

export default Anniversary;
