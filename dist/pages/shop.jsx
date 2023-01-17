"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_js_1 = require("@stripe/stripe-js");
const Header_1 = __importDefault(require("components/general/Header"));
const react_1 = require("next-auth/react");
const router_1 = require("next/router");
const react_2 = require("react");
const stripePromise = (0, stripe_js_1.loadStripe)(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
function Checkout() {
    const router = (0, router_1.useRouter)();
    const session = (0, react_1.useSession)();
    (0, react_2.useEffect)(() => {
        if (session.status === 'unauthenticated') {
            alert('You have to be logged in to enter this page');
            router.push('/login');
        }
    });
    const handleClick = async () => {
        const { sessionId } = await fetch('api/stripe/checkout/session', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ quantity: 1 }),
        }).then((res) => res.json());
        const stripe = await stripePromise;
        const { error } = (await (stripe === null || stripe === void 0 ? void 0 : stripe.redirectToCheckout({
            sessionId,
        })));
        if (error) {
            router.reload();
        }
    };
    return (<>
      <Header_1.default title="Shop"/>
      <div>
        <h1>Checkout</h1>
        <h2></h2>
        <button role="link" onClick={handleClick}>
          Click HERE to buy your PREMIUM MEMBERSHIP
        </button>
      </div>
    </>);
}
exports.default = Checkout;
