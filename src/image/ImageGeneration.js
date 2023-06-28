import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

import Modal from "../modal/Modal";
import UpgradePopup from "../upgrade/UpgradePopup";
import PastGenerations from "./PastGenerations";
import LoadingModal from "../loading/LoadingModal";
import DataContext from "../data/data-context";
import "./ImageGeneration.css";

function ImageGeneration() {
  const [type, setType] = useState("Birthday");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [navigateHome, setNavigateHome] = useState(false);
  const [hasButton, setHasButton] = useState(false);
  const [isUpgradePopupOpen, setIsUpgradePopupOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPastGenerationModalOpen, setIsPastGenerationModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLink, setImageLink] = useState("");

  const types = ["Birthday", "Anniversary", "Holiday"];
  const dataCtx = useContext(DataContext);
  const userProfile = dataCtx.userProfile;

  const openUpgradePopup = () => {
    setIsUpgradePopupOpen(true);
  };

  const closeUpgradePopup = () => {
    setIsUpgradePopupOpen(false);
  };

  const openPastGenerationModal = () => {
    setIsPastGenerationModalOpen(true);
  };

  const closePastGenerationModal = () => {
    setIsPastGenerationModalOpen(false);
  };

  const openLoadingModal = () => {
    setIsLoading(true);
  };

  const closeLoadingModal = () => {
    setIsLoading(false);
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
    if (type === "Holiday") {
      if (name === "") {
        openModal("Form Error", "Please enter a holiday.");
        return false;
      }
      if (name.length > 50) {
        openModal(
          "Form Error",
          "Holiday name must be less than 50 characters."
        );
        return false;
      }
    }
    return true;
  }

  async function handleAddCard() {
    if (checkFormValidity()) {
      if (!userProfile.subscription && userProfile.cards.length >= 0) {
        closeLoadingModal();
        openModal(
          "Upgrade Required",
          "This is a premium feature. Please upgrade to generate cards.",
          true,
          false
        );
      } else if (userProfile?.monthlyCardCount >= 15) {
        closeLoadingModal();
        openModal(
          "Monthly Limit Reached",
          "You have reached your monthly limit of 15 cards. Your limit will reset on the first of the month."
        );
      } else {
        const newCard = {
          id: uuidv4(),
          name: name,
          type: type.toLowerCase(),
          link: "",
        };

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dataCtx.user.accessToken}`, // Assuming you have user token in your context
          },
          body: JSON.stringify(newCard),
        };

        try {
          const response = await fetch(
            `${process.env.REACT_APP_backendUrl}/api/users/${dataCtx.user.uid}/cards`,
            requestOptions
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          dataCtx.addCard(data.card);

          closeLoadingModal();

          // Assuming data.card.link is a base64 encoded string
          /*const base64Image = data.card.link;

          console.log(base64Image);

          // Create a storage reference
          const profileImageRef = ref(
            storage,
            `userImages/${dataCtx.user.uid}/${data.card.id}.jpg`
          );

          // Upload the base64 string to Firebase Storage
          await uploadString(profileImageRef, base64Image, "base64");

          // Get the download URL
          const photoUrl = await getDownloadURL(profileImageRef);

          console.log(photoUrl);

          const responseImage = await fetch(data.card.link);
          const photoBlob = await responseImage.blob();

          const profileImageRef = ref(
            storage,
            `userImages/${dataCtx.user.uid}/${data.card.id}.jpg`
          );

          await uploadBytes(profileImageRef, photoBlob);
          const photoUrl = await getDownloadURL(profileImageRef);*/

          setImageLink(data.card.link);

          openModal("Card Generated", "Your card has been generated.");

          /*const requestOptionsLink = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${dataCtx.user.accessToken}`, // Assuming you have user token in your context
            },
            body: JSON.stringify({
              id: data.card.id,
              name: data.card.name,
              type: data.card.type,
              link: photoUrl,
            }),
          };

          const responseLink = await fetch(
            `${process.env.REACT_APP_backendUrl}/api/users/${dataCtx.user.uid}/cards/${data.card.id}`,
            requestOptionsLink
          );

          if (!responseLink.ok) {
            throw new Error("Network response was not ok");
          }

          const dataLink = await responseLink.json();
          dataCtx.editCard(dataLink.card);*/
        } catch (error) {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        }
      }
    }
  }

  return (
    <>
      {isLoading && <LoadingModal onClose={closeLoadingModal} />}
      {isPastGenerationModalOpen && (
        <PastGenerations onClose={closePastGenerationModal} />
      )}
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
        <h1 className="addReminder-h1">Generate Card</h1>
        <div className="right-icons">
          <Link
            className="text-buttons"
            onClick={() => {
              openLoadingModal();
              handleAddCard();
            }}
          >
            <div className="text-buttons">Generate</div>
          </Link>
        </div>
      </div>
      <div className="addReminder-body">
        <label htmlFor="Type">Type of Card:</label>
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
        {type === "Holiday" && (
          <>
            <label htmlFor="name">Holiday: </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
          </>
        )}
        <div className="image-preview">
          {imageLink ? (
            <img src={imageLink} alt="Generated Card Preview" />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/../../AICard.jpeg`}
              alt="Generated Card Preview"
            />
          )}
        </div>
        <div
          id="sendButton"
          onClick={() => {
            openLoadingModal();
            handleAddCard();
          }}
        >
          Generate
        </div>
        <div id="viewPastButton" onClick={openPastGenerationModal}>
          View Past Generations
        </div>
      </div>
    </>
  );
}

export default ImageGeneration;
