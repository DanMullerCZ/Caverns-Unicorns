import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/OneRace.module.css';

const RaceDetail = ({
  name,
  desc,
  click,
  creation,
}: {
  name: string;
  desc: string;
  click: Function;
  creation: boolean;
}) => {
  const handleClick = () => {
    click(name);
  };
  const [mouseIn, setMouseIn] = useState(false);
  const mouseEnter = () => setMouseIn(true);
  const mouseLeave = () => setMouseIn(false);
  return (
    <li
      test-id="race"
      className={styles.li}
      onClick={handleClick}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className={styles.details}>
        <img src={`/${name}.png`}></img>
        {!creation && <h2 className={styles.h2}>{name.toUpperCase()}</h2>}
      </div>
    </li>
  );
};

export default RaceDetail;
