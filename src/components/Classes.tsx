import React from 'react'
import styles from '../styles/Classes.module.css'
import OneClass from './OneClass'
import PropTypes from 'prop-types';



const Classes = ({classes,setClass=()=>{},creation=false}:{classes:any,setClass:Function,creation:boolean}) => {
  const handleClick = (e:string)=>{
    setClass(e)
}
   return (
    <>
        <div className={styles.container}>

        {classes.map((e:{id:number,description:string,name:string})=>(<OneClass key={e.id} creation={creation} click={handleClick} desc={e.description} name={e.name}></OneClass>))}
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