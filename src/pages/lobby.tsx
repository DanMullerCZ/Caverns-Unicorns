import { Chat } from 'components/Chat';
import NavigationBar from 'components/NavigationBar';
import VideoBackground from 'components/VideoBackground';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';
import styles from '../styles/lobby.module.css';

const Lobby = () => {
  const session = useSession();
  const router = useRouter()
  
  const [players, setPlayers] = useState<{ [k: string]: { [k: string]: any } }>(
    {},
  );
  const [prepared, setPrepared] = useState(false);
  const t = trpc.wsRouter.onlinePlayersAfterLogin.useSubscription(undefined, {
    onData(data) {
     
      setPlayers((prev) => {
        return { ...prev, [data.name]: data };
      });
    },
  });
  trpc.wsRouter.sendRemovedPlayer.useSubscription(undefined, {
    onData(data) {
      setPlayers((prev) => {
        delete prev[data];
        return prev;
      });
    },
  });
  useEffect(() => {
    setPrepared(checkReadyForEveryone());
  }, [players]);
  useEffect(() => {
    localStorage.setItem('ready', 'false');
  }, []);

  const checkReadyForEveryone = () => {
    for (const [key, value] of Object.entries(players)) {
      if (value.ready === false) {
        return false;
      }
    }
    return true;
  };

  const setReady = () => {
        localStorage.getItem('ready') === 'false'
      ? localStorage.setItem('ready', 'true')
      : localStorage.setItem('ready', 'false');
  };
  const sendStart = trpc.wsRouter.sendStart.useMutation()
  const handleStart = () => {
    console.log(players);
    console.log(checkReadyForEveryone());
    sendStart.mutate()

  };

  trpc.wsRouter.startGame.useSubscription(undefined, {
    onData(data) {
     if(data){
      router.push("/playground")
     }
    },
  })
  
  return (
    <div>
      <VideoBackground />
      <NavigationBar />
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
              <h2>
                {players[e].name}
                {players[e].ready && ' is ready!'}
              </h2>
              {players[e].name === session.data?.user?.name && (
                <button
                  onClick={() => {
                    setReady();
                  }}
                >
                  Ready
                </button>
              )}
            </div>
          );
        })}

        {/*      { <Link className={styles.startLink} href="/playground"> */}
        <button
          disabled={!prepared}
          className={styles.startButton}
          onClick={handleStart}
        >
          Start
        </button>
        {/*   </Link> } */}
        <Link className={styles.backLink} href="/character-list">
          <button className={styles.backButton}>{'<-'}</button>
        </Link>
      </div>
    </div>
  );
};

export default Lobby;
