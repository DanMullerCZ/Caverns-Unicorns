import MapTile from 'components/MapTile';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { trpc } from 'utils/trpc';
import styles from '../styles/playground.module.css';
import { mapArray } from 'components/array';
import Header from 'components/general/Header';
import Battle from 'components/BattleLogic/Battle';
import { useSession } from 'next-auth/react';
import { NPC, Characters, Spell } from '@prisma/client';
import { width } from '@mui/system';
import { relative } from 'path';
import { InGameChat } from 'components/InGameChat';
import HumanTown from './town';



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
  };
  const spellTwo: Spell = {
    name: 'fireball',
    id: 2,
    description: 'fucking little candle',
    damage: 20,
    cooldown: 0,
  };
  const spellthree: Spell = {
    name: 'immolation',
    id: 3,
    description: 'flames wreathe one creature you can see within your range',
    damage: 15,
    cooldown: 3,
  };
  
  // const heroInfo: Characters = {
  //   id: 0,
  //   name: 'test hero name',
  //   owner_id: 'test owner ',
  //   maxHP: 1000,
  //   currentHP: 1000,
  //   str: 1,
  //   dex: 1,
  //   con: 1,
  //   wis: 1,
  //   int: 1,
  //   char: 1,
  //   class: 'paladin',
  //   race: 'human',
  //   skillOne_id: 1,
  //   skillTwo_id: 2,
  //   skillThree_id: 3,
  // };
  // const enemy: NPC = {
  //   id: 'id1',
  //   name: 'dragon',
  //   posX: 0,
  //   posY: 0,
  //   img: '/npc/dragon.gif',
  //   dmg: 20,
  //   power: 10000,
  //   exp: 50,
  //   hp: 1,
  //   cur_hp: 1,
  // };
  const [heroInfo, setHeroInfo] = useState<Characters>()
  const [enemy, setEnemy] = useState<NPC>()
  const setHero = (x: Characters) => {
    setHeroInfo(x)
  }
  const setNpc = ( y: NPC) => {
    setEnemy(y)
  }

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
  console.log(session.data?.user?.name as string, 'session name');

  const controller = trpc.playground.remoteControl.useMutation();
  const main = useRef<HTMLDivElement>(null);

  const [inCombat, setInCombat] = useState(false);

  const chat = useRef<HTMLDivElement>(null);

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

    if (document.activeElement === main.current) {
      // main.current.focus();
      controller.mutate(moveMatrix);

    }
    }
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

  const exitBattle = (hero: Characters) => {
    setInCombat(false);
  };
 
  return (
    <>
      <Header title="Playground" />
      <div
        id='mainContent'
        ref={main}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className = "relative select-none"
        style={{
          display: 'flex',
          background: '#92884A',
          aspectRatio: 16/9
        }}
        draggable={false}
      >

        {/* THIS IS OUR GREAT MAP */}
        <div
          id='map'
          style={{
            position:"relative",
            height: '80vh',
            width: '80vw',
          }}
        >
          <div
            id='mapTiles'
            className={styles.container}
              style={{
            position:"absolute"}}>

            {mapArray.map((e, indexE) =>
              e.map((f, indexF) => <MapTile key={`${indexE.toString()} + ${indexF.toString()}`} tileType={f} />),
            )}
          </div>
          <Map setHero={setHero} setEnemy={setNpc} setInCombat={setInCombat}/> 
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
        </div>
        <div 
          id='chat'
          ref={chat}
          style={{
            backgroundColor: 'gray',
            height: '100vh',
            width: '20vw',
          }}
        >
          <InGameChat />
           
        <button
          onClick={() => {
            setInCombat(true);
          }}
        >
          start combat!
        </button>
        </div>

      </div>
    </>
  );
};

const Map = ({setInCombat, setHero, setEnemy}: {setInCombat:(x: boolean) => void, setHero:(x:Characters)=>void, setEnemy:(x:NPC)=>void}) => {
  const enemies = trpc.playground.loadEnemies.useMutation()
  const [bp, setBp] = useState("no data")

  const battlePair = trpc.playground.somethingLikeBattle.useMutation();
  const map = useRef<HTMLDivElement>(null)
  const [s, setS] = useState<{
    [k: string]: { x: number; y: number; orientation: boolean, status: { battle: boolean; alive: boolean; } };

  }>();
  trpc.playground.sub.useSubscription(undefined, {
    onData(data) {
      setS(data);
    },
  });

  useEffect(() => {
    enemies.mutate()
  }, [])
  
  const startBattle = (): void => {
    setInCombat(true)
    battlePair.mutate();
    //input from DB 
    
    // setEnemy(enemy)
    // setHero(hero)
    setBp(battlePair.data?.enemy as string)

  }
  //seaching in DB for enemy and hero infos
  // const getChar = trpc.dbRouter.getCharacter.useMutation()
  // const getNpc = trpc.dbRouter.getNpc.useMutation()
  // const localStorcharId = Number(localStorage.getItem('char_id')) 
  
  
  // if(battlePair.isSuccess && localStorage.getItem('char_id')!=null){
  //   getChar.mutate({charId: localStorcharId})
  //   getNpc.mutate({name: 'dragon'})
  // }
  // if(getChar.isSuccess && getNpc.isSuccess && getNpc.data!=null && getChar.data){

  //   setEnemy(getNpc.data)
  //   setHero(getChar.data)
  // }
  return (

    <div
      id='characters' 
      ref={map}
        style={{
        position:'absolute',
        top: '0',
        left: '0',
        height: "auto",
        width: "80vw"
      }}
    >
      {s // RENDERS PLAYERS IN RT
        ? Object.entries(s).map(([k, { x, y, orientation, status: { battle, alive } }], index) => {
            return (
              <div
                id='player-container'
                style={{ 
                  position: 'absolute',
                  top: `${y*map.current!.clientWidth/1600}px`,
                  left: `${x*map.current!.clientWidth/1600}px`,
                  width: `${map.current!.clientWidth/50}px`,
                  height: `${map.current!.clientWidth/25}px`,
                }}

                key={index}
              >
                <div
                  style={{

                    position:"relative",
                    left:`-${12* map.current!.clientWidth/1600}px`,
                    top:`-${25* map.current!.clientWidth/1600}px`,
                    transform: `scaleX(${orientation ? -1 : 1})`,
                    backgroundImage: `url('/npc/rogue.gif')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                  }}
                ></div>
                <div>{k}</div>
                <div>PosX: {x.toFixed(1)}</div>
                <div>PosY: {y.toFixed(1)}</div>
                <button 
                  disabled={false}
                  onClick={startBattle}
                >
                  Start Battle
                </button>
              </div>
            );
          })
        : 'nothing'}


      {/* RENDER NPCs */}
        {enemies.data?.map((npc, index) => {
          return (
            <div
              id='npc-container'
              style={{ 
                position: 'absolute',
                top: `${npc.posY*map.current!.clientWidth/1600}px`,
                left: `${npc.posX*map.current!.clientWidth/1600}px`,
                width: `${map.current!.clientWidth/50}px`,
                height: `${map.current!.clientWidth/25}px`,
              }}
              key={index + npc.name}
            >
              <div
                style={{
                  backgroundImage: `url(${npc.img})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height:'100%',
                  width:'100%',
                }}
              ></div>
              <div>{npc.name}</div>
              <div>HP: {npc.stats.cur_hp}</div>
              

            </div>
          )
        })}
        <div id='tuu jsem' className='text-500-red'>{battlePair.data?.enemy}</div>

    </div>
  );
};

export default Playground;
