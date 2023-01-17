import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/OneRace.module.css';
import PropTypes from 'prop-types';

const RaceDetail = ({
  name,
  desc,
  click,
  creation,
  on,
}: {
  name: string;
  desc: string;
  click: Function;
  creation: boolean;
  on: boolean;
}) => {
  const handleClick = () => {
    click(name);
  };

  return (
    <>
      {!on && (
        <li test-id="race" className={styles.li} onClick={handleClick}>
          <div className={styles.details}>
            <img src={`/${name}.png`}></img>
            <h2>{name.toUpperCase()}</h2>
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
