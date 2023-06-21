import "./LoadingModal.css";

function LoadingModal({ onClose }) {
  return (
    <div className="upgrade-popup-overlay">
      <div className="upgrade-popup">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 className="upgrade-popup-title">Loading</h2>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default LoadingModal;
