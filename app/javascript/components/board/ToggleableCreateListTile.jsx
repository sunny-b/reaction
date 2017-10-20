import React from 'react';
import PropTypes from 'prop-types';

import * as actions from '../../actions/BoardActions';

class ToggleableCreateBoardTile extends React.Component {
  state = {
    showForm: false,
    title: ''
  }

  openForm = () => {
    this.setState({ showForm: true });
  }

  closeForm = () => {
    this.setState({ showForm: false });
  }

  render() {
    const isSelected = this.state.showForm ? 'selected' : '';

    return (
      <div id="new-list" className={`new-list ${isSelected}`}>
        <span onClick={this.openForm}>Add a list...</span>
        <input type="text" value={this.state.title} placeholder="Add a list..." />
        <div>
            <input type="submit" className="button" value="Save" />
            <i onClick={this.closeForm} className="x-icon icon"></i>
        </div>
      </div>
    );
  }
}

export default ToggleableCreateBoardTile;