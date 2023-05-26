import React from "react";
import "./DeleteReminder.css";

const DeleteReminder = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span onClick={onCancel} className="close">
          &times;
        </span>
        <h2>Are you sure you want to Delete Reminder?</h2>
        <div className="modal-button-group">
          <button onClick={onConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={onCancel} className="cancel-button">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReminder;
