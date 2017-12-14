import React from 'react';
import PropTypes from 'prop-types';

const Labels = (props) => {
  const renderLabels = () => {
    return props.labels.map((color, idx) => (
      <div key={idx} className="member-container">
        <div className={`${color} label colorblindable`}></div>
      </div>
    ));
  }

  return props.labels.length > 0 ? (
    <li className="labels-section">
      <h3>Labels</h3>
      {renderLabels()}
      <div className="member-container"><i className="plus-icon sm-icon"></i>
      </div>
    </li>
  ) : null;
}

export default Labels;
