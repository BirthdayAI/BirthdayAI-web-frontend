import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Modal.css";

const Modal = ({
  onClose,
  title,
  content,
  hasButton,
  navigateHome,
  openUpgradePopup,
}) => {
  return (
    <>
      <div className="modal-form-container">
        <div className="modal-form-modal">
          {navigateHome ? (
            <Link to="/home">
              <button className="close-button" onClick={onClose()}>
                X
              </button>
            </Link>
          ) : (
            <button className="close-button" onClick={onClose()}>
              X
            </button>
          )}
          <h2>{title}</h2>
          <div>{content}</div>
          {hasButton && (
            <button
              type="submit"
              className="submit-button"
              onClick={() => {
                onClose();
                openUpgradePopup();
              }}
            >
              Upgrade
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
