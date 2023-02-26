import React, { useState } from "react";
import "./Modal.css";

function Modal(props) {
  const { onShowModal, isAdd, onAddCard, onDeleteCard } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onAddRemoveCard = (e) => {
    e.preventDefault();
    if (isAdd) {
      onAddCard(title, description);
      setTitle("");
      setDescription("");
    } else {
      onDeleteCard();
    }
  };

  return (
    <div className="modal_root">
      <div
        className="ui modal visible active"
        style={{ width: window.innerWidth / 2.5 }}
      >
        {/* ------ HEADER ------ */}
        <div className="header">{isAdd ? "Add Card" : "Delete Card"}</div>
        {/* ------ BODY ------  */}
        <div className="content">
          {isAdd ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="ui form">
                <div className="field">
                  <label>Position</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name="title"
                  />
                </div>
                <div className="field">
                  <label>Name</label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    name="description"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="description">
              <p>Are you sure you want to delete this Card?</p>
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="actions">
          <div
            className="ui button"
            style={{ backgroundColor: "gray", color: "white" }}
            onClick={() => {
              if (isAdd) {
                setTitle("");
                setDescription("");
              }
              onShowModal();
            }}
          >
            Cancel
          </div>
          <div
            className="ui button"
            style={{
              backgroundColor: isAdd ? "#4D5892" : "#b51220",
              color: "white",
            }}
            onClick={onAddRemoveCard}
          >
            {isAdd ? "Add" : "Delete"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
