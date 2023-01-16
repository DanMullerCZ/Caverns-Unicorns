import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from '../styles/OneRace.module.css';
import PropTypes from 'prop-types';

const RaceDetail = ({
  name,
  desc,
  click,
  creation,
  selectedRace = ""
}: {
  name: string;
  desc: string;
  click: Function;
  creation: boolean;
  selectedRace: string;
}) => {
  const handleClick = () => {
    click(name);
    setFlip(!flip);
  };
  
  const [flip, setFlip] = useState(false);
  console.log(flip + " " + name)

  // if (name != selectedRace) {
  //   setFlip(false)
  // } else setFlip(true)

  return (
    <>
      {(!flip || name != selectedRace) && (
        <li test-id="race" className={styles.li} onClick={handleClick}>
          <div className={styles.details}>
            <img src={`/${name}.png`}></img>
            <h2>{name.toUpperCase()}</h2>
          </div>
        </li>
      )}
      {(flip && name == selectedRace) && (
        <li test-id="race" className={styles.li} onClick={handleClick}>
          <div className={styles.details}>
            <p>{desc || 'Lorem ipsum mozna'}</p>
          </div>
        </li>
      )}
    </>
  );
};

RaceDetail.defaultProps = {
  selectedRace: ""
};

RaceDetail.propTypes = {
  selectedRace: PropTypes.string
};

export default RaceDetail;
