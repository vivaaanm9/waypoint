import React from 'react';
import styles from './PriceLevel.module.css';

export 

export const PriceLevel = ({ level, maxLevel = 4 }) => {
  return (
    <div className={styles.container} aria-label={`Price level ${level} out of ${maxLevel}`}>
      {Array.from({ length: maxLevel }).map((_, index) => (
        <span
          key={index}
          className={`${styles.icon} ${index < level ? styles.active : ''}`}
        >
          $
        </span>
      ))}
    </div>
  );
};
