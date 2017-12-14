import React from 'react';
import PropTypes from 'prop-types';
import PositionCalculator from '../../lib/PositionCalculator';

import Dragula from 'react-dragula';

import List from './List';

import * as actions from '../../actions/ListActions';
import * as cardActions from '../../actions/CardActions';

class ListContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  state = {
    title: this.props.list.title,
    editing: false,
    newCardTitle: ''
  };

  allTheseCards = () => {
    const store = this.context.store;
    const cards = store.getState().cards;
    return cards.filter(card => card.list_id === this.props.list.id)
                .sort((a, b) => a.position - b.position);
  };

  handleClick = () => {
    this.setState({ editing: true });
  };

  handleBlur = () => {
    const editedList = {
      title: this.state.title,
      id: this.props.list.id
    };

    this.context.store.dispatch(
      actions.updateList(editedList, () => {
        this.setState({ editing: false });
      })
    );
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleCardChange = (e) => {
    this.setState({ newCardTitle: e.target.value });
  }

  handleOpenForm = () => {
    this.props.onOpenForm(this.props.list.id);
  }

  handleAddCard = () => {
    const cards = this.allTheseCards();

    const newCard = {
      title: this.state.newCardTitle,
      position: PositionCalculator(cards, cards.length),
      list_id: this.props.list.id
    }

    this.context.store.dispatch(
      cardActions.createCard(newCard, () => {
        this.setState({ newCardTitle: '' });
        this.props.onCloseForm();
      })
    );
  }

  render() {
    return (
      <div
        className={`list-wrapper${this.props.active ? ' add-dropdown-active' : ''}`}
        data-index={this.props.idx}
      >
        <List
          cards={this.allTheseCards()}
          title={this.state.title}
          id={this.props.list.id}
          editing={this.state.editing}
          onClick={this.handleClick}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          active={this.props.active}
          openForm={this.openForm}
          closeForm={this.closeForm}
          addCard={this.handleAddCard}
          onOpenForm={this.handleOpenForm}
          onCloseForm={this.props.onCloseForm}
          onAddCard={this.handleAddCard}
          newCardTitle={this.state.newCardTitle}
          onCardChange={this.handleCardChange}
        />
      </div>
    )
  }
}

export default ListContainer;
