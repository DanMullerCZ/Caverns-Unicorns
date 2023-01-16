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
const link_1 = __importDefault(require("next/link"));
const react_1 = __importStar(require("react"));
const OneRace_module_css_1 = __importDefault(require("../styles/OneRace.module.css"));
const ClassDetail = ({ name, desc, click, creation }) => {
    const handleClick = () => {
        click(name);
    };
    const [mouseIn, setMouseIn] = (0, react_1.useState)(false);
    const mouseEnter = () => setMouseIn(true);
    const mouseLeave = () => setMouseIn(false);
    return (<div test-id='class' className={OneRace_module_css_1.default.container} onClick={handleClick} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{ backgroundImage: `url(/${name}.png)` }}>
        {!creation && (<link_1.default href={`/classes/${name.toLowerCase()}`}>
                <h2>{name.toUpperCase()}</h2>
        </link_1.default>)}
        {creation && <h2>{name.toUpperCase()}</h2>}
        <p className={mouseIn ? '' : OneRace_module_css_1.default.hidden}>{desc || 'Lorem ipsum mozna'}</p>
    </div>);
};
exports.default = ClassDetail;
