import React from 'react';
import styles from './index.css';
import MenuComponent from './MenuComponent';

export default function() {
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <MenuComponent />
      </ul>
    </div>
  );
}
