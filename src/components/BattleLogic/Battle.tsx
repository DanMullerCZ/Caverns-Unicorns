import Dice from 'components/Dice';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Battle.module.css';
import { NPC, Characters, Spell } from '@prisma/client';
import { useSession } from 'next-auth/react';
import ResultScreen from './ResultScreen';

const Battle = ({
  exitBattleHeroWin,
  exitBattleNpcWin,
  runFromBattle,
  heroInput,
  enemyInput,
  skillOne,
  skillTwo,
  skillthree,
}: {
  exitBattleHeroWin: (hero: Characters, npc: NPC) => void;
  exitBattleNpcWin: (hero: Characters, npc: NPC) => void;
  runFromBattle: (hero: Characters, npc: NPC) => void;
  heroInput: Characters;
  skillOne: Spell;
  skillTwo: Spell;
  skillthree: Spell;
  enemyInput: NPC;
}) => {
  const [luck, setLuck] = useState<number>(0);
  type SKillName = 'skillONe' | 'skillTwo' | 'skillthree';
  type Skill = { damage: number; name: string; CD: number; skill: string };
  const [damage, setDamage] = useState({
    damage: 0,
    name: '',
    cooldown: 0,
    skill: 0,
  });
  const [rolled, setRolled] = useState(false);
  const combatlog = useRef<HTMLDivElement>(null);
  const [spellOne, setSpellOne] = useState({
    name: skillOne.name || '',
    id: skillOne.id || 0,
    description: skillOne.description || '',
    damage: skillOne.damage || 0,
    cooldown: skillOne.cooldown || 0,
    remainingCD: skillOne.cooldown || 0,
  });
  const [spellTwo, setSpellTwo] = useState({
    name: skillTwo.name || '',
    id: skillTwo.id || 0,
    description: skillTwo.description || '',
    damage: skillTwo.damage || 0,
    cooldown: skillTwo.cooldown || 0,
    remainingCD: skillTwo.cooldown || 0,
  });
  const [spellthree, setSpellthree] = useState({
    name: skillthree.name || '',
    id: skillthree.id || 0,
    description: skillthree.description || '',
    damage: skillthree.damage || 0,
    cooldown: skillthree.cooldown || 0,
    remainingCD: skillthree.cooldown || 0,
  });
  const gifUrl = '/boromir_1.gif';
  const herodeadRef = useRef<HTMLDivElement>(null);

  const handleClickHeroWin = () => {
    exitBattleHeroWin(hero, enemy);
  }
  const handleClickNpcWin = () => {
    exitBattleNpcWin(hero, enemy);
  }
  const handleClickRetreat = () => {
    runFromBattle(hero, enemy);
  }
  

  const [enemy, setEnemy] = useState<NPC>(enemyInput);

  const [hero, setHero] = useState<Characters>(heroInput);

  const combatProcderure = (inputdamage: {
    damage: number;
    name: string;
    cooldown: number;
    skill: number;
  }) => {
    setRolled(false);
    let heroDamage = 0;

    if (spellOne.remainingCD > 0) {
      const devCooldown = spellOne.remainingCD - 1;
      setSpellOne((prev) => ({
        ...prev,
        remainingCD: devCooldown,
      }));
    }

    if (spellTwo.remainingCD > 0) {
      const devCooldown = spellTwo.remainingCD - 1;
      setSpellTwo((prev) => ({
        ...prev,
        remainingCD: devCooldown,
      }));
    }

    if (spellthree.remainingCD > 0) {
      const devCooldown = spellthree.remainingCD - 1;
      setSpellthree((prev) => ({
        ...prev,
        remainingCD: devCooldown,
      }));
    }
    switch (inputdamage.skill) {
      case 1: {
        setSpellOne((prev) => ({
          ...prev,
          remainingCD: skillOne.cooldown!,
        }));
        break;
      }
      case 2: {
        setSpellTwo((prev) => ({
          ...prev,
          remainingCD: skillTwo.cooldown!,
        }));
        break;
      }
      case 3: {
        setSpellthree((prev) => ({
          ...prev,
          remainingCD: skillthree.cooldown!,
        }));
        break;
      }
    }
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
      Math.random() * enemy.dmg + enemy.power,
    );
    let heroHpAfterAttack = hero.currentHP - enemyDamage;
    let enemyHpAfterAttack: number = enemy.cur_hp - heroDamage;
    // if( hero[skill] instanceof Object && hero[skill].hasOwnProperty('CD')){
    //   console.log((hero[skill] as {CD: number}).CD)
    //   console.log(hero[skill].CD)
    // }
    if (combatlog.current)
      combatlog.current.innerText +=
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
      return { ...enemy, cur_hp: enemyHpAfterAttack };
    });

    if (heroHpAfterAttack < 0) {
      heroHpAfterAttack = 0;
    }
    if (enemyHpAfterAttack > 0) {
      setHero((hero) => {
        return { ...hero, currentHP: heroHpAfterAttack };
      });
    }
  };
  //solving end of the battle
  const [enemyDead, setEnemyDead] = useState(false);
  const [heroDead, setHeroDead] = useState(false);
  useEffect(() => {
    if (enemy.cur_hp === 0) {
      setEnemyDead(true);
    }
    if (hero.currentHP === 0) {
      setHeroDead(true);
    }
  }, [enemy.cur_hp, hero.currentHP]);

  useEffect(() => {
    if (luck! > 0) {
      combatProcderure(damage);
      setDamage({
        damage: 0,
        name: '',
        cooldown: 0,
        skill: 0,
      });
      console.log('fight');
    }
  }, [luck]);

  const roll = async (n: number) => {
    setTimeout(() => {
      setLuck(n);
    }, 2000);
  };
  const sessionData = useSession();

  return (
    <div key={sessionData.data?.user?.id} className={styles.container}>
      <div className={styles.enemy}>
        <div className={styles.enemystats}>
          <h1>fighting</h1>
          <h2>Name:{enemy.name}</h2>
          <h2>HP:{enemy.cur_hp}</h2>
          <progress
            value={enemy.cur_hp}
            className={styles.healthbar}
            max={enemy.hp}
          ></progress>
        </div>
        <Image
          src={enemy.img || "/npc/dragon.gif"}
          width="500"
          height="500"
          alt="/npc/dragon.gif"
        />
      </div>
      <div className={styles.abilitties}>
        <h2>Skills</h2>
        <button
          title={`remaining cooldown: ${spellOne.remainingCD}, ${spellOne.description}`}
          onClick={() => setDamage({ ...spellOne, skill: 1 })}
          disabled={
            spellOne.remainingCD > 0 || heroDead || enemyDead ? true : false
          }
        >
          {spellOne.name}
        </button>
        <br />
        <button
          title={`remaining cooldown: ${spellTwo.remainingCD} ,${spellTwo.description}`}
          onClick={() => setDamage({ ...spellTwo, skill: 2 })}
          disabled={
            spellTwo.remainingCD > 0 || heroDead || enemyDead ? true : false
          }
        >
          {spellTwo.name}
        </button>
        <br />
        <button
          title={`remaining cooldown: ${spellthree.remainingCD}, ${spellthree.description}`}
          onClick={() => setDamage({ ...spellthree, skill: 3 })}
          disabled={
            spellthree.remainingCD > 0 || heroDead || enemyDead ? true : false
          }
        >
          {spellthree.name}
        </button>
      </div>
      <button
        disabled={heroDead || enemyDead ? true : false}
        className={styles.run}
        onClick={handleClickRetreat}
      >
        RUN!
      </button>
      <div className={styles.stats}>
        <h2>HP:{hero.currentHP}</h2>
        <progress
          value={hero.currentHP}
          className={styles.healthbar}
          max={hero.maxHP}
        >
          {hero.currentHP}/{hero.maxHP}
        </progress>
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
        <div className={styles.combattext} ref={combatlog}></div>
      </div>
      {heroDead && <ResultScreen handleClick={handleClickNpcWin} whosIsDead={'hero'}/>}
      {enemyDead && <ResultScreen handleClick={handleClickHeroWin} whosIsDead={'enemy'}/>}
    </div>
  );
};

export default Battle;
