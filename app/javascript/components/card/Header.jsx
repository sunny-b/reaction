import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const getBoardTitle = () => {

  }

  return (
    <header>
      <i className="card-icon icon .close-modal"></i>
      <textarea
        className="list-title"
        style={{ height: '45px'}}
        value={props.title}
        onChange={props.onChange}
        onBlur={props.onBlur}
      ></textarea>
      <p>in list <a className="link">{props.listTitle}</a><i className="sub-icon sm-icon"></i>
      </p>
    </header>
  );
}

export default Header;
