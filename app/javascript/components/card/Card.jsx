import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from './Header';
import Labels from './Labels';
import DueDate from './DueDate';
import DescriptionContainer from './DescriptionContainer';
import CommentContainer from './CommentContainer';
import Activities from './Activities';
import SideBar from './SideBar';

const Card = props => {
  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${props.card.board_id}`}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        <Header
          onChange={props.onTitleChange}
          onBlur={props.onTitleBlur}
          title={props.title}
          listTitle={props.listTitle}
        />

        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <Labels
                  labels={props.card.labels}
                />
                <DueDate
                  dueDate={props.card.due_date}
                />
              </ul>
              <DescriptionContainer
                description={props.card.description}
              />
            </li>

            <CommentContainer
            />

            <Activities
              activities={props.card.activities}
            />
          </ul>
        </section>

        <SideBar
        />
      </div>
    </div>
  );
}

export default Card;
