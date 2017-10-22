import React from 'react';
import PropTypes from 'prop-types';
import Dragula from 'react-dragula';
import PositionCalculator from '../../lib/PositionCalculator';

import Board from './Board';

import * as actions from '../../actions/BoardActions';
import * as listActions from '../../actions/ListActions';

class BoardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const store = this.context.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
    store.dispatch(actions.fetchBoard(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  allLists = () => {
    const store = this.context.store;
    return store.getState().lists;
  }

  currentBoardTitle = () => {
    const store = this.context.store;
    const id = +this.props.match.params.id;
    const boards = store.getState().boards;
    const board = boards.filter(board => +board.id === id)[0];
    return (board && board.title) || null;
  }

  updateListPosition = (listId, position) => {
    const editedList = {
      id: listId,
      position: position
    }

    this.context.store.dispatch(
      listActions.updateList(editedList)
    );
  }

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      const self = this;
      let originalPosition, newPosition;
      Dragula([componentBackingInstance])
        .on('drag', function(el, source) {
          el.className += ' gu-transit';
          originalPosition = [].slice.call(source.children).indexOf(el);
        }).on('drop', function(el, target, sibling, source) {
          newPosition = [].slice.call(target.children).indexOf(el);
          const lists = self.allLists()
          const id = lists[originalPosition].id;
          const position = PositionCalculator(self.allLists(), newPosition, originalPosition);

          self.updateListPosition(id, position);
        });
    }
  };

  render() {
    const lists = this.allLists();
    return (
      <Board
        lists={lists}
        title={this.currentBoardTitle()}
        id={+this.props.match.params.id}
        onDrag={this.dragulaDecorator}
        newPosition={PositionCalculator(lists, lists.length)}
      />
    )
  }
}

export default BoardContainer;
