import React from 'react';
import styles from './NormalButton.css';

function NormalButton({children, onClick}) {
    return(
        <button className={styles['btn-normal']} onClick={onClick}>{children}</button>
    )
}

export default NormalButton
