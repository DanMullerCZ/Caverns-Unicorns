import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/OneRace.module.css';
import PropTypes from 'prop-types';

const RaceDetail = ({
  name,
  id,
  desc,
  click,
  creation,
  on,
}: {
  name: string;
  desc: string;
  click: (a:string,b:number)=>void;
  creation: boolean;
  id: number
  on: boolean;
}) => {
  const handleClick = () => {
    click(name, id);
  };

  return (
    <>
      {!on && (
        <li test-id="race" className={styles.li} onClick={handleClick}>
          <div className={styles.details}>
            <img src={`/${name}.png`}></img>
            {/* <h2 className={styles.h2}>{name.toUpperCase()}</h2> */}
          </div>
        </li>
      )}
      {on && (
        <li test-id="race" className={styles.li} onClick={handleClick}>
          <div className={styles.detailsON}>
            <p>{desc || 'Lorem ipsum mozna'}</p>
          </div>
        </li>
      )}
    </>
  );
};

export default RaceDetail;
