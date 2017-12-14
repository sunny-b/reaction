import React from 'react';
import PropTypes from 'prop-types';

import Board from './Board';

import * as actions from '../../actions/BoardActions';
import * as listActions from '../../actions/ListActions';
import * as cardActions from '../../actions/CardActions';

import PositionCalculator from '../../lib/PositionCalculator';

import Dragula from 'react-dragula';

class BoardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    activeList: null,
    board: null,
    isFetching: false
  };

  componentDidMount() {
    const store = this.context.store;
    const positions = {original: null, new: null, oldList: null, newList: null};
    this.unsubscribe = store.subscribe(() => this.updateBoardState());

    Dragula([document.querySelector('#existing-lists')], {
      direction: 'horizontal',
      revertOnSpill: true,
      invalid: function(el, handle) {
        return el.classList.contains('card');
      }
    }).on('drop', this.updateListPosition);

    this.drake = Dragula([], {
      isContainer: function(el) {
        return el.id === 'cards-container';
      }
    });
    this.drake.on('drag', this.cardDrag(positions)).on('drop', this.cardDrop(positions));

    this.updateBoardState();
  }

  updateBoardState = () => {
    const store = this.context.store;
    const boardId = this.boardId();

    if (!boardId) { return null; }
    if (!this.state.board && !this.state.isFetching) {
      this.fetchBoard(boardId);
    }
  }

  fetchBoard = (id) => {
    const store = this.context.store;
    this.setState({
      isFetching: true,
    }, () => {
      store.dispatch(actions.fetchBoard(id, this.doneFetchingBoard));
    });
  }

  doneFetchingBoard = (board) => {
    this.setState({
      isFetching: false,
      board
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  boardId = () => {
    const { id } = this.props.match.params
    const { url } = this.props.match
    const { cards } = this.context.store.getState();

    if (url.match(/^\/boards\//)) {
      return +id;
    } else {
      const card = cards.filter(card => card.id === +id)[0];

      if (card) {
        return card.board_id;
      } else {
        null;
      }
    }
  }

  cardDrag = positions => {
  	return (el, source) => {
  		positions.original = [].slice.call(source.children).indexOf(el);
      positions.oldList = +source.dataset.id;
  	}
  }

  cardDrop = positions => {
  	return (el, target, source, sibling) => {
  		positions.new = [].slice.call(target.children).indexOf(el);
      positions.newList = +target.dataset.id;

      const cards = this.filteredCards(positions.newList);
      const id = +el.dataset.id;
      let position;

      if (positions.oldList !== positions.newList) {
        position = PositionCalculator(cards, positions.new);
      } else {
        position = PositionCalculator(cards, positions.new, positions.original);
      }

      el.setAttribute("style", el.style.cssText + ';display: none;');
      this.drake.cancel(true);

      this.updateCardPosition(id, positions.newList, position, el);
    }
  }

  updateCardPosition = (id, listId, position, el) => {
    const updatedCard = {
      id: id,
      list_id: listId,
      position: position
    };

    this.context.store.dispatch(
      cardActions.updateCard(updatedCard, () => {
        el.setAttribute("style", el.style.cssText.replace('display: none;', ''));
      })
    );
  }

  filteredCards = (id) => {
    const store = this.context.store;
    const cards = store.getState().cards;
    return cards.filter(card => card.list_id === id)
                .sort((a, b) => a.position - b.position);
  };

  updateListPosition = (el, target, source, sibling) => {
    const lists = this.allLists();
    const oldIndex = +el.dataset.index;
    let newIndex;

    if (sibling) {
      const siblingIndex = +sibling.dataset.index;
      if (siblingIndex > oldIndex) {
        newIndex = siblingIndex - 1;
      } else {
        newIndex = siblingIndex;
      }
    } else {
      newIndex = lists.length - 1;
    }

    const newPosition = PositionCalculator(lists, newIndex, oldIndex);
    const listId = +lists[oldIndex].id;
    this.context.store.dispatch(
      listActions.updateList({ position: newPosition, id: listId })
    );
  }

  allLists = () => {
    const store = this.context.store;
    return store.getState().lists;
  }

  currentBoardTitle = () => {
    if (this.state.board) {
      return this.state.board.title;
    }
  }

  lastPosition = () => {
    const lists = this.allLists();
    if (lists[lists.length-1]) {
      return lists[lists.length-1].position;
    } else {
      return 0;
    }
  }

  handleOpenForm = (listId) => {
    this.setState({ activeList: listId });
  }

  handleCloseForm = (listId) => {
    this.setState({ activeList: null });
  }

  render() {
    return (
      <Board
        lists={this.allLists()}
        title={this.currentBoardTitle()}
        id={this.boardId()}
        newPosition={this.lastPosition()+100}
        activeList={this.state.activeList}
        onOpenForm={this.handleOpenForm}
        onCloseForm={this.handleCloseForm}
      />
    )
  }
}

export default BoardContainer;
