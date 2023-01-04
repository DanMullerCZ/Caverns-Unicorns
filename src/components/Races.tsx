import React from 'react'
import OneRace from './OneRace'
import styles from '../styles/Races.module.css'


const Races = ({races}:{races:any}) => {
  return (
    <>
        <div className={styles.container}>
        {races.map(e=>(<OneRace key={e.id} desc={e.description} name={e.name}>{e.name}</OneRace>))}
        </div>
    
    
    </>
  )
}

export default Races