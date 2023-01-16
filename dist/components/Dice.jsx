"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Dice_module_scss_1 = __importDefault(require("../styles/Dice.module.scss"));
// stolen from https://codepen.io/vicentemundim/pen/nXNvBw
const Dice = () => {
    const die = (0, react_1.useRef)(null);
    let lastFace;
    let timeoutId;
    //let transitionDuration:number = 500
    const animationDuration = 300;
    const handleClick = () => {
        var _a;
        (_a = die.current) === null || _a === void 0 ? void 0 : _a.classList.add('rolling');
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            var _a;
            (_a = die.current) === null || _a === void 0 ? void 0 : _a.classList.remove('rolling');
            rollTo(randomFace());
        }, animationDuration);
        return false;
    };
    const rollTo = (face) => {
        var _a;
        clearTimeout(timeoutId);
        console.log(face);
        (_a = die.current) === null || _a === void 0 ? void 0 : _a.setAttribute('data-face', face.toString());
    };
    const randomFace = () => {
        const face = Math.floor((Math.random() * 20)) + 1;
        lastFace = face == lastFace ? randomFace() : face;
        return face;
    };
    return (<div className={Dice_module_scss_1.default.content}>
            <div ref={die} onClick={handleClick} className={Dice_module_scss_1.default.die}>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-1']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-2']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-3']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-4']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-5']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-6']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-7']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-8']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-9']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-10']}`}></figure>                
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-11']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-12']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-13']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-14']}`}></figure>                
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-15']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-16']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-17']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-18']}`}></figure>                
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-19']}`}></figure>
                <figure className={`${Dice_module_scss_1.default.face} ${Dice_module_scss_1.default['face-20']}`}></figure>
            </div>
        </div>);
};
exports.default = Dice;
