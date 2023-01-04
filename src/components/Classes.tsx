import React from 'react'
import styles from '../styles/Classes.module.css'
import OneClass from './OneClass'
import PropTypes from 'prop-types';
import { Class } from '@prisma/client';



const Classes = ({classes,setClass=()=>{},creation=false}:{classes:Class[],setClass:Function,creation:boolean}) => {
  const handleClick = (e:string)=>{
    setClass(e)
}
   return (
    <>
        <div className={styles.container}>

        {classes.map((e:Class)=>(<OneClass key={e.id} creation={creation} click={handleClick} desc={e.description!} name={e.name}></OneClass>))}
        </div>
    
    
    </>
  )
}
Classes.defaultProps = {
  setClass: () => {},
  creation:false
};

Classes.propTypes = {
  setClass: PropTypes.func,
  creation:PropTypes.bool
};

export default Classes