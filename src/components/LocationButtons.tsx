import styles from '../styles/LocationButtons.module.css';


const LocationButtons = ({ locationName,setVisible}: { locationName: string,setVisible:(x:string)=>void }) => {

  return (
    <>
      <button onClick={()=>setVisible('elven')} disabled={(locationName=='elven')?false:true} className={styles.elven}>Elven Town</button>
      <button onClick={()=>setVisible('necropolis')} disabled={(locationName=='necropolis')?false:true} title='Graveyard full of treasures, what could possibly go wrong?' className={styles.necro}>Necropolis</button>
      <button onClick={()=>setVisible('town')} disabled={(locationName=='town')?false:true} className={styles.human}>City</button>
      <button onClick={()=>{setVisible('dungeon');alert('Lukas is supposed to do this!')}} disabled={(locationName=='dungeon')?false:true} title='Could it be dungeon?' className={styles.dung}>Cave</button>
      <button onClick={()=>setVisible('blue-dragon-dialog')} disabled={(locationName=='blue-dragon-dialog')?false:true} title='Big fucking dragon.' className={styles.dragon}>Dragon</button>
      <button onClick={()=>{setVisible('ironforge');alert('Adam is currently working on this.. Probably?')}} disabled={(locationName=='ironforge')?false:true} className={styles.ironforge}>Ironforge</button>
    </>
  );
};

export default LocationButtons;
