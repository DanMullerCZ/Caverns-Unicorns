import React, { useState } from 'react';
import RaceDetail from './RaceDetail';
import styles from '../styles/Races.module.css';
import PropTypes from 'prop-types';
import { Race } from '@prisma/client';

const RaceList = ({
  races,
  setRace = () => {},
  creation = false,
  selectedRace = ""
}: {
  races: Race[];
  setRace: Function;
  creation: boolean;
  selectedRace: string;
}) => {
  const handleClick = (e: string) => {
    setRace(e);
  };
  
  return (
    <>
      <div className={styles.body}>
        <ul test-id="racesArr" className={styles.ul}>
          {races.map((e: Race) => (
            <RaceDetail
              key={e.id}
              creation={creation}
              click={handleClick}
              desc={e.description!}
              name={e.name}
              selectedRace={selectedRace}
            ></RaceDetail>
          ))}
        </ul>
      </div>
    </>
  );
};
RaceList.defaultProps = {
  setRace: () => {},
  creation: false,
  selectedRace: ""
};

RaceList.propTypes = {
  setRace: PropTypes.func,
  creation: PropTypes.bool,
  selectedRace: PropTypes.string
};

export default RaceList;
