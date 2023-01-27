import MapTile from 'components/MapTile';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { trpc } from 'utils/trpc';
import styles from '../styles/playground.module.css';
import { mapArray } from 'components/array';
import Header from 'components/general/Header';
import Battle from 'components/BattleLogic/Battle';
import { useSession } from 'next-auth/react';
import { NPC, Characters } from '@prisma/client';
import { InGameChat } from 'components/InGameChat';
import Entities from 'components/game/Entities';
import { spellOne, spellthree, spellTwo } from 'server/playground/spells';

const Playground: NextPage = () => {
  // ALL HOOKS AND REFS
  const session = useSession();
  const main = useRef<HTMLDivElement>(null);

    // STATES
  const [heroInfo, setHeroInfo] = useState<Characters>();
  const [enemy, setEnemy] = useState<NPC>();
  const [inCombat, setInCombat] = useState(false);
  const [moveMatrix, setMoveMatrix] = useState({
    up: false,
    left: false,
    down: false,
    right: false,
    orientation: true,
  });

    // PROCEDURES HOOKS
  const controller = trpc.playground.remoteControl.useMutation();
  const deadNPC = trpc.playground.removeDeadNpc.useMutation();
  const deadPlayer = trpc.playground.removeDeadPlayer.useMutation();
  const retreat = trpc.playground.retreat.useMutation();
   
    //  USE EFFECTS
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      window.location.href = '/login';
    } else if (localStorage.getItem('char_id') === null) {
      window.location.href = '/character-list';
    }
  });
  useEffect(() => {
    if (main.current) {
      main.current.focus();
    }
  }, [])

  useEffect(() => {
    if (document.activeElement === main.current) {
      controller.mutate(moveMatrix);
    }
  }, [moveMatrix]);

  const setHero = (x: Characters) => {
    setHeroInfo(x);
  };
  const setNpc = (y: NPC) => {
    setEnemy(y);
  };

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

  const exitBattleHeroWin = (hero: Characters, npc: NPC) => {
    console.error('**** hero wins', hero, npc);
    setInCombat(false);
    deadNPC.mutate({npcId:npc.id})
  };

  const exitBattleNpcWin = (hero: Characters, npc: NPC) => {
    console.error('**** hero looses', hero, npc);
    setInCombat(false);
    deadPlayer.mutate()
    alert('You died! Now you are spectating other heroes!');
  };

  const runFromBattle = (hero: Characters, npc: NPC) => {
    console.error('**** runnnig away', hero, npc);
    setInCombat(false);
    // both are alive
    // player looses some hp
    retreat.mutate({hero: hero})
  };

  return (
    <>
      <Header title="Playground" />
      <div
        id="mainContent"
        ref={main}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className="relative select-none"
        style={{
          display: 'flex',
          background: '#92884A',
          aspectRatio: 16 / 9,
        }}
        draggable={false}
      >
        <div
          id="map"
          style={{
            position: 'relative',
            height: '80vh',
            width: '80vw',
          }}
        >
          <div
            id="mapTiles"
            className={styles.container}
            style={{
              position: 'absolute',
            }}
          >
            {mapArray.map((e, indexE) =>
              e.map((f, indexF) => (
                <MapTile
                  key={`${indexE.toString()} + ${indexF.toString()}`}
                  tileType={f}
                />
              )),
            )}
          </div>
          <Entities setHero={setHero} setEnemy={setNpc} setInCombat={setInCombat} />
          {inCombat && enemy && heroInfo && (
            <Battle
              exitBattleHeroWin={exitBattleHeroWin}
              exitBattleNpcWin={exitBattleNpcWin}
              runFromBattle={runFromBattle}
              enemyInput={enemy}
              heroInput={heroInfo}
              skillOne={spellOne}
              skillTwo={spellTwo}
              skillthree={spellthree}
            />
          )}
        </div>
        <InGameChat />
      </div>
    </>
  );
};

export default Playground;