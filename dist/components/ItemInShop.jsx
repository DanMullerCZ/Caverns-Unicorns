"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const RaceDetail = (props) => {
    const handleClick = () => {
        alert('You want to buy premium membership. I like you. :]');
    };
    return (<div test-id='item-to-sell'>
        <div>
            <img src="" alt=""/>
            <h2>{props.name}</h2>
            <h1>{props.price}</h1>
            <button onClick={handleClick}>
                Buy now!
            </button>
            <link_1.default href={props.link} className="w-6 border border-solid border-black">
                Link to STRIPE
            </link_1.default>
        </div>
      </div>);
};
exports.default = RaceDetail;
