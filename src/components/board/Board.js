import React from "react";
import "./Board.css";
import { PlusCircle } from "react-feather";
import { Droppable } from "react-beautiful-dnd";
import colors from "../../common/colors";

function Board(props) {
  const {name,title,showModal,children} = props;

  const isName = name === "shortlisted" || name === "forApproval";
  const backgroundColor = name==="shortlisted"?colors.yellow:(name==="interviewed"?colors.green:(name==="forApproval"?colors.red:colors.blue));

  return (
    <div className="board">
      <div className="board_top" style={{
        paddingBottom: isName?0:19,
        backgroundColor: backgroundColor
      }}>
        <p className="board_top_title">{title}</p>
        {isName && (
          <div>
            <PlusCircle onClick={showModal} />
          </div>
        )}
      </div>

      <Droppable droppableId={name}>
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} className="board_cards custom_scroll">
              {children}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default Board;
