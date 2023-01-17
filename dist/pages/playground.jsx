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
const Playground = () => {
    const controller = trpc_1.trpc.playground.remoteControl.useMutation();
    const main = (0, react_1.useRef)(null);
    const [moveMatrix, setMoveMatrix] = (0, react_1.useState)({
        up: false,
        left: false,
        down: false,
        right: false,
        orientation: true
    });
    (0, react_1.useEffect)(() => {
        if (main.current) {
            main.current.focus();
        }
        controller.mutate(moveMatrix);
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
    // const arr:string[] = Array(144).fill('grass')
    // arr[72]='city'
    return (<>
      <Header_1.default title='Playground'/>
      <div ref={main} tabIndex={-1} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} className="mx-auto flex flex-col items-center justify-center gap-10 px-6 py-8 md:h-screen lg:py-0">
        {/* <h1 className="text-[100px]">Welcome to the Wildlands</h1> */}
        <div className={playground_module_css_1.default.container}>
          {array_1.mapArray.map((e, index) => (e.map(f => (<MapTile_1.default key={index} tileType={f}/>))))}
        </div>
        <Map />
      </div>
    </>);
};
const Map = () => {
    const [s, setS] = (0, react_1.useState)();
    trpc_1.trpc.playground.sub.useSubscription(undefined, {
        onData(data) {
            setS(data);
        },
    });
    return (<div className="bg-yellow relative">
      {s
            ? Object.entries(s).map(([k, { x, y, orientation }], index) => {
                return (<div className="absolute" style={{ top: `${y}px`, left: `${x}px` }} key={index}>
              
              <div style={{
                        transform: `scaleX(${orientation ? -1 : 1})`,
                        // transform: 'rotate(30deg)',
                        backgroundImage: `url(${k == 'Jakub' ? '/npc/dragon.gif' : '/npc/rogue.gif'})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        height: (k == 'Jakub') ? '200px' : '80px',
                        width: (k == 'Jakub') ? '250px' : '60px'
                    }}></div>
            <div>{k}</div>
      

            </div>);
            })
            : 'nothing'}
    </div>);
};
exports.default = Playground;
