import React from "react";
import "./Card.css";
import { Trash2 } from "react-feather";

export default function Card(props) {
  return (
    <div style={{ height: "100%" }}>
      <div className={`${props.showModal ? "card" : "ui card"}`}>
        <div className="content">
          <div className="header">
            <div className="card_header">
              <div>{props.card?.title}</div>
              <Trash2
                color="#b51220"
                onClick={() => {
                  console.log("delete");
                  props.onDeleteModal()
                }}
                size={20}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="meta">{`${props.card?.date}`}</div>
          <div className="description">
            <p>{props.card?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
