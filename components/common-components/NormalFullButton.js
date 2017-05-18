import React from 'react';

import styles from './NormalFullButton.css';

function NormalFullButton({children, onClick}) {
    return(
        <button className={styles['btn-normal-full']} onClick={onClick}>{children}</button>
    )
}

export default NormalFullButton
