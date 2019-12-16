import React from 'react';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to My Shop!</h1>
      <div className={styles.welcome} />
    </div>
  );
}

export default IndexPage;
