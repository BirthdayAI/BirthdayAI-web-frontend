import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import UpgradePopup from "../upgrade/UpgradePopup";
import FeedbackForm from "../feedback/FeedbackForm";
import Modal from "../modal/Modal";
import LogoutConfirmationModal from "../logout/LogoutConfirmationModal";
import DataContext from "../data/data-context";
import "./Settings.css";

const Settings = () => {
  const [isUpgradePopupOpen, setIsUpgradePopupOpen] = useState(false);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isConactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFeedbackSuccessModalOpen, setIsFeedbackSuccessModalOpen] =
    useState(false);

  const dataCtx = useContext(DataContext);
  const userProfile = dataCtx.userProfile;
  const handleLogout = dataCtx.handleLogout;

  const openUpgradePopup = () => {
    setIsUpgradePopupOpen(true);
  };

  const closeUpgradePopup = () => {
    setIsUpgradePopupOpen(false);
  };

  const openFeedbackForm = () => {
    setIsFeedbackFormOpen(true);
  };

  const closeFeedbackForm = () => {
    setIsFeedbackFormOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // This function will be used to show the SuccessModal
  const showSuccessModal = () => setIsSuccessModalOpen(true);

  // This function will be used to hide the SuccessModal
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  // This function will be used to show the FeedbackSuccessModal
  const showFeedbackSuccessModal = () => setIsFeedbackSuccessModalOpen(true);

  // This function will be used to hide the FeedbackSuccessModal
  const closeFeedbackSuccessModal = () => setIsFeedbackSuccessModalOpen(false);

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = () => {
    closeLogoutModal();
    handleLogout();
  };

  return (
    <>
      {isSuccessModalOpen && (
        <Modal
          onClose={closeSuccessModal}
          title="Congratulations!"
          content="You have successfully upgraded your account!"
        />
      )}
      {isFeedbackSuccessModalOpen && (
        <Modal
          onClose={closeFeedbackSuccessModal}
          title="Thank you!"
          content="Your feedback has been submitted."
        />
      )}
      {isUpgradePopupOpen && (
        <UpgradePopup
          onClose={closeUpgradePopup}
          openModal={showSuccessModal}
        />
      )}
      {isFeedbackFormOpen && (
        <FeedbackForm
          onClose={closeFeedbackForm}
          openModal={showFeedbackSuccessModal}
        />
      )}
      {isConactModalOpen && (
        <Modal
          onClose={closeContactModal}
          title="Contact Us"
          content="Email: birthdayaiapp@gmail.com"
        />
      )}
      {isLogoutModalOpen && (
        <LogoutConfirmationModal
          isOpen={isLogoutModalOpen}
          onConfirm={confirmLogout}
          onCancel={closeLogoutModal}
        />
      )}
      <div className="settings-page">
        <div className="top-panel">
          <div className="top-panel-title">
            <h1>Settings</h1>
          </div>
          <div className="cancel-text">
            <Link className="cancel-text" to="/home">
              Cancel
            </Link>
          </div>
        </div>
        <div className="settings-list">
          {!userProfile.subscription && (
            <div className="setting-item" onClick={openUpgradePopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                alt="Upgrade"
                className="setting-icon"
                width="18"
                height="18"
                fill="#3f51b5"
                id="bi bi-trophy"
                viewBox="0 0 16 16"
              >
                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z" />
              </svg>
              <span className="setting-title">Upgrade</span>
              <div className="arrow-icon">➔</div>
            </div>
          )}
          <div className="setting-item" onClick={openContactModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              alt="Contact"
              className="setting-icon"
              width="18"
              height="18"
              fill="#3f51b5"
              id="bi bi-mailbox"
              viewBox="0 0 16 16"
            >
              <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
              <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
            </svg>
            <span className="setting-title">Contact Us</span>
            <div className="arrow-icon">➔</div>
          </div>
          <div className="setting-item" onClick={openFeedbackForm}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              alt="Feedback"
              className="setting-icon"
              width="18"
              height="18"
              fill="#3f51b5"
              id="bi bi-envelope-paper"
              viewBox="0 0 16 16"
            >
              <path d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2H4Zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6v-2.55Zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5.417Zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267v2.55Zm13 .566v5.734l-4.778-2.867L15 7.383Zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083l6.965 4.18ZM1 13.116V7.383l4.778 2.867L1 13.117Z" />
            </svg>
            <span className="setting-title">Feedback</span>
            <div className="arrow-icon">➔</div>
          </div>
          <div className="setting-item" onClick={openLogoutModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              alt="Logout"
              className="setting-icon"
              width="18"
              height="18"
              fill="#3f51b5"
              id="bi bi-box-arrow-up-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"
              />
              <path
                fillRule="evenodd"
                d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z"
              />
            </svg>
            <span className="setting-title">Logout</span>
            <div className="arrow-icon">➔</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
