import React from 'react';
import styles from './styles.css';

const ProfileError = ({ profile, error }) =>
    <div className={styles.component}>
        <p className={styles.line}>Ooops..Trouble with {profile} 🤕</p>
        <p className={styles.message}>{error}</p>
    </div>
    ;

export default ProfileError;
