import MapTile from 'components/MapTile';
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { trpc } from 'utils/trpc';
import styles from '../styles/playground.module.css';
import { mapArray } from 'components/array';
import { Chat } from 'components/Chat';
import Header from 'components/general/Header';

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
  // const arr:string[] = Array(144).fill('grass')
  // arr[72]='city'
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
            height: '80vh',
            width: '80vw',
          }}
        >
          <div
            id='mapTiles'
            className={styles.container}>
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
          {/* <Chat /> */}
        </div>
      </div>
    </>
  );
};

const Map = () => {
  const enemies = trpc.playground.loadEnemies.useMutation()
  const map = useRef<HTMLDivElement>(null)
  const [s, setS] = useState<{
    [k: string]: { x: number; y: number; orientation: boolean, distance: number };
  }>();
  trpc.playground.sub.useSubscription(undefined, {
    onData(data) {
      setS(data);
    },
  });

  useEffect(() => {
    enemies.mutate()
  }, [])

  return (
    <div
      id='characters' 
      ref={map}
      className="absolute w-full h-full"
      style={{
        top: '0',
        left: '0'
      }}
    >
      {s // RENDERS PLAYERS IN RT
        ? Object.entries(s).map(([k, { x, y, orientation, distance }], index) => {
            return (
              <div
                id='player-container'
                style={{ 
                  position: 'absolute',
                  top: `${y*100/900}%`, 
                  left: `${x*100/1600}%`,
                  width: '5vw',
                  height: '15vh',
                }}
                key={index}
              >
                <div
                  style={{
                    transform: `scaleX(${orientation ? -1 : 1})`,
                    backgroundImage: `url('/npc/rogue.gif')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    // height: '15%', // ratio is 1:3
                    // width: '5%',
                    width: '100%',
                    height: '100%',
                  }}
                ></div>
                <div>{k}</div>
                <div>PosX: {x}</div>
                <div>PosY: {y}</div>
              </div>
            );
          })
        : 'nothing'}

        {/* RENDER NPCs */}
        {/* <div className='bg-yellow absolute w-full h-full'>
          {enemies.data?.map((npc, index) => {
          return (
            <div
                className="absolute w-full h-full"
                style={{ top: `${npc.posY}px`, left: `${npc.posX}px` }}
                key={index + npc.name}
              >
                <div
                  style={{
                    backgroundImage: `url(${'/npc/zombie1.svg'})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height:'15%',
                    width:'5%',
                  }}
                ></div>
                <div>{npc.name}</div>
              </div>
          )
        })}
        </div> */}
    </div>
  );
};

export default Playground;
