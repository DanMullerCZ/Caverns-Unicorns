import { Chat } from 'components/Chat';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { trpc } from 'utils/trpc';
import styles from '../styles/lobby.module.css';

const Lobby = () => {
  const [players, setPlayers] = useState<{ [k: string]: { [k: string]: any } }>(
    {},
  );
  const t = trpc.wsRouter.onlinePlayersAfterLogin.useSubscription(undefined, {
    onData(data) {
      setPlayers((prev) => {
        return { ...prev, [data.name]: data };
      });
    },
  });

  return (
    <div className={styles.container}>
      <Chat />
      {Object.keys(players).map((e: any, index: number) => {
        return (
          <div
            key={index}
            className="bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/${players[e].class}.png)` }}
          >
            {players[e].hero_name} : {players[e].race} {players[e].class}
          </div>
        );
      })}

      <button className={styles.startButton}>
        <Link className={styles.startLink} href="/playground">
          Start
        </Link>
      </button>
      <button className={styles.backButton}>
        <Link className={styles.backLink} href="/character-list">
          {'<-'}
        </Link>
      </button>
    </div>
  );
};

export default Lobby;
