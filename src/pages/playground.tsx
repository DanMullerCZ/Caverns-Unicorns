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
import LocationButtons from 'components/LocationButtons';
import Locations from 'components/Locations';

const Playground: NextPage = () => {
  // ALL HOOKS AND REFS
  const session = useSession();
  const main = useRef<HTMLDivElement>(null);

    // STATES
  const [players, setPlayers] = useState<{ [k: string]: { [k: string]: any } }>({});
  const [heroInfo, setHeroInfo] = useState<Characters>();
  const [location,setLocation] = useState<string>('')
  const [locationVisibility,setLocationVisibility]= useState<string>('')
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
  const deadNPC = trpc.playground.removeDeadNpc.useMutation()
  trpc.wsRouter.onlinePlayersAfterLogin.useSubscription(undefined, {
    onData(data) {
      console.log(data);
      setPlayers((prev) => {
        return { ...prev, [data.name]: data };
      });
    },
  });
 
    //  USE EFFECTS
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      window.location.href = '/login';
    } else if (localStorage.getItem('char_id') === null ) {
      window.location.href = '/character-list';
    }
  });
  useEffect(() => {
    if (main.current) {
      main.current.focus();
    }
  }, [])

  useEffect(() => {
    console.log(players);
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

  const exitBattle = (hero: Characters, npc: NPC) => {
    // here we have to call backend procedure to update character in db and instance as well
    console.error('****', hero, npc);
    setInCombat(false);
    
    deadNPC.mutate({npcId:npc.id})
    
  };

  const setLocationName = (name:string)=>{
    setLocation(name)
  }

  const setVisibility = (x:string)=>{
    setLocationVisibility(x)
  }

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
          <Entities setHero={setHero} setEnemy={setNpc} setInCombat={setInCombat} setLocation={setLocationName} />
            <LocationButtons locationName={location} setVisible={setVisibility} />
          {inCombat && enemy && heroInfo && (
            <Battle
            exitBattle={exitBattle}
            enemyInput={enemy}
            heroInput={heroInfo}
            skillOne={spellOne}
            skillTwo={spellTwo}
            skillthree={spellthree}
            />
            )}
            {heroInfo && (<Locations setVisible={setVisibility} setInCombat={setInCombat} setEnemy={setEnemy} visible={locationVisibility} hero={heroInfo} setHero={setHero}/>)}
        </div>
        <InGameChat />
      </div>
    </>
  );
};

export default Playground;