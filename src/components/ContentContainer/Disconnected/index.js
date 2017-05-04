import React from 'react';
import styles from './styles.css';

const Disconnected = ({ state }) =>
    <div className={styles.component}>
        Oops-a-daisy!&nbsp;😕&nbsp;&nbsp;&nbsp;I have troubles with connection to server.<br />
        Check your internet connection or drop few lines about that to my creator&nbsp;
        <a className={styles.link} href="https://twitter.com/vladimore" target="_blank">
            @vladimore
        </a>
    </div>
    ;

export default Disconnected;
