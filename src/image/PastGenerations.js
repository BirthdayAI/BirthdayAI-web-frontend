import { useContext } from "react";

import PastImage from "./PastImage";
import DataContext from "../data/data-context";
import "./ImageGeneration.css";

function PastGenerations({ onClose }) {
  const dataCtx = useContext(DataContext);
  const userProfile = dataCtx.userProfile;
  const cards = userProfile.cards;

  return (
    <>
      <div className="upgrade-popup-overlay">
        <div className="upgrade-popup">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <h2 className="upgrade-popup-title">Past Generations</h2>
          <div className="gallery">
            {cards.map((card, index) => (
              <PastImage
                key={card.id}
                card={card}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PastGenerations;
