import React from 'react';
import PropTypes from 'prop-types';

const DueDate = (props) => {
  return props.dueDate ? (
    <li className="due-date-section">
      <h3>Due Date</h3>
      <div id="dueDateDisplay" className="overdue completed">
        <input id="dueDateCheckbox" type="checkbox" className="checkbox" checked="" />{props.dueDate}<span>(past due)</span>
      </div>
    </li>
  ) : null
}

export default DueDate;
