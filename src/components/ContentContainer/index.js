import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';
import Disconnected from './Disconnected';

const pageClassNames = classNames('col', styles.contentContainer);


const ContentContainer = ({ connection, children }) => (
  <div>
    {connection === false && <Disconnected />}
    <div className={pageClassNames}>
      <h1 style={{ textAlign: 'center' }}>Multiplaya</h1>
      <p style={{ textAlign: 'center' }}>
        helps choose a multiplayer games via <a href="http://store.steampowered.com/" style={{ color: '#fff', textDecoration: 'underline' }} target="_blank">Steam</a> profiles
   </p>
      {children}
    </div>
  </div>
);

ContentContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default ContentContainer;
