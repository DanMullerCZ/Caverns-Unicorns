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
    setFlip(!flip);
    console.log(flip);
  };

  const [flip, setFlip] = useState(false);
  return (
    <>
      {!flip && (
        <div
          test-id="race"
          className={styles.li}
          onClick={handleClick}
          style={{ backgroundImage: `url(/${name}.png)` }}
        >
          <div className={styles.details}>
            <Link href={`/races/${name}`}>
              <h2>{name.toUpperCase()}</h2>
            </Link>
            <h2>{name.toUpperCase()}</h2>
          </div>
        </div>
      )}
      {flip && (
        <div>
          <p>{desc || 'Lorem ipsum mozna'}</p>
        </div>
      )}
    </>
  );
};

export default RaceDetail;
