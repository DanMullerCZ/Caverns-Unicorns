import Link from 'next/link'
import React,{useEffect,useState} from 'react'
import styles from '../styles/OneRace.module.css'


const OneRace = ({name,desc}:{name:any,desc:any}) => {

  const [mouseIn,setMouseIn]=useState(false)
  const mouseEnter = () => setMouseIn(true)
  const mouseLeave = () => setMouseIn(false)
  return (
    <div className={styles.container} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{ backgroundImage: `url(/${name}.png)` }}>
        <Link href={`/races/${name}`}>
                <h2 >{name.toUpperCase()}</h2>
        </Link>
        <p className={mouseIn ? '' : styles.hidden}>{desc || 'Lorem ipsum mozna'}</p>
    </div>
  )
}

export default OneRace