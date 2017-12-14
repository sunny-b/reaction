import React from 'react';
import PropTypes from 'prop-types';

const DescriptionContainer = (props) => {
  return (
    <form className="description">
      <p>Description</p>
      <span id="description-edit" className="link">Edit</span>
      <p className="textarea-overlay">{props.description}</p>
      <p id="description-edit-options" className="hidden">You have unsaved edits on this field. <span className="link">View edits</span> - <span className="link">Discard</span>
      </p>
    </form>
  );
}

export default DescriptionContainer;
