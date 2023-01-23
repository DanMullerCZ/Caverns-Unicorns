"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MapTile_1 = __importDefault(require("components/MapTile"));
const react_1 = require("react");
const trpc_1 = require("utils/trpc");
const playground_module_css_1 = __importDefault(require("../styles/playground.module.css"));
const array_1 = require("components/array");
const Header_1 = __importDefault(require("components/general/Header"));
const InGameChat_1 = require("components/InGameChat");
const Playground = () => {
    const controller = trpc_1.trpc.playground.remoteControl.useMutation();
    const main = (0, react_1.useRef)(null);
    const chat = (0, react_1.useRef)(null);
    const [moveMatrix, setMoveMatrix] = (0, react_1.useState)({
        up: false,
        left: false,
        down: false,
        right: false,
        orientation: true,
    });
    (0, react_1.useEffect)(() => {
        if (document.activeElement === main.current) {
            // main.current.focus();
            controller.mutate(moveMatrix);
        }
    }, [moveMatrix]);
    const handleKey = (e, action) => {
        if (e.repeat) {
            return;
        }
        else {
            switch (e.nativeEvent.key) {
                case 'w':
                    if (action) {
                        setMoveMatrix({ ...moveMatrix, up: true });
                    }
                    else {
                        setMoveMatrix({ ...moveMatrix, up: false });
                    }
                    break;
                case 'a':
                    if (action) {
                        setMoveMatrix({ ...moveMatrix, left: true, orientation: true });
                    }
                    else {
                        setMoveMatrix({ ...moveMatrix, left: false });
                    }
                    break;
                case 's':
                    if (action) {
                        setMoveMatrix({ ...moveMatrix, down: true });
                    }
                    else {
                        setMoveMatrix({ ...moveMatrix, down: false });
                    }
                    break;
                case 'd':
                    if (action) {
                        setMoveMatrix({ ...moveMatrix, right: true, orientation: false });
                    }
                    else {
                        setMoveMatrix({ ...moveMatrix, right: false });
                    }
                    break;
                default:
                    break;
            }
        }
        console.log(moveMatrix);
    };
    const handleKeyDown = (e) => {
        handleKey(e, true);
    };
    const handleKeyUp = (e) => {
        handleKey(e, false);
    };
    return (<>
      <Header_1.default title="Playground"/>
      <div id='mainContent' ref={main} tabIndex={-1} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} className="relative select-none" style={{
            display: 'flex',
            background: '#92884A',
            aspectRatio: 16 / 9
        }} draggable={false}>
        {/* THIS IS OUR GREAT MAP */}
        <div id='map' style={{
            position: "relative",
            height: '80vh',
            width: '80vw',
        }}>
          <div id='mapTiles' className={playground_module_css_1.default.container} style={{
            position: "absolute"
        }}>

            {array_1.mapArray.map((e, indexE) => e.map((f, indexF) => <MapTile_1.default key={`${indexE.toString()} + ${indexF.toString()}`} tileType={f}/>))}
          </div>
          <Map /> 
        </div>
        <div id='chat' ref={chat} style={{
            backgroundColor: 'gray',
            height: '100vh',
            width: '20vw',
        }}>
          <InGameChat_1.InGameChat />
        </div>
      </div>
    </>);
};
const Map = () => {
    var _a, _b;
    const enemies = trpc_1.trpc.playground.loadEnemies.useMutation();
    const [bp, setBp] = (0, react_1.useState)("no data");
    const battlePair = trpc_1.trpc.playground.somethingLikeBattle.useMutation();
    const map = (0, react_1.useRef)(null);
    const [s, setS] = (0, react_1.useState)();
    trpc_1.trpc.playground.sub.useSubscription(undefined, {
        onData(data) {
            setS(data);
        },
    });
    (0, react_1.useEffect)(() => {
        enemies.mutate();
    }, []);
    const startBattle = () => {
        var _a;
        battlePair.mutate();
        setBp((_a = battlePair.data) === null || _a === void 0 ? void 0 : _a.enemy);
    };
    return (<div id='characters' ref={map} style={{
            position: 'absolute',
            top: '0',
            left: '0',
            height: "auto",
            width: "80vw"
        }}>
      {s // RENDERS PLAYERS IN RT
            ? Object.entries(s).map(([k, { x, y, orientation, status: { battle, alive } }], index) => {
                return (<div id='player-container' style={{
                        position: 'absolute',
                        top: `${y * map.current.clientWidth / 1600}px`,
                        left: `${x * map.current.clientWidth / 1600}px`,
                        width: `${map.current.clientWidth / 50}px`,
                        height: `${map.current.clientWidth / 25}px`,
                    }} key={index}>
                <div style={{
                        position: "relative",
                        left: `-${12 * map.current.clientWidth / 1600}px`,
                        top: `-${25 * map.current.clientWidth / 1600}px`,
                        transform: `scaleX(${orientation ? -1 : 1})`,
                        backgroundImage: `url('/npc/rogue.gif')`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height: '100%',
                    }}></div>
                <div>{k}</div>
                <div>PosX: {x.toFixed(1)}</div>
                <div>PosY: {y.toFixed(1)}</div>
                <button disabled={false} onClick={startBattle}>
                  Start Battle
                </button>
              </div>);
            })
            : 'nothing'}

      {/* RENDER NPCs */}
        {(_a = enemies.data) === null || _a === void 0 ? void 0 : _a.map((npc, index) => {
            return (<div id='npc-container' style={{
                    position: 'absolute',
                    top: `${npc.posY * map.current.clientWidth / 1600}px`,
                    left: `${npc.posX * map.current.clientWidth / 1600}px`,
                    width: `${map.current.clientWidth / 50}px`,
                    height: `${map.current.clientWidth / 25}px`,
                }} key={index + npc.name}>
              <div style={{
                    backgroundImage: `url(${npc.img})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                    width: '100%',
                }}></div>
              <div>{npc.name}</div>
              <div>HP: {npc.stats.cur_hp}</div>
              

            </div>);
        })}
        <div id='tuu jsem' className='text-500-red'>{(_b = battlePair.data) === null || _b === void 0 ? void 0 : _b.enemy}</div>
    </div>);
};
exports.default = Playground;
