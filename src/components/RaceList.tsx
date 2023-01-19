import React, { useState } from 'react';
import RaceDetail from './RaceDetail';
import styles from '../styles/Races.module.css';
import { race } from 'rxjs';
import PropTypes from  'prop-types';

type Race = {
  name: string;
  id: number;
  description: string;
  dex: number;
  str: number;
  con: number;
  int: number;
  wis: number;
  char: number;
  on: boolean;
};

const RaceList = ({
  races,
  setRace = () => {},
  creation = false,
}: {
  races: Race[];
  setRace: (arg: string, id: number) => void;
  creation: boolean;
}) => {
  const [selectedRace, setSelectedRace] = useState(races);

  const handleClick = (name: string, i: number) => {
    setRace(name, i);

    setSelectedRace((prevRace) => {
      return prevRace.map((race) => {
        return race.name === name
          ? { ...race, on: !race.on }
          : { ...race, on: false };
      });
    });
  };

  const allRaces = selectedRace.filter(race => race.name != "half-elf").map((race: Race) => ( 
    <RaceDetail
      key={race.id}
      id={race.id}
      creation={creation}
      click={handleClick}
      desc={race.description!}
      name={race.name}
      on={race.on}
    ></RaceDetail>
  ));

  return (
    <>
      <div className={styles.body}>
        <h1 className="gold font-LOTR text-center text-4xl pt-20 tracking-widest">CHOOSE YOUR RACE</h1>
        <ul test-id="racesArr" className={styles.ul}>
          {allRaces}
        </ul>
      </div>
    </>
  );
};

RaceList.defaultProps = {
  setRace: () => {},
  creation: false,
}

RaceList.propTypes = {
  setRace: PropTypes.func,
  creation: PropTypes.bool,
};

export default RaceList;
