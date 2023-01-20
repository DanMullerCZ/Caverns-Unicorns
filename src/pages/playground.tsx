import MapTile from 'components/MapTile';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { trpc } from 'utils/trpc';
import styles from '../styles/playground.module.css';
import { mapArray } from 'components/array';
import { Chat } from 'components/Chat';
import Header from 'components/general/Header';
import Battle from 'components/BattleLogic/Battle';
import { useSession } from 'next-auth/react';
import { NPC, Characters, Spell } from '@prisma/client';

const Playground: NextPage = () => {
  const [players, setPlayers] = useState<{ [k: string]: { [k: string]: any } }>(
    {},
  );
const spellOne: Spell = {
  name: 'Soul chain',
  id: 1,
  description: 'fucing badass chain with souls',
  damage: 50,
  cooldown: 5,
}
const spellTwo: Spell = {
  name: 'fireball',
  id: 2,
  description: 'fucking little candle',
  damage: 20,
  cooldown: 0,
}
const spellthree: Spell = {
  name: 'immolation',
  id: 3,
  description: 'flames wreathe one creature you can see within your range',
  damage: 15,
  cooldown: 3,
}
  const heroInfo: Characters = {
    id: 0,
    name: 'test hero name',
    owner_id: 'test owner ',
    maxHP: 1000,
    currentHP: 1000,
    str: 1,
    dex: 1,
    con: 1,
    wis: 1,
    int: 1,
    char: 1,
    class: 'paladin',
    race: 'human',
    skillOne_id: 1,
    skillTwo_id: 2,
    skillThree_id: 3,
  };
  const enemy: NPC = {
    id: 'id1',
    name: 'dragon',
    posX: 0,
    posY: 0,
    img: '/npc/dragon.gif',
    dmg: 20,
    power: 10,
    exp: 50,
    hp: 100,
    cur_hp: 100,
  };
  const t = trpc.wsRouter.onlinePlayersAfterLogin.useSubscription(undefined, {
    onData(data) {
      console.log(data);
      setPlayers((prev) => {
        return { ...prev, [data.name]: data };
      });
    },
  });
  const session = useSession();
  //checks that u can only enter PG after login and selection character
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      window.location.href = '/login';
    } else if (localStorage.getItem('char_id') === null) {
      window.location.href = '/character-list';
    }
  });
  console.log(players);
  console.log(players[session.data?.user?.name as string], 'session name');

  const controller = trpc.playground.remoteControl.useMutation();
  const main = useRef<HTMLDivElement>(null);
  const [inCombat, setInCombat] = useState(false);
  const [moveMatrix, setMoveMatrix] = useState({
    up: false,
    left: false,
    down: false,
    right: false,
    orientation: true,
  });

  useEffect(() => {
    console.log(players);
    if (main.current) {
      main.current.focus();
    }
    controller.mutate(moveMatrix);
  }, [moveMatrix]);
  const handleKey = (e: React.KeyboardEvent<HTMLElement>, action: boolean) => {
    if (e.repeat) {
      return;
    } else {
      switch (e.nativeEvent.key) {
        case 'w':
          if (action) {
            setMoveMatrix({ ...moveMatrix, up: true });
          } else {
            setMoveMatrix({ ...moveMatrix, up: false });
          }
          break;
        case 'a':
          if (action) {
            setMoveMatrix({ ...moveMatrix, left: true, orientation: true });
          } else {
            setMoveMatrix({ ...moveMatrix, left: false });
          }
          break;
        case 's':
          if (action) {
            setMoveMatrix({ ...moveMatrix, down: true });
          } else {
            setMoveMatrix({ ...moveMatrix, down: false });
          }
          break;
        case 'd':
          if (action) {
            setMoveMatrix({ ...moveMatrix, right: true, orientation: false });
          } else {
            setMoveMatrix({ ...moveMatrix, right: false });
          }
          break;
        default:
          break;
      }
    }
    console.log(moveMatrix);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    handleKey(e, true);
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    handleKey(e, false);
  };
  // const arr:string[] = Array(144).fill('grass')
  // arr[72]='city'
  return (
    <>
      <Header title="Playground" />
      <div
        ref={main}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className="mx-auto flex flex-col items-center justify-center gap-10 px-6 py-8 md:h-screen lg:py-0"
      >
        {/* <h1 className="text-[100px]">Welcome to the Wildlands</h1> */}
        <div className={styles.container}>
          {mapArray.map((e, indexE) =>
            e.map((f, indexF) => (
              <MapTile
                key={indexE.toString() + indexF.toString()}
                tileType={f}
              />
            )),
          )}
        </div>
        <Map />
        <Chat />
        {inCombat && players[session.data?.user?.name as string] && (
          <Battle
            exitBattle={() => setInCombat(false)}
            enemyInput={enemy}
            heroInput={heroInfo}
            skillOne={spellOne}
            skillTwo={spellTwo}
            skillthree={spellthree}
          />
        )}
        <button
          onClick={() => {
            setInCombat(true);
          }}
        >
          start combat!
        </button>
      </div>
    </>
  );
};

const Map = () => {
  const [s, setS] = useState<{
    [k: string]: { x: number; y: number; orientation: boolean };
  }>();
  trpc.playground.sub.useSubscription(undefined, {
    onData(data) {
      setS(data);
    },
  });

  return (
    <div className="bg-yellow relative">
      {s
        ? Object.entries(s).map(([k, { x, y, orientation }], index) => {
            return (
              <div
                className="absolute"
                style={{ top: `${y}px`, left: `${x}px` }}
                key={index}
              >
                <div
                  style={{
                    transform: `scaleX(${orientation ? -1 : 1})`,
                    // transform: 'rotate(30deg)',
                    backgroundImage: `url(${
                      k == 'Jakub' ? '/npc/dragon.gif' : '/npc/rogue.gif'
                    })`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: k == 'Jakub' ? '200px' : '80px',
                    width: k == 'Jakub' ? '250px' : '60px',
                  }}
                ></div>
                <div>{k}</div>
              </div>
            );
          })
        : 'nothing'}
    </div>
  );
};

export default Playground;
