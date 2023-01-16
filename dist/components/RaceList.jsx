"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RaceDetail_1 = __importDefault(require("./RaceDetail"));
const Races_module_css_1 = __importDefault(require("../styles/Races.module.css"));
const prop_types_1 = __importDefault(require("prop-types"));
// eslint-disable-next-line @typescript-eslint/no-empty-function
const RaceList = ({ races, setRace = () => { }, creation = false }) => {
    const handleClick = (e, i) => {
        setRace(e, i);
    };
    return (<div test-id="racesArr" className={Races_module_css_1.default.container}>
      {races.map((e) => (<RaceDetail_1.default key={e.id} id={e.id} creation={creation} click={handleClick} desc={e.description} name={e.name}></RaceDetail_1.default>))}
    </div>);
};
RaceList.defaultProps = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setRace: () => { },
    creation: false,
};
RaceList.propTypes = {
    setRace: prop_types_1.default.func,
    creation: prop_types_1.default.bool,
};
exports.default = RaceList;
