import React from 'react';
import PropTypes from 'prop-types';

const CreateCardTileForm = props => (
  <div className='add-dropdown add-bottom active-card'>
    <div className="card">
      <div className="card-info"></div>
      <textarea
        autoFocus={true}
        onChange={props.onCardChange}
        name="add-card"
        value={props.newCardTitle}
      >
      </textarea>
      <div className="members"></div>
    </div>
    <a onClick={props.onAddCard} className="button">Add</a>
    <i onClick={props.onCloseForm} className="x-icon icon"></i>
    <div className="add-options"><span>...</span></div>
  </div>
);

export default CreateCardTileForm;
