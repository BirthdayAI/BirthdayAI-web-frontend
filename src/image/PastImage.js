import { useState, useContext } from "react";

import DeleteReminder from "../delete/DeleteReminder";
import DataContext from "../data/data-context";
import "./ImageGeneration.css";

function PastImage(props) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dataCtx = useContext(DataContext);

  const openDelete = () => {
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };

  function handleDelete() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dataCtx.user.accessToken}`, // Assuming you have user token in your context
      },
    };
    fetch(
      `${process.env.REACT_APP_backendUrl}/api/users/${dataCtx.user.uid}/cards/${props.card.id}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.json();
      })
      .then((data) => {
        dataCtx.deleteCard(props.card.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      {isDeleteOpen && (
        <DeleteReminder
          isOpen={isDeleteOpen}
          onConfirm={handleDelete}
          onCancel={closeDelete}
        />
      )}

      <div key={props.card.id} className="card">
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
        </div>
        <img src={props.card.link} alt={`Card ${props.index + 1}`} />
      </div>
    </>
  );
}

export default PastImage;
