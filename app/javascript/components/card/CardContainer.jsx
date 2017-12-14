import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

import * as actions from '../../actions/CardActions';

class CardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    title: '',
    card: null
  }

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
    store.dispatch(actions.fetchCard(this.getCardId(), (card) => {
      this.updateCurrentCard(card);
    }));
  }

  getCardId = () => {
    return +this.props.match.params.cardId;
  }

  updateCurrentCard = (card) => {
    this.setState({
      title: card.title,
      card: card
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleTitleBlur = (e) => {
    const updatedCard = {
      title: this.state.title,
      id: this.state.card.id
    };

    this.context.store.dispatch(
      actions.updateCard(updatedCard)
    );
  }

  listTitle = () => {
    const store = this.context.store;
    const lists = store.getState().lists
    const list = lists.find(list => list.id === this.state.card.list_id );

    return (list && list.title) || '';
  }

  render() {
    if (this.state.card) {
      return (
        <Card
          title={this.state.title}
          card={this.state.card}
          listTitle={this.listTitle()}
          onTitleChange={this.handleTitleChange}
          onTitleBlur={this.handleTitleBlur}
        />
      );
    } else {
      return null;
    }
  }
}

export default CardContainer;
