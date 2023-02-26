import { useState } from "react";
import Board from "./components/board/Board";
import "./App.css";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import boards from "./common/boards";
import Card from "./components/card/Card";
import Modal from "./components/modal/Modal";
import image from "./common/images/back_image.jpg";
import colors from "./common/colors";

function App() {
  const [boardsList, setBoardsList] = useState(boards);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [boardName, setBoardName] = useState(null);
  const [cardId, setCardId] = useState(null);

  const addCard = (title, desc) => {
    const card = {
      id: Date.now() + Math.random() * 2,
      uuid: uuid(),
      title,
      desc,
      date: "1 day ago",
    };

    const tempBoards = boardsList[boardName];
    tempBoards.push(card);
    const data = { ...boardsList, boardName: tempBoards };
    setBoardsList(data);
    setShowAddModal(false);
  };

  const removeCard = () => {
    const tempBoards = boardsList[boardName];
    const cIndex = tempBoards.findIndex((item) => item.id === cardId);
    if (cIndex < 0) return;
    tempBoards.splice(cIndex, 1);
    const data = { ...boardsList, boardName: tempBoards };
    setBoardsList(data);
    setShowDeleteModal(false);
  };

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = (list, index, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...boardsList };
    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;

    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );
    setBoardsList(listCopy);
  };

  return (
    <div className="app" style={{backgroundImage:`url(${image})`}}>
      {(showAddModal || showDeleteModal) && (
        <Modal
          onShowModal={() => {
            if (showAddModal) {
              setShowAddModal(false);
            } else {
              setShowDeleteModal(false);
            }
          }}
          isAdd={showAddModal}
          onAddCard={addCard}
          onDeleteCard={removeCard}
          cid={cardId}
        />
      )}

      <div className="app_navbar">
        <div className="app_navbar_content_container">
          <img
            src={require("./common/images/hk.png")}
            alt="myLogo"
            style={{ height: 65, width: 65 }}
          />
          <h2 className="app_navbar_text">Kanban Board</h2>
        </div>
      </div>

      <div className="app_outer">
        <div className="app_boards">
          <DragDropContext onDragEnd={onDragEnd}>
            {/* --- Shortlisted --- */}
            <Board
              title="Shortlisted"
              onDragEnd={onDragEnd}
              name="shortlisted"
              showModal={() => {
                setBoardName("shortlisted");
                setShowAddModal(true);
              }}
            >
              <div className="board_cards custom_scroll">
                {boardsList?.shortlisted.length > 0 &&
                  boardsList?.shortlisted.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id + ""}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  card={item}
                                  showModal={showAddModal || showDeleteModal}
                                  onDeleteModal={() => {
                                    setBoardName("shortlisted");
                                    setCardId(item.id);
                                    setShowDeleteModal(true);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
              </div>
            </Board>

            {/* --- Interviewed --- */}
            <Board title="Interviewed" onDragEnd={onDragEnd} name="interviewed">
              <div className="board_cards custom_scroll">
                {boardsList?.interviewed.length > 0 &&
                  boardsList?.interviewed.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id + ""}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  card={item}
                                  showModal={showAddModal || showDeleteModal}
                                  onDeleteModal={() => {
                                    setBoardName("interviewed");
                                    setCardId(item.id);
                                    setShowDeleteModal(true);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
              </div>
            </Board>

            {/* --- For Approval --- */}
            <Board
              title="For Approval"
              onDragEnd={onDragEnd}
              name="forApproval"
              showModal={() => {
                setBoardName("forApproval");
                setShowAddModal(true);
              }}
            >
              <div className="board_cards custom_scroll">
                {boardsList?.forApproval.length > 0 &&
                  boardsList?.forApproval.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id + ""}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  card={item}
                                  showModal={showAddModal || showDeleteModal}
                                  onDeleteModal={() => {
                                    setBoardName("forApproval");
                                    setCardId(item.id);
                                    setShowDeleteModal(true);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
              </div>
            </Board>

            {/* --- Hired --- */}
            <Board title="Hired" onDragEnd={onDragEnd} name="hired">
              <div className="board_cards custom_scroll">
                {boardsList?.hired.length > 0 &&
                  boardsList?.hired.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id + ""}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Card
                                  card={item}
                                  showModal={showAddModal || showDeleteModal}
                                  onDeleteModal={() => {
                                    setBoardName("hired");
                                    setCardId(item.id);
                                    setShowDeleteModal(true);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
              </div>
            </Board>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
