import React, { useState } from 'react';
import './dashboard.css';
import AddCard from './addCard';
// import DisplayCard from './displayCard';
import DeleteCard from './deleteCard';
import UpdateCard from './updateCard';

function ButtonMenu() {
  const [addCard, setAddCard] = useState(false);
  const [updateCard, setUpdateCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  // const [displayCard, setDisplayCard] = useState(false);

  const onAdd = () => {
    setAddCard(true);
    setUpdateCard(false);
    setDeleteCard(false);
    // setDisplayCard(false);
  };  

  const onUpdate = () => {
    setUpdateCard(true);
    setAddCard(false);
    setDeleteCard(false);
    // setDisplayCard(false)
  };

  const onDelete = () => {
    setDeleteCard(true);
    setUpdateCard(false);
    setAddCard(false);
    // setDisplayCard(false);
  };

  // const onShowCards = () => {
  //   setDisplayCard(true);
  //   setUpdateCard(false);
  //   setAddCard(false);
  //   setDeleteCard(false);
  // };

  return (
    <div className="button-container">
      <button onClick={onAdd}>Add Card</button>
      <button onClick={onUpdate}>Update Card</button>
      <button onClick={onDelete}>Delete Card</button>
      {/* <button onClick={onShowCards}>Display All Cards</button> */}
      {addCard ? <AddCard/> : null}
      {updateCard ? <UpdateCard/> : null}
      {deleteCard ? <DeleteCard/> : null}
      {/* {displayCard ? <DisplayCard/> : null} */}
    </div>
  );
}

export default ButtonMenu;
