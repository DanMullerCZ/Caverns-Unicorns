import { Class } from '@prisma/client';
import React from 'react';
import styles from '../styles/Classes.module.css';
import OneClass from './OneClass';

const Classes = ({ classes }: { classes: Class[] }) => {
  return (
    <>
      <div className={styles.container}>
        {classes.map((e: any) => (
          <>
            <OneClass key={e.id} desc={e.description} name={e.name}>
              {e.name}
            </OneClass>
          </>
        ))}
      </div>
    </>
  );
};

export default Classes;
