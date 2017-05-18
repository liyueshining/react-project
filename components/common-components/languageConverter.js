import React, { PropTypes } from 'react';

import styles from './LanguageConverter.css';

function LanguageConverter({ title, onClick}) {
    return (
        <div className={styles['converter-pos']}>
            <a onClick={e => {
                e.preventDefault()
                onClick()
            }}>
                <span className={styles['language-icon']}></span>

                {title}
            </a>
        </div>
    )
}

LanguageConverter.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default LanguageConverter
