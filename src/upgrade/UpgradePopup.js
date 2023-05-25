import React, { useContext } from "react";

import DataContext from "../data/data-context";
import Modal from "../modal/Modal";
import "./UpgradePopup.css";

const UpgradePopup = ({ onClose, openModal }) => {
  const dataCtx = useContext(DataContext);
  const setUserProfile = dataCtx.setUserProfile;

  const createCheckoutSession = async () => {
    await fetch(`${process.env.REACT_APP_backendUrl}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${dataCtx.user.accessToken}`, // set the access token in the Authorization header
      },
      body: JSON.stringify({
        uid: dataCtx.user.uid,
        priceId: "price_1NBN1zD9gZ8RqPqT8myV4r7r",
      }),
    });
  };

  // Event handler for the button click
  const handleButtonClick = () => {
    createCheckoutSession();
  };

  async function handleUpgrade() {
    await fetch(
      `${process.env.REACT_APP_backendUrl}/api/users/${dataCtx.user.uid}/subscribe`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataCtx.user.accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserProfile((prevState) => {
          return {
            ...prevState,
            subscription: true,
          };
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    openModal();
    onClose();
  }
  return (
    <div className="upgrade-popup-overlay">
      <div className="upgrade-popup">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="upgrade-popup-title">Upgrade to Premium</h2>
        <div className="upgrade-feature">
          <svg
            className="feature-icon"
            alt="Unlimited Reminders"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#3f51b5"
            id="bi bi-alarm"
            viewBox="0 0 16 16"
          >
            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z" />
            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z" />
          </svg>
          <p>Unlimited Reminders</p>
        </div>
        <div className="upgrade-feature">
          <svg
            className="feature-icon"
            alt="Add More"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#3f51b5"
            id="bi bi-tree"
            viewBox="0 0 16 16"
          >
            <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5zM6.437 4.758A.5.5 0 0 0 6 4.5h-.066L8 1.401 10.066 4.5H10a.5.5 0 0 0-.424.765L11.598 8.5H11.5a.5.5 0 0 0-.447.724L12.69 12.5H3.309l1.638-3.276A.5.5 0 0 0 4.5 8.5h-.098l2.022-3.235a.5.5 0 0 0 .013-.507z" />
          </svg>
          <p>Add anniversaries, holidays and more</p>
        </div>
        <div className="upgrade-feature">
          <svg
            className="feature-icon"
            alt="No ads"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#3f51b5"
            id="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
          <p>Ad-Free Experience</p>
        </div>
        <div className="upgrade-feature">
          <svg
            className="feature-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#3f51b5"
            id="bi bi-gift"
            viewBox="0 0 16 16"
            alt="Gift Picks by AI"
          >
            <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z" />
          </svg>
          <p>AI-curated gift suggestions</p>
        </div>
        <div className="upgrade-feature">
          <svg
            className="feature-icon"
            alt="Cards generated by AI"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#3f51b5"
            id="bi bi-postcard"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm7.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5ZM10.5 5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3ZM13 8h-2V6h2v2Z"
            />
          </svg>
          <p>AI-personalized birthday/event cards(coming soon)</p>
        </div>
        <p className="upgrade-cost">$2.99/month</p>
        <button
          className="continue-button"
          id="checkout-and-portal-button"
          onClick={handleButtonClick}
        >
          Continue
        </button>
        {/*<>
          <p className="upgrade-cost">$2.99/month</p>
          <button className="continue-button" onClick={handleUpgrade}>
            Continue
          </button>
        </>*/}
      </div>
    </div>
  );
};

export default UpgradePopup;
