import React from 'react';
import styles from './styles.css';

const Disconnected = ({ state }) =>
    <div className={styles.component}>
        Oops-a-daisy!&nbsp;😕&nbsp;&nbsp;&nbsp;Some troubles with connection to server.<br />
        Check your internet connection or drop few lines at catindev@gmail.com
    </div>
    ;

export default Disconnected;
