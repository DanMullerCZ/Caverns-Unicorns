import React, { useState } from 'react';
import styles from '../styles/Classes.module.css';
import ClassDetail from './ClassDetail';
import PropTypes from 'prop-types';

type Class = {
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

const ClassList = ({
  classes,
  setClass = () => {},
  creation = false,
}: {
  classes: Class[];
  setClass: Function;
  creation: boolean;
}) => {
  const [selectedClass, setSelectedClass] = useState(classes);
  
  const handleClick = (name: string) => {
    setClass(name);

    setSelectedClass((prevClass) => {
      return prevClass.map((oneClass) => {
        return oneClass.name === name
          ? { ...oneClass, on: !oneClass.on }
          : { ...oneClass, on: false };
      });
    });
  };

  const allClasses = selectedClass.map((oneClass: Class) => ( 
    <ClassDetail
      key={oneClass.id}
      creation={creation}
      click={handleClick}
      desc={oneClass.description!}
      name={oneClass.name}
      on={oneClass.on}
    ></ClassDetail>
  ));
  return (
    <>
      <div className={styles.body}>
        <h1 className="gold font-LOTR text-center text-4xl pt-20 tracking-widest">CHOOSE YOUR CLASS</h1>
        <ul test-id="classesArr" className={styles.ul}>
          {allClasses}
        </ul>
      </div>
    </>
  );
};
// ClassList.defaultProps = {
//   setClass: () => {},
//   creation: false,
//   on: false,
// };

// ClassList.propTypes = {
//   setClass: PropTypes.func,
//   creation: PropTypes.bool,
// };

export default ClassList;
