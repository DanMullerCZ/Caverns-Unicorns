import Dice from 'components/Dice';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Battle.module.css'

const Battle = ({ exitBattle }: { exitBattle: () => void }) => {
    const [luck, setLuck] = useState<number>(0)
    const [damage, setDamage] = useState(0)
    const [rolled, setRolled] = useState(false)
    const combatlog = useRef<HTMLDivElement>(null)

    const handleClick = () => {
    exitBattle();
  };
    
  console.log(luck);
  
  const [enemy, setEnemy] = useState({
    name: 'Dragon',
    hp: 100,
    attack: 20,
    experience: 10
  })

  const [hero, setHero] = useState({
    hp: 100,
    skillONe: 50,
    skillTwo: 2,
    skillthree: 15,
    skillOneCD: 20,
    skillTwoCD: 1,
    skillThreeCD: 4,
  })

  const useSkill = (damage: number) => {
      setRolled(false)
    let enemyHpAfterAttack: number = enemy.hp
    switch(luck){
        case 1: 
        case 2:
        case 3:
        case 4: {
            break
        }
        case 17:
        case 18:
        case 19: {
            enemyHpAfterAttack = enemy.hp - damage
            break
        }
        case 20: {
            enemyHpAfterAttack = enemy.hp - (damage * 2)
            break
        }
        default: {
            enemyHpAfterAttack = enemy.hp - Math.ceil(Math.random()*damage)
            break
        }
    }

    let heroHpAfterAttack = hero.hp - enemy.attack

    if(combatlog.current)
    combatlog.current.innerText += enemyHpAfterAttack + ` remaining enemy hp\n`

    if(enemyHpAfterAttack < 0){
        enemyHpAfterAttack = 0
    }
    setEnemy((enemy) => {
        return {...enemy, hp: enemyHpAfterAttack}
    })
    if(heroHpAfterAttack < 0){
        heroHpAfterAttack = 0
    }
    if(enemyHpAfterAttack > 0){
        setHero((hero) => {
            return {...hero, hp: heroHpAfterAttack}
        })
    }
  }

  useEffect(() => {
    if(enemy.hp === 0){
        exitBattle()
        window.alert('You strong! You win')
    }
    if(hero.hp === 0){
        exitBattle()
        alert('You weak cheap fuck')
    }
  },[enemy.hp, hero.hp])
 

  useEffect(() => {
    if(luck! > 0){
        useSkill(damage)
        setDamage(0)
        console.log('fight');
    }
    
  },[luck])
    
  const roll = async(n: number) => {
     setTimeout(() => {
        setLuck(n)
    }, 2000)
  }

  return (
    <div className={styles.container}>
        <div className={styles.enemy}>
            <h1>fighting</h1>
            <h2>Name:{enemy.name}</h2>
            <h2>HP:{enemy.hp}</h2>
            <Image src='/npc/dragon.gif' width='500' height='500' alt='/npc/dragon.gif'/>
        </div>
      <div className={styles.abilitties}>
        <h2>Skills</h2>
        <button onClick={() => setDamage(hero.skillthree)}>fireball</button>
        <br/>
        <button onClick={() => setDamage(hero.skillTwo)} >flamethrower</button>
        <br/>
        <button onClick={() => setDamage(hero.skillONe)} >soulChain</button>
      </div>
        <button className={styles.run} onClick={handleClick}>RUN!</button>
      <div className={styles.stats}>
        <h2>HP:{hero.hp}</h2>
      </div>
      <div className={styles.abilittiesstats}>
        <h2>Skill one damage{hero.skillONe}</h2>
        <h2>Skill two: {hero.skillTwo}</h2>
        <h2>Skill three:{hero.skillthree}</h2>
      </div>
      <div className={styles.hero}>
        <Image src='/npc/paladin.gif' width='200' height='200'alt='/paladin.png'/>
      </div>
      <div className={styles.dice}>
      {damage > 0 && (<Dice setLuck={roll} rolled={rolled} setRolled={() => setRolled(true)}/>)}
      </div>
      <div className={styles.combatlog}>
        <h2>combat log</h2>
        <div ref={combatlog}></div>
      </div>
    </div>
  );
};

export default Battle;
