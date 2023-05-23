import React, { useState, useContext } from "react";

import Modal from "../modal/Modal";
import DataContext from "../data/data-context";
import "./FeedbackForm.css";

const FeedbackForm = ({ onClose, openModal }) => {
  const [feedback, setFeedback] = useState("");

  const dataCtx = useContext(DataContext);

  const handleFeedbackChange = (event) => {
    const text = event.target.value;

    // Set feedback only if the character count is below or equal to 500
    if (text.length <= 500) {
      setFeedback(text);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Close the form after submitting feedback
    if (feedback.length >= 20) {
      await fetch(
        `${process.env.REACT_APP_backendUrl}/api/users/${dataCtx.user.uid}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataCtx.user.accessToken}`,
          },
          body: JSON.stringify({ feedback: feedback }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          openModal();
          onClose();
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    } else {
      alert("Please provide at least 20 characters.");
    }
  };

  return (
    <div className="feedback-form-container">
      <div className="feedback-form-modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="feedback-textarea"
            value={feedback}
            onChange={handleFeedbackChange}
            minLength="20"
            required
            placeholder="Please provide at least 20 characters."
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
