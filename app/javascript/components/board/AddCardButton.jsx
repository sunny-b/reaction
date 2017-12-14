import React from 'react';
import PropTypes from 'prop-types';

const AddCardButton = props => (
  <div
    onClick={props.onOpenForm}
    className="add-card-toggle"
    data-position="bottom"
  >
    Add a card...
  </div>
);

export default AddCardButton;
