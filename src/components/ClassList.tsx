import React from 'react'
import styles from '../styles/Classes.module.css'
import ClassDetail from './ClassDetail'
import PropTypes from 'prop-types';
import { Class } from '@prisma/client';



const ClassList = ({classes,setClass=()=>{},creation=false}:{classes:Class[],setClass:Function,creation:boolean}) => {
  const handleClick = (e:string)=>{
    setClass(e)
}
   return (
    <>
        <div test-id='classesArr' className={styles.container}>

        {classes.map((e:Class)=>(<ClassDetail key={e.id} creation={creation} click={handleClick} desc={e.description!} name={e.name}></ClassDetail>))}
        </div>
    
    
    </>
  )
}
ClassList.defaultProps = {
  setClass: () => {},
  creation:false
};

ClassList.propTypes = {
  setClass: PropTypes.func,
  creation:PropTypes.bool
};

export default ClassList