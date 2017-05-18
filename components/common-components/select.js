import React from 'react';
import styles from './Select.css';

function Select({value, options, onChange}) {

    let items = options.map(option =>
        option.value===""? <option style={{display: 'none'}} key={option.value} value={option.value}>{option.label}</option>
            :<option style={{height: '36px'}} key={option.value} value={option.value}>{option.label}</option>);

    return (
        <select className={styles.select} value={value} onChange={onChange} required>
            {items}
        </select>
    )
}

export default Select
