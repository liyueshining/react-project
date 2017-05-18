import React from 'react';

import styles from './NormalFullRightButton.css';

function NormalFullRightButton({children, onClick}) {
    return(
        <button className={styles['btn-normal-full-right']} onClick={onClick}>{children}</button>
    )
}

export default NormalFullRightButton
