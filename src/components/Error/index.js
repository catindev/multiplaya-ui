import React from 'react';
import styles from './styles.css';

const Error = ({ children }) =>
    <div className={styles.wrapper}>
        <div className={styles.component}>
            {children}
        </div>
    </div>
    ;

export default Error;
