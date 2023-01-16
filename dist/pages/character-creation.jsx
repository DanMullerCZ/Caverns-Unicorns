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
const character_creation_module_css_1 = __importDefault(require("../styles/character-creation.module.css"));
const trpc_1 = require("utils/trpc");
const react_2 = require("next-auth/react");
const _app_1 = require("server/routers/_app");
const superjson_1 = __importDefault(require("superjson"));
const ssg_1 = require("@trpc/react-query/ssg");
const head_1 = __importDefault(require("next/head"));
const createNewChar = () => {
    const dataRaces = trpc_1.trpc.dbRouter.getAllRaces.useQuery();
    const races = dataRaces.data;
    const dataClasses = trpc_1.trpc.dbRouter.getAllClasses.useQuery();
    const classes = dataClasses.data;
    const sessionData = (0, react_2.useSession)();
    const nameOfChar = (0, react_1.useRef)(null);
    const [character, setCharacter] = (0, react_1.useState)({
        race: '',
        class: '',
    });
    const setRace = (x) => {
        const updatedRace = { race: x };
        setCharacter((character) => ({
            ...character,
            ...updatedRace,
        }));
    };
    const delRace = () => {
        const updatedRace = { race: '' };
        setCharacter((character) => ({
            ...character,
            ...updatedRace,
        }));
    };
    const setClass = (x) => {
        const updatedClass = { class: x };
        setCharacter((character) => ({
            ...character,
            ...updatedClass,
        }));
    };
    const delClass = () => {
        const updatedClass = { class: '' };
        setCharacter((character) => ({
            ...character,
            ...updatedClass,
        }));
    };
    const addChar = trpc_1.trpc.backend.addChar.useMutation();
    const createChar = async () => {
        var _a, _b, _c;
        if (((_b = (_a = sessionData.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) && ((_c = nameOfChar === null || nameOfChar === void 0 ? void 0 : nameOfChar.current) === null || _c === void 0 ? void 0 : _c.value))
            addChar.mutate({
                class: character.class,
                race: character.race,
                user_id: sessionData.data.user.id,
                name: nameOfChar.current.value,
            });
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
      {(!character.race || !character.class) && (<div test-id='creation-container' className={character_creation_module_css_1.default.container}>
          {!character.race && races && (<div test-id='race-selection'>
              <h1>SELECT RACE</h1>
              <RaceList_1.default setRace={setRace} creation={true} races={races}/>
            </div>)}
          {!character.class && character.race && classes && (<div test-id='class-selection'>
              <h1>SELECT CLASS</h1>
              <ClassList_1.default creation={true} setClass={setClass} classes={classes}/>
            </div>)}
        </div>)}
      {character.race && character.class && (<>
          <input ref={nameOfChar} className="border-4" type="text"/>
          <div>{character.race}</div>
          <button onClick={delRace}>X</button>
          <div>{character.class}</div>
          <button onClick={delClass}>X</button>
          <br />
          <button className="border-4" onClick={createChar}>
            create char
          </button>
        </>)}
    </>);
};
const getStaticProps = async () => {
    const ssg = await (0, ssg_1.createProxySSGHelpers)({
        router: _app_1.appRouter,
        ctx: { session: null },
        transformer: superjson_1.default, // optional - adds superjson serialization
    });
    // prefetch `races`
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
