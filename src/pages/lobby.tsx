import { Chat } from 'components/Chat';
import NavigationBar from 'components/NavigationBar';
import VideoBackground from 'components/VideoBackground';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
  useEffect(()=>{
    console.log(players)
  },[])
  return (<div>
    <VideoBackground />
      <NavigationBar/>
      <Chat />
    <div className={styles.container}>
      {Object.keys(players).map((e: any, index: number) => {
        return (
          <div
            key={index}
            className={styles.character}
            style={{ backgroundImage: `url(/${players[e].class}.png)` }}
          >
            {' '}
            {players[e].hero_name} : {players[e].race} {players[e].class}
            <h2>{players[e].name}</h2>
          </div>
        );
      })}

      <Link className={styles.startLink} href="/playground">
        <button className={styles.startButton}>Start</button>
      </Link>
      <Link className={styles.backLink} href="/character-list">
        <button className={styles.backButton}>{'<-'}</button>
      </Link>
    </div>
    </div>
  );
};

export default Lobby;
