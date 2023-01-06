import Link from 'next/link'
import React,{useEffect,useState} from 'react'
import styles from '../styles/OneRace.module.css'


const RaceDetail = ({name,desc,click,creation}:{name:string,desc:string,click:Function,creation:boolean}) => {
  const handleClick = () => {
    click(name)
  }
  const [mouseIn,setMouseIn]=useState(false)
  const mouseEnter = () => setMouseIn(true)
  const mouseLeave = () => setMouseIn(false)
  return (
    <div className={styles.container} onClick={handleClick} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{ backgroundImage: `url(/${name}.png)` }}>
        {!creation &&(<Link href={`/races/${name}`}>
                <h2 >{name.toUpperCase()}</h2>
        </Link>)}
        {creation && (<h2 >{name.toUpperCase()}</h2>)}
        <p className={mouseIn ? '' : styles.hidden}>{desc || 'Lorem ipsum mozna'}</p>
    </div>
  )
}

export default RaceDetail