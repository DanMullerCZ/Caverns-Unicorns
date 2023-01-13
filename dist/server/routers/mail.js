"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailVerificationToken = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//yqNfA98QshYeZP!* gmail password
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'greenfoxcaudnd@gmail.com',
        pass: `ytckpkhgamdmqyyy`,
    },
});
const sendEmailVerificationToken = (to, subject, text) => {
    const mailOptions = {
        from: 'greenfoxcaudnd@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
};
exports.sendEmailVerificationToken = sendEmailVerificationToken;
