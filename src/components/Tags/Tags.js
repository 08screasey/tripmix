import React from 'react';
import styles from './Tags.module.scss';

const Tags = ({categories}) => {
    return (
        <ul className={styles.tags}>
            {categories.map(cat=><li key={cat} className={styles.tag}>{cat}</li>)}
        </ul>
    )
}

export default Tags
