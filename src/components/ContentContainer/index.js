import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css';

const pageClassNames = classNames('col', styles.contentContainer);

const ContentContainer = ({ children }) => (
  <div className={pageClassNames}>
    <h1 style={{textAlign: 'center'}}>Multiplaya</h1>
    {children}
  </div>
);

ContentContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default ContentContainer;
