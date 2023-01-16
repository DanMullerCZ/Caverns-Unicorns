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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Attribute = ({ name, change, defaultAtr, setPoints, remaining, }) => {
    const [atr, setAtr] = (0, react_1.useState)(defaultAtr);
    const inputRef = (0, react_1.useRef)(null);
    const minus = () => {
        var _a;
        if (atr > 0) {
            setAtr(atr - 1);
            change(Number((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value), name);
            setPoints(1);
        }
    };
    const plus = () => {
        var _a;
        if (remaining > 0) {
            setAtr(atr + 1);
            change(Number((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.value), name);
            setPoints(-1);
        }
    };
    return (<div className="grid grid-cols-2 text-3xl w-60 m-1">
      <p>{name} : </p>
      <div className='flex'>
        <input ref={inputRef} value={atr} readOnly className="w-10 border mr-1 rounded"/>
        <button type="button" className="border w-8 rounded bg-white" onClick={minus}>
          -
        </button>
        <button type="button" className="border w-8 rounded bg-white" onClick={plus}>
          +
        </button>
      </div>
    </div>);
};
exports.default = Attribute;
