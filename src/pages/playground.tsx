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


const Playground: NextPage = () => {
  const controller = trpc.playground.remoteControl.useMutation();
  const main = useRef<HTMLDivElement>(null);
  const [inCombat, setInCombat] = useState(false)
  const [moveMatrix, setMoveMatrix] = useState({
    up: false,
    left: false,
    down: false,
    right: false,
    orientation: true
  });

  useEffect(() => {
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
            setMoveMatrix({ ...moveMatrix, left: true, orientation:true });
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
            setMoveMatrix({ ...moveMatrix, right: true, orientation:false });
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
      <Header title='Playground' />
      <div
        ref={main}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className="mx-auto flex flex-col items-center justify-center gap-10 px-6 py-8 md:h-screen lg:py-0"
      >
        {/* <h1 className="text-[100px]">Welcome to the Wildlands</h1> */}
        <div className={styles.container}>
          {mapArray.map((e,index) => (e.map(f => (<MapTile key={index} tileType={f} />))))}
        </div>
        <Map />
        <Chat/>
          {inCombat && (<Battle exitBattle={() => setInCombat(false)}/>)}
        <button onClick={() => {setInCombat(true)}} >start combat!</button>
        
      </div>
    </>
  );
};

const Map = () => {
  const [s, setS] = useState<{ [k: string]: { x: number; y: number,orientation:boolean } }>();
  trpc.playground.sub.useSubscription(undefined, {
    onData(data) {
      setS(data);
    },
  });

  return (
    <div className="bg-yellow relative">
      {s
        ? Object.entries(s).map(([k, { x, y,orientation }], index) => {
          return (
            <div
              className="absolute"
              style={{ top: `${y}px`, left: `${x}px` }}
              key={index}
            >
              
              <div style={{
                transform: `scaleX(${orientation ? -1 : 1})`,
                // transform: 'rotate(30deg)',
                backgroundImage: `url(${k=='Jakub' ?'/npc/dragon.gif' :'/npc/rogue.gif'})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height:(k=='Jakub')?'200px':'80px',
                width:(k=='Jakub')?'250px':'60px'
              }}></div>
            <div>{k}</div>
      

            </div>

          );
        })
        : 'nothing'}
    </div>
  );
};

export default Playground;