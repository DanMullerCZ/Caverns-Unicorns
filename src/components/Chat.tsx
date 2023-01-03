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
  const [players, setPlayers] = useState(new Set<string>());
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
    const interval = setInterval(() => {
      online.mutate();
    }, 10000);
    return () => {
      clearInterval(interval);
      trpc.wsRouter.imOffline.useMutation();
    };
  }, []);
  trpc.wsRouter.onlinePlayers.useSubscription(undefined, {
    onData(data) {
      setPlayers((prev: Set<string>) => {
        const string: string[] = [...Array.from(prev), data];
        return new Set<string>(string);
      });
    },
  });

  return (
    <>
      <div>
        {Array.from(players).map((p, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <p key={index}>{p}</p>
        ))}
      </div>
      <div>
        {messages.map((m, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <p key={index}>{m}</p>
        ))}
      </div>
      <input
        type="text"
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
