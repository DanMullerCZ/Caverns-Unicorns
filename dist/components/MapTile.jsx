"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const image_1 = __importDefault(require("next/image"));
const MapTile = ({ tileType }) => {
    return (
    // <div style={{ backgroundImage: `url(/maps/${tileType}.jpg)` }}></div>
    <image_1.default src={`/maps/${tileType}.jpg`} alt={tileType} width={100} height={100}></image_1.default>);
};
exports.default = MapTile;
