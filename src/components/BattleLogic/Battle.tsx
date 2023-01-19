import Dice from 'components/Dice';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { any, string } from 'zod';
import styles from '../../styles/Battle.module.css';

const Battle = ({
  exitBattle,
  heroInput,
  enemyInput,
}: {
  exitBattle: () => void;
  heroInput: {
    name: string;
    hp: number;
    skillONe: { damage: number; name: string; CD: number };
    skillTwo: { damage: number; name: string; CD: number };
    skillthree: { damage: number; name: string; CD: number };
  };
  enemyInput: {
    name: string;
    hp: number;
    attack: number;
    experience: number;
    power: number;
  };
}) => {
  const [luck, setLuck] = useState<number>(0);
  type SKillName = 'skillONe'|'skillTwo'|'skillthree' 
  type Skill = {damage:number,name:string,CD:number,skill:string}
  const [damage, setDamage] = useState<Skill>({
    damage: 0,
    name: '',
    CD: 0,
    skill: 'SkillOne',
  });
  const [rolled, setRolled] = useState(false);
  const combatlog = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    exitBattle();
  };

  const [enemy, setEnemy] = useState({
    name: enemyInput.name,
    hp: enemyInput.hp,
    attack: enemyInput.attack,
    experience: enemyInput.experience,
    power: enemyInput.power,
  });

  const [hero, setHero] = useState({
    name: heroInput.name,
    hp: heroInput.hp,
    skillONe: { ...heroInput.skillONe, remainingCD: 5 },
    skillTwo: { ...heroInput.skillTwo, remainingCD: 0 },
    skillthree: { ...heroInput.skillthree, remainingCD: 0 },

  });

  const combatProcderure = (damage: {
    damage: number;
    name: string;
    CD: number;
    skill: string;
  }) => {
    setRolled(false);
    let heroDamage: number = 0;
    
    if (hero.skillONe.remainingCD > 0) {
      const devCooldown = hero.skillONe.remainingCD - 1
      setHero((prev) => ({
        ...prev,
        skillONe: {
          ...prev.skillONe,
          remainingCD: devCooldown,
        },
      }));
    }
    if (hero.skillTwo.remainingCD > 0) {
      const devCooldown = hero.skillTwo.remainingCD - 1
      setHero((prev) => ({
        ...prev,
        skillTwo: {
          ...prev.skillTwo,
          remainingCD: devCooldown,
        },
      }));
    }
    if (hero.skillthree.remainingCD > 0) {
      const devCooldown = hero.skillthree.remainingCD - 1
      setHero((prev) => ({
        ...prev,
        skillthree: {
          ...prev.skillthree,
          remainingCD: devCooldown,
        },
      }));
    }
    const skill = damage.skill as SKillName
    setHero((prev) => ({
      ...prev,
      [skill]: {
        ...prev[skill],
        remainingCD: hero[skill].CD 
      }
    }))
    console.log(damage)
    console.log(skill)
    if (typeof(skill)==='string'){hero[skill]}
    switch (luck) {
      case 1:
      case 2:
      case 3:
      case 4: {
        break;
      }
      case 17:
      case 18:
      case 19: {
        heroDamage = damage.damage;
        break;
      }
      case 20: {
        heroDamage = damage.damage * 2;
        break;
      }
      default: {
        heroDamage = Math.ceil(Math.random() * damage.damage);
        break;
      }
    }
    const enemyDamage: number = Math.ceil(
      Math.random() * enemy.attack + enemy.power,
    );
    let heroHpAfterAttack = hero.hp - enemyDamage;
    let enemyHpAfterAttack: number = enemy.hp - heroDamage;
      // if( hero[skill] instanceof Object && hero[skill].hasOwnProperty('CD')){
      //   console.log((hero[skill] as {CD: number}).CD)
      //   console.log(hero[skill].CD)
      // }
    if (combatlog.current)
      combatlog.current.innerText +=
      `${hero['skillONe'].remainingCD}` +
        ` ${hero.name} did: ` +
        heroDamage +
        ` damage\n` +
        `${enemy.name} did: ` +
        enemyDamage +
        ' damage\n';

    if (enemyHpAfterAttack < 0) {
      enemyHpAfterAttack = 0;
    }
    setEnemy((enemy) => {
      return { ...enemy, hp: enemyHpAfterAttack };
    });
    if (heroHpAfterAttack < 0) {
      heroHpAfterAttack = 0;
    }
    if (enemyHpAfterAttack > 0) {
      setHero((hero) => {
        return { ...hero, hp: heroHpAfterAttack };
      });
    }
  };

  useEffect(() => {
    if (enemy.hp === 0) {
      exitBattle();
      window.alert('You strong! You win');
    }
    if (hero.hp === 0) {
      exitBattle();
      alert('You weak cheap fuck');
    }
  }, [enemy.hp, hero.hp]);

  useEffect(() => {
    if (luck! > 0) {
      combatProcderure(damage);
      setDamage({
        damage: 0,
        name: '',
        CD: 0,
        skill: '',
      });
      console.log('fight');
    }
  }, [luck]);

  const roll = async (n: number) => {
    setTimeout(() => {
      setLuck(n);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.enemy}>
        <h1>fighting</h1>
        <h2>Name:{enemy.name}</h2>
        <h2>HP:{enemy.hp}</h2>
        <Image
          src="/npc/dragon.gif"
          width="500"
          height="500"
          alt="/npc/dragon.gif"
        />
      </div>
      <div className={styles.abilitties}>
        <h2>Skills</h2>
        <button
          onClick={() => setDamage({ ...hero.skillONe, skill: `skillONe` })}
          disabled={hero.skillONe.remainingCD > 0 ? true : false}
        >
          {[hero.skillONe.name, hero.skillONe.remainingCD]}
        </button>
        <br />
        <button
          onClick={() => setDamage({ ...hero.skillTwo, skill: `skillTwo` })}
          disabled={hero.skillTwo.remainingCD > 0 ? true : false}
        >
          {hero.skillTwo.name}
        </button>
        <br />
        <button
          onClick={() => setDamage({ ...hero.skillthree, skill: `skillthree` })}
          disabled={hero.skillthree.remainingCD > 0 ? true : false}
        >
          {hero.skillthree.name}
        </button>
      </div>
      <button className={styles.run} onClick={handleClick}>
        RUN!
      </button>
      <div className={styles.stats}>
        <h2>HP:{hero.hp}</h2>
      </div>
      <div className={styles.abilittiesstats}>
        <h2>
          {hero.skillONe.name}: {hero.skillONe.damage}
        </h2>
        <h2>
          {hero.skillTwo.name}: {hero.skillTwo.damage}
        </h2>
        <h2>
          {hero.skillthree.name}: {hero.skillthree.damage}
        </h2>
      </div>
      <div className={styles.hero}>
        <Image
          src="/npc/paladin.gif"
          width="200"
          height="200"
          alt="/paladin.png"
        />
      </div>
      <div className={styles.dice}>
        {damage.damage > 0 && (
          <Dice
            setLuck={roll}
            rolled={rolled}
            setRolled={() => setRolled(true)}
          />
        )}
      </div>
      <div className={styles.combatlog}>
        <h2>combat log</h2>
        <div ref={combatlog}></div>
      </div>
    </div>
  );
};

export default Battle;
