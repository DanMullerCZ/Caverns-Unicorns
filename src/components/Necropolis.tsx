import styles from '../styles/Necropolis.module.css';

const Necropolis = ({startBattle}:{startBattle:()=>void}) => {
  const leaveTown = () =>{
    startBattle()
  }
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(/maps/town/necropolis.jpg)` }}
    >
      <div className={styles.chest} >
        <button onClick={leaveTown} className={styles.treasurechest}></button>
      </div>
      <button
          onClick={leaveTown}
          className="elven-leavebutton font-LOTR"
          title="Just get out, we never wanted you here!"
        >
          Leave Town
        </button>
    </div>
  );
};

export default Necropolis;
