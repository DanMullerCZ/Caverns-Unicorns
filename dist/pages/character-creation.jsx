"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = void 0;
const react_1 = __importStar(require("react"));
const ClassList_1 = __importDefault(require("components/ClassList"));
const RaceList_1 = __importDefault(require("components/RaceList"));
const trpc_1 = require("utils/trpc");
const react_2 = require("next-auth/react");
const _app_1 = require("server/routers/_app");
const superjson_1 = __importDefault(require("superjson"));
const ssg_1 = require("@trpc/react-query/ssg");
const head_1 = __importDefault(require("next/head"));
const NavigationBar_1 = __importDefault(require("components/NavigationBar"));
const Attribute_1 = __importDefault(require("components/Attribute"));
const VideoBackground_1 = __importDefault(require("components/VideoBackground"));
const createNewChar = () => {
    const dataRaces = trpc_1.trpc.dbRouter.getAllRaces.useQuery();
    const races = dataRaces.data;
    const dataClasses = trpc_1.trpc.dbRouter.getAllClasses.useQuery();
    const classes = dataClasses.data;
    const sessionData = (0, react_2.useSession)();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [confirmAtr, setConfirmAtr] = (0, react_1.useState)(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const nameOfChar = (0, react_1.useRef)(null);
    const arr = [
        'str',
        'dex',
        'con',
        'wis',
        'char',
        'int',
    ];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedRace, setSelectedRace] = (0, react_1.useState)(1);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [character, setCharacter] = (0, react_1.useState)({
        race: '',
        class: '',
        str: 10,
        con: 10,
        dex: 10,
        int: 10,
        wis: 10,
        char: 10,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [atrPoints, setAtrPoints] = (0, react_1.useState)(5);
    const setRace = (x, i) => {
        const updatedRace = { race: x };
        setCharacter((character) => ({
            ...character,
            ...updatedRace,
        }));
        setSelectedRace(i - 1);
    };
    const confirmation = () => setConfirmAtr(true);
    const resetChar = () => {
        setCharacter({
            class: '',
            race: '',
            str: 10,
            con: 10,
            dex: 10,
            int: 10,
            wis: 10,
            char: 10,
        });
        setConfirmAtr(false);
        setAtrPoints(5);
    };
    const setClass = (x) => {
        const updatedClass = { class: x };
        setCharacter((character) => ({
            ...character,
            ...updatedClass,
        }));
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, react_1.useEffect)(() => {
        if (races) {
            arr.forEach((e) => {
                setCharacter((character) => ({
                    ...character,
                    ...{ [e]: 10 + races[selectedRace][e] },
                }));
            });
        }
    }, [character.race]);
    const addChar = trpc_1.trpc.backend.addChar.useMutation();
    const createChar = async () => {
        var _a, _b, _c;
        if (((_b = (_a = sessionData.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) && ((_c = nameOfChar.current) === null || _c === void 0 ? void 0 : _c.value)) {
            addChar.mutate({
                class: character.class,
                race: character.race,
                user_id: sessionData.data.user.id,
                name: nameOfChar.current.value,
                str: character.str,
                dex: character.dex,
                con: character.con,
                int: character.int,
                wis: character.wis,
                char: character.char,
            });
        }
    };
    const setPoints = (x) => {
        setAtrPoints((atrPoints) => atrPoints + x);
    };
    if (addChar.isSuccess) {
        window.location.href = 'character-list';
    }
    if (addChar.isError) {
        window.alert(addChar.error.message);
    }
    return (<>
      <head_1.default>
        <title>Create new hero</title>
      </head_1.default>
      <VideoBackground_1.default />
      <NavigationBar_1.default />
      {(!character.race || !character.class) && (<div test-id="creation-container">
          {!character.race && races && (<div test-id="race-selection" className="h-screen w-screen text-center">
              <RaceList_1.default setRace={setRace} creation={true} races={races}/>
            </div>)}
          {!character.class && character.race && classes && (<div test-id="class-selection">
              {/* <h1>SELECT CLASS</h1> */}
              <ClassList_1.default creation={true} setClass={setClass} classes={classes}/>
            </div>)}
        </div>)}
      {character.race && character.class && !confirmAtr && (<div className="flex h-screen w-screen flex-col items-center justify-center">
          <div className="transparent w-1/4 rounded-3xl bg-opacity-75 bg-contain bg-center bg-no-repeat p-4 backdrop-blur-xl" style={{ backgroundImage: `url(/${character.class}.png)` }}>
            <h1 className="gold m-1 text-3xl">Race: {character.race}</h1>
            <h1 className="gold m-1 text-3xl">Class: {character.class}</h1>
            <label className="m-1 text-3xl">
              <span className="gold">Remaining points: </span>
              <input value={atrPoints} readOnly className="mr-1 w-10 rounded border"/>
            </label>

            {arr.map((e) => (<Attribute_1.default key={e} defaultAtr={character[e]} name={e} setPoints={setPoints} remaining={atrPoints} change={(atrValue, atrName) => {
                    setCharacter((character) => ({
                        ...character,
                        ...{ [atrName]: atrValue },
                    }));
                }}/>))}
          </div>

          <button className={atrPoints
                ? 'invisible m-1 rounded border bg-white text-3xl'
                : 'm-1  rounded border bg-white text-3xl'} type="button" onClick={confirmation}>
            confirm attributes
          </button>
        </div>)}
      {character.race && character.class && confirmAtr && (<div className="flex h-screen w-screen flex-col items-center justify-center">
          <div className="transparent w-1/4 rounded-3xl bg-opacity-75 bg-contain bg-center bg-no-repeat p-4 backdrop-blur-xl" style={{ backgroundImage: `url(/${character.class}.png)` }}>
            <div className="gold font-black">
              <p>Race:</p>
              <p className="align-items-end">{character.race}</p>
              <p>Class:</p>
              <p>{character.class}</p>
              <p>Strength:</p>
              <p>{character.str}</p>
              <p>Dexterity:</p>
              <p>{character.dex}</p>
              <p>Constitution:</p>
              <p>{character.con}</p>
              <p>Wisdom: </p>
              <p>{character.wis}</p>
              <p>Inteligence:</p>
              <p>{character.int}</p>
              <p>Charisma:</p>
              <p>{character.char}</p>
              <label className="col-start-1 col-end-3">
                Name :{' '}
                <input ref={nameOfChar} className=" rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="text"/>
              </label>
            </div>
            <div className="flex mt-2">
              <button onClick={resetChar} className="gold w-full font-black rounded-md border border-yellow-400 px-10 py-2">
                Reset
              </button>
              <button className="gold w-full font-black rounded-md border border-yellow-400 px-10 py-2" onClick={createChar}>
                Create
              </button>
            </div>
          </div>
        </div>)}
    </>);
};
const getStaticProps = async () => {
    const ssg = await (0, ssg_1.createProxySSGHelpers)({
        router: _app_1.appRouter,
        ctx: { session: null },
        transformer: superjson_1.default, // optional - adds superjson serialization
    });
    // prefetch `races and classes`
    await ssg.dbRouter.getAllRaces.prefetch();
    await ssg.dbRouter.getAllClasses.prefetch();
    return {
        props: {
            trpcState: ssg.dehydrate(),
        },
        revalidate: 1,
    };
};
exports.getStaticProps = getStaticProps;
exports.default = createNewChar;
