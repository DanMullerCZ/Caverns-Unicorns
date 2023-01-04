import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';
import { useRef } from 'react';

//import {EOL} from "os"

export const Chat: NextPage = () => {
  const inputElement = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [players, setPlayers] = useState<{ [k: string]: number }>({});
  const messenger = trpc.wsRouter.sendMessage.useMutation();
  const [message, setMessage] = useState<string>('');
  trpc.wsRouter.recieveMessage.useSubscription(undefined, {
    onData(data) {
      setMessages((prev: string[]) => {
        return [...prev, data];
      });
    },
  });
  const online = trpc.wsRouter.imOnline.useMutation();
  useEffect(() => {
    const onlineCheck = setInterval(() => {
      online.mutate();
      setPlayers((prev) => {
        for (const p in prev) {
          prev[p] = prev[p] + 5;
        }
        return prev;
      });
    }, 5000);

    const usersCheck = setInterval(() => {
      console.log(players);

      setPlayers((prev) => {
        for (const p in prev) {
          if (prev[p] > 15) {
            delete prev[p];
          }
        }
        return prev;
      });
    }, 20000);
    online.mutate();
    return () => {
      clearInterval(onlineCheck);
      clearInterval(usersCheck);
    };
  }, []);

  const t = trpc.wsRouter.onlinePlayers.useSubscription(undefined, {
    onData(data) {
      setPlayers((prev) => {
        return { ...prev, [data]: 0 };
      });
    },
  });

  return (
    <>
      <div>
        Online Players:
        {Object.keys(players).map((key, index) => {
          return <div key={index}>{key}</div>;
        })}
      </div>
      <div>
        {messages.map((m, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <p key={index}>{m}</p>
        ))}
      </div>
      <input
        type="text"
        className="border-8"
        ref={inputElement}
        onChange={(ev: React.FormEvent<EventTarget>) => {
          const target: HTMLInputElement = ev.target as HTMLInputElement;
          setMessage(target.value);
        }}
        onKeyDown={(ev: any) => {
          if (ev.key == 'Enter') {
            messenger.mutate({ typing: message });
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            inputElement.current!.value = '';
            setMessage('');
          }
        }}
      />
      <button
        onClick={() => {
          messenger.mutate({ typing: message });
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          inputElement.current!.value = '';
          setMessage('');
        }}
      >
        Send
      </button>
    </>
  );
};
