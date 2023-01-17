"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
});
exports.default = async (req, res) => {
    const { quantity } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
                price: process.env.PRICE_ID,
                quantity: quantity,
            }],
        mode: "payment",
        success_url: `${process.env.APP_URL}/payment_result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.APP_URL}/payment_result?session_id={CHECKOUT_SESSION_ID}`
    });
    res.status(200).json({ sessionId: session.id });
};
