import styles from '../../styles/QuestList.module.css'

const QuestList = ({setVisibility}:{setVisibility:(arg:string)=>void}) => {
  return (
    <div className={styles.container} onClick={()=>setVisibility('nada')}>QuestList:W.I.P.</div>
  )
}

export default QuestList