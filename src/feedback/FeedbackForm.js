import React, { useState } from "react";

import Modal from "../modal/Modal";
import "./FeedbackForm.css";

const FeedbackForm = ({ onClose, openModal }) => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (event) => {
    const text = event.target.value;

    // Set feedback only if the character count is below or equal to 500
    if (text.length <= 500) {
      setFeedback(text);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Close the form after submitting feedback
    if (feedback.length >= 20) {
      openModal();
      onClose();
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
