import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles/OneRace.module.css';

const OneClass = ({ name, desc }: { name: string; desc: string }) => {
  const [mouseIn, setMouseIn] = useState(false);
  const mouseEnter = () => setMouseIn(true);
  const mouseLeave = () => setMouseIn(false);
  return (
    <div
      className={styles.container}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={{ backgroundImage: `url(/${name}.png)` }}
    >
      <Link href={`/classes/${name.toLowerCase()}`}>
        <h2>{name.toUpperCase()}</h2>
      </Link>
      <p className={mouseIn ? '' : styles.hidden}>
        {desc || 'Lorem ipsum mozna'}
      </p>
    </div>
  );
};

export default OneClass;
