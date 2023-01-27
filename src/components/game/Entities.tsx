import { Characters, NPC } from '@prisma/client';
import { useState, useRef, useEffect } from 'react';
import { trpc } from 'utils/trpc';
import NPC_Container from './NPC_Container';
import Player_Container from './Player_Container';

const Entities = ({
  setInCombat,
  setHero,
  setEnemy,
}: {
  setInCombat: (x: boolean) => void;
  setHero: (x: Characters) => void;
  setEnemy: (x: NPC) => void;
}) => {
  // REFS
  const map = useRef<HTMLDivElement>(null);

  // STATES
  const [players, setPlayers] = useState<{
    [k: string]: {
      x: number;
      y: number;
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
  }, []);

  const startBattle = async () => {
    await battlePair.mutateAsync().then((res) => {
      console.warn('res: ', res);
      setHero(res.player as Characters);
      setEnemy(res.npc as NPC);
      console.warn("as*",res.player,res.npc);
      setInCombat(true);
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