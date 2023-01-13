"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const react_1 = require("react");
const trpc_1 = require("utils/trpc");
const react_2 = require("react");
//import {EOL} from "os"
const Chat = () => {
    const inputElement = (0, react_2.useRef)(null);
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [players, setPlayers] = (0, react_1.useState)({});
    const messenger = trpc_1.trpc.wsRouter.sendMessage.useMutation();
    const [message, setMessage] = (0, react_1.useState)('');
    trpc_1.trpc.wsRouter.recieveMessage.useSubscription(undefined, {
        onData(data) {
            setMessages((prev) => {
                return [...prev, data];
            });
        },
    });
    const online = trpc_1.trpc.wsRouter.imOnline.useMutation();
    (0, react_1.useEffect)(() => {
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
    const t = trpc_1.trpc.wsRouter.onlinePlayers.useSubscription(undefined, {
        onData(data) {
            setPlayers((prev) => {
                return { ...prev, [data]: 0 };
            });
        },
    });
    return (<>
      <div>
        Online Players:
        {Object.keys(players).map((key, index) => {
            return <div key={index}>{key}</div>;
        })}
      </div>
      <div>
        {messages.map((m, index) => (
        // eslint-disable-next-line react/jsx-key
        <p key={index}>{m}</p>))}
      </div>
      <input type="text" className="border-8" ref={inputElement} onChange={(ev) => {
            const target = ev.target;
            setMessage(target.value);
        }} onKeyDown={(ev) => {
            if (ev.key == 'Enter') {
                messenger.mutate({ typing: message });
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                inputElement.current.value = '';
                setMessage('');
            }
        }}/>
      <button onClick={() => {
            messenger.mutate({ typing: message });
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            inputElement.current.value = '';
            setMessage('');
        }}>
        Send
      </button>
    </>);
};
exports.Chat = Chat;
