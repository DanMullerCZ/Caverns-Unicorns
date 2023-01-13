import React from 'react'
import RaceDetail from './RaceDetail'
import styles from '../styles/Races.module.css'
import PropTypes from 'prop-types';
import { Race } from '@prisma/client';



// eslint-disable-next-line @typescript-eslint/no-empty-function
const RaceList = ({races,setRace=()=>{},creation=false}:{races:Race[],setRace:(arg:string)=>void,creation:boolean}) => {
  const handleClick = (e:string)=>{
    setRace(e)
}

  return (
    <>
        <div test-id='racesArr' className={styles.container}>

        {races.map((e:Race)=>(<RaceDetail key={e.id} creation={creation} click={handleClick} desc={e.description!} name={e.name}></RaceDetail>))}
        </div>
    
    
    </>
  )
}
RaceList.defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRace: () => {},
  creation:false
};

RaceList.propTypes = {
  setRace: PropTypes.func,
  creation: PropTypes.bool
};

export default RaceList