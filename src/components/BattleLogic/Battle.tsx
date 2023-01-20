import Dice from 'components/Dice';
import Image from 'next/image';
import { ProgressHTMLAttributes, useEffect, useRef, useState } from 'react';
import { any, string } from 'zod';
import styles from '../../styles/Battle.module.css';
import { NPC, Characters, Spell } from '@prisma/client';
import { useSession } from 'next-auth/react';
import session from 'pages/api/stripe/checkout/session';

const Battle = ({
  exitBattle,
  heroInput,
  enemyInput,
  skillOne,
  skillTwo,
  skillthree,
}: {
  exitBattle: () => void;
  heroInput: Characters;
  skillOne: Spell;
  skillTwo: Spell;
  skillthree: Spell;
  // {
  //   name: string;
  //   hp: number;
  //   skillONe: { damage: number; name: string; CD: number };
  //   skillTwo: { damage: number; name: string; CD: number };
  //   skillthree: { damage: number; name: string; CD: number };
  // };
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
  const handleClick = () => {
    exitBattle();
  };

  const [enemy, setEnemy] = useState<NPC>(enemyInput);

  const [hero, setHero] = useState<Characters>(heroInput);

  // useState({
  //   name: heroInput.name,
  //   hp: heroInput.hp,
  //   skillONe: { ...heroInput.skillONe, remainingCD: heroInput.skillONe.CD },
  //   skillTwo: { ...heroInput.skillTwo, remainingCD: 0 },
  //   skillthree: { ...heroInput.skillthree, remainingCD: 0 },

  // });

  const combatProcderure = (inputdamage: {
    damage: number;
    name: string;
    cooldown: number;
    skill: number;
  }) => {
    setRolled(false);
    let heroDamage: number = 0;

    if (spellOne.remainingCD > 0) {
      let devCooldown = spellOne.remainingCD - 1;
      setSpellOne((prev) => ({
        ...prev,
        remainingCD: devCooldown,
      }));
    }

    if (spellTwo.remainingCD > 0) {
      let devCooldown = spellTwo.remainingCD - 1;
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
    setHealthBar((enemy.cur_hp / enemy.hp) * 100)
    if (enemy.cur_hp === 0) {
      setHealthBar(0);
      setEnemyDead(true);
    }
    if (hero.currentHP === 0) {
      setHeroDead(true);
    }
  }, [enemy.hp, hero.currentHP]);

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
  const [healthBar, setHealthBar] = useState(100)

  return (
    <div key={sessionData.data?.user?.id} className={styles.container}>
      <div className={styles.enemy}>
        <div className={styles.enemystats}>
          <h1>fighting</h1>
          <h2>Name:{enemy.name}</h2>
          <h2>HP:{enemy.cur_hp}</h2>
          <progress  value={healthBar} className={styles.healthbar} max="100"></progress>
        </div>
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
          title={`remaining cooldown: ${spellOne.remainingCD}`}
          onClick={() => setDamage({ ...spellOne, skill: 1 })}
          disabled={spellOne.remainingCD > 0 || heroDead ? true : false}
        >
          {spellOne.name}
        </button>
        <br />
        <button
          title={`remaining cooldown: ${spellTwo.remainingCD}`}
          onClick={() => setDamage({ ...spellTwo, skill: 2 })}
          disabled={spellTwo.remainingCD > 0 || heroDead ? true : false}
        >
          {spellTwo.name}
        </button>
        <br />
        <button
          title={`remaining cooldown: ${spellthree.remainingCD}`}
          onClick={() => setDamage({ ...spellthree, skill: 3 })}
          disabled={spellthree.remainingCD > 0 || heroDead ? true : false}
        >
          {spellthree.name}
        </button>
      </div>
      <button
        disabled={heroDead ? true : false}
        className={styles.run}
        onClick={handleClick}
      >
        RUN!
      </button>
      <div className={styles.stats}>
        <h2>HP:{hero.currentHP}</h2>
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
      {heroDead && (
        <div className={styles.herodead} onClick={() => exitBattle()}>
          <video autoPlay muted id="myVideo">
            <source src="/boromir_1.gif" />
            <source src="boromir.gif" />
          </video>
          You died u weakling
        </div>
      )}
    </div>
  );
};

export default Battle;
