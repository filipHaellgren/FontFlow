import React, { useEffect } from 'react';
import styles from './css/card.module.css';
import { Link } from 'react-router-dom';

const FontCard = ({ family }) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [family]);

  return (
    <Link to={`/font/${family}`} className={styles.card} style={{ fontFamily: family }}>
      <h3 className={styles.fontName}>{family}</h3> {/* Apply a class to override the font */}
      <h2>The quick brown fox jumps over the lazy dog.</h2>
    </Link>
  );
};

export default FontCard;
