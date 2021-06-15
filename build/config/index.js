"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    port: process.env.PORT,
    databaseURL: process.env.MONGODB_URI,
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    },
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,
    expireTimeToken: process.env.EXPIRE_TIME_TOKEN,
    expireTimeTokenForgot: process.env.EXPIRE_TIME_TOKEN_FORGOT
};
//# sourceMappingURL=index.js.map