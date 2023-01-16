import React from 'react';
import RaceDetail from './RaceDetail';
import styles from '../styles/Races.module.css';
import PropTypes from 'prop-types';
import { Race } from '@prisma/client';

const RaceList = ({
  races,
  setRace = () => {},
  creation = false,
}: {
  races: Race[];
  setRace: Function;
  creation: boolean;
}) => {
  const handleClick = (e: string, i: number) => {
    setRace(e, i);
  };

  return (
    <div test-id="racesArr" className={styles.container}>
      {races.map((e: Race) => (
        <RaceDetail
          key={e.id}
          id={e.id}
          creation={creation}
          click={handleClick}
          desc={e.description!}
          name={e.name}
        ></RaceDetail>
      ))}
    </div>
  );
};
RaceList.defaultProps = {
  setRace: () => {},
  creation: false,
};

RaceList.propTypes = {
  setRace: PropTypes.func,
  creation: PropTypes.bool,
};

export default RaceList;
