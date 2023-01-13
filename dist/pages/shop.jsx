"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ItemInShop_1 = __importDefault(require("components/ItemInShop"));
const react_1 = require("next-auth/react");
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const react_2 = require("react");
function Shop() {
    const session = (0, react_1.useSession)();
    const router = (0, router_1.useRouter)();
    (0, react_2.useEffect)(() => {
        if (session.status === 'unauthenticated') {
            router.push('/login');
        }
    });
    return (<>
      <h1>Page is in development</h1>
      <ItemInShop_1.default name='VIP' price={500} link='https://buy.stripe.com/test_aEU5kJb4M6ha5huaEF'/>
      <link_1.default href="/" className="w-6 border border-solid border-black">
        BACK TO THE HOMEPAGE
      </link_1.default>

    </>);
}
exports.default = Shop;
