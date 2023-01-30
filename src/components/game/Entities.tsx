import { Characters, NPC } from '@prisma/client';
import { useState, useRef, useEffect } from 'react';
import { checkPosition } from 'utils/playground-functions';
import { trpc } from 'utils/trpc';
import NPC_Container from './NPC_Container';
import Player_Container from './Player_Container';

const Entities = ({
  setInCombat,
  setHero,
  setEnemy,
  setLocation,
}: {
  setInCombat: (x: boolean) => void;
  setHero: (x: Characters) => void;
  setEnemy: (x: NPC) => void;
  setLocation:(x:string)=>void;
}) => {
  // REFS
  const map = useRef<HTMLDivElement>(null);
  const [name,setName]=useState<string>('')

  // STATES
  const [players, setPlayers] = useState<{
    [k: string]: {
      x: number;
      y: number;
      ownerId: string;
      orientation: boolean;
      status: { battle: boolean; alive: boolean };
    };
  }>();

  // BACKEND PROCEDURES
  const battlePair = trpc.playground.somethingLikeBattle.useMutation();
  const enemies = trpc.playground.loadEnemies.useMutation();
  trpc.playground.sub.useSubscription(undefined, {
    onData(data) {
      setPlayers(data);
    },
  });
  trpc.playground.killNpc.useSubscription(undefined, {
    onData() {
      enemies.mutate();
    },
  });

  // USE EFFECTS
  useEffect(() => {
    enemies.mutate();
    setBp()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
      if (players && name && players[name] &&players[name].x && players[name].y) {
      const response = checkPosition(players[name].x,players[name].y)
      setLocation(response)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  const startBattle = async () => {
    await setBp()
    setInCombat(true);
  };

  const setBp = async() => {
    await battlePair.mutateAsync().then((res) => {
        setHero(res.player as Characters) 
        setEnemy(res.npc as NPC)
        setName(res.player.name as string)
      });

  };
  

  return (
    <div
      id="characters"
      ref={map}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        height: 'auto',
        width: '80vw',
      }}
    >
      {/* Renders Players */}
      {players &&
        Object.entries(players).map(
          (
            [
              k,
              {
                x,
                y,
                orientation,
                ownerId,
                status: { battle, alive },
              },
            ],
            index,
          ) => {
            return (
              <Player_Container
                key={index}
                hero_name={k}
                map={map.current as HTMLDivElement}
                startBattle={startBattle}
                another_props={{
                  x,
                  y,
                  orientation,
                  ownerId,
                  status: { battle, alive },
                }}
              />
            );
          },
        )}

      {/* RENDER NPCs */}
      {enemies.data?.map((npc, index) => (
        <NPC_Container
          key={index}
          npc={npc}
          map={map.current as HTMLDivElement}
        />
      ))}
    </div>
  );
};

export default Entities;
