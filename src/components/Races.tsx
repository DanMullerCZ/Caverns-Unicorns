import React from 'react'
import OneRace from './OneRace'
import styles from '../styles/Races.module.css'
import PropTypes from 'prop-types';
import { Race } from '@prisma/client';



const Races = ({races,setRace=()=>{},creation=false}:{races:Race[],setRace:Function,creation:boolean}) => {
  const handleClick = (e:string)=>{
    setRace(e)
}

  return (
    <>
        <div className={styles.container}>

        {races.map((e:Race)=>(<OneRace key={e.id} creation={creation} click={handleClick} desc={e.description!} name={e.name}></OneRace>))}
        </div>
    
    
    </>
  )
}
Races.defaultProps = {
  setRace: () => {},
  creation:false
};

Races.propTypes = {
  setRace: PropTypes.func,
  creation: PropTypes.bool
};

export default Races