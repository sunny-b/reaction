import React from 'react';
import PropTypes from 'prop-types';

import CardTile from './CardTile';
import CreateCardTileForm from './CreateCardTileForm';
import AddCardButton from './AddCardButton';

import * as actions from '../../actions/BoardActions';

const List = (props) => {
  const cardComponents = props.cards.map(card => <CardTile card={card} key={card.id} id={card.id} />);
  const renderTitle = () => {
    if (props.editing) {
      return (
        <input
          className="list-title edit-title"
          value={props.title}
          autoFocus={true}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
        );
    } else {
      return (<p className="list-title">{props.title}</p>);
    }
  };

  const renderForm = () => {
    if (props.active) {
      return (
        <CreateCardTileForm
          onCardChange={props.onCardChange}
          newCardTitle={props.newCardTitle}
          onAddCard={props.onAddCard}
          onCloseForm={props.onCloseForm}
        />
      );
    }
  }

  return (
    <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div onClick={props.onClick}>
              {renderTitle()}
          </div>
          <div className="add-dropdown add-top">
              <div className="card"></div><a className="button">Add</a><i className="x-icon icon"></i>
              <div className="add-options"><span>...</span>
              </div>
          </div>

          <div id="cards-container" className='container' data-id={`${props.id}`}>
            {cardComponents}
          </div>

          {renderForm()}

          <AddCardButton
            onOpenForm={props.onOpenForm}
          />
        </div>
    </div>

  );
};

export default List;
