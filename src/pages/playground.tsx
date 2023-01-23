import MapTile from 'components/MapTile';
import { NextPage } from 'next';
import { use, useEffect, useRef, useState } from 'react';
import { trpc } from 'utils/trpc';
import styles from '../styles/playground.module.css';
import { mapArray } from 'components/array';
import { Chat } from 'components/Chat';
import Header from 'components/general/Header';
import { width } from '@mui/system';
import { relative } from 'path';
import { InGameChat } from 'components/InGameChat';

const Playground: NextPage = () => {
  const controller = trpc.playground.remoteControl.useMutation();
  const main = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const [moveMatrix, setMoveMatrix] = useState({
    up: false,
    left: false,
    down: false,
    right: false,
    orientation: true,
  });

  useEffect(() => {
    if (document.activeElement === main.current) {
      // main.current.focus();
      controller.mutate(moveMatrix);
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
          <Map /> 
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
        </div>
      </div>
    </>
  );
};

const Map = () => {
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
    battlePair.mutate();
    setBp(battlePair.data?.enemy as string)
  }
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
