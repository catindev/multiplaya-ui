import React from 'react';
import styles from './styles.css';

const Card = ({ state }) =>
    <div className={styles.row}>
      <div className={styles.logo}>
        <img src={state.logo}/>
      </div>
      <a className={styles.title} href={state.storeLink}>{state.name}</a>
    </div>
;

export default Card;
