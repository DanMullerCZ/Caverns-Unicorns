"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Classes_module_css_1 = __importDefault(require("../styles/Classes.module.css"));
const ClassDetail_1 = __importDefault(require("./ClassDetail"));
const prop_types_1 = __importDefault(require("prop-types"));
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ClassList = ({ classes, setClass = () => { }, creation = false }) => {
    const handleClick = (e) => {
        setClass(e);
    };
    return (<>
        <div test-id='classesArr' className={Classes_module_css_1.default.container}>

        {classes.map((e) => (<ClassDetail_1.default key={e.id} creation={creation} click={handleClick} desc={e.description} name={e.name}></ClassDetail_1.default>))}
        </div>
    
    
    </>);
};
ClassList.defaultProps = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setClass: () => { },
    creation: false
};
ClassList.propTypes = {
    setClass: prop_types_1.default.func,
    creation: prop_types_1.default.bool
};
exports.default = ClassList;
