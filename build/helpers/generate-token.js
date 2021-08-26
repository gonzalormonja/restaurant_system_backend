"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generate_token = (user) => {
    return jsonwebtoken_1.default.sign({
        user: {
            id: user._id,
            idType: user.idType,
            idCustomer: user.idCustomer
        }
    }, process.env.JWT_SECRET, {
        expiresIn: Number(process.env.EXPIRE_TIME_TOKEN),
        algorithm: process.env.JWT_ALGO
    });
};
exports.generate_token = generate_token;
//# sourceMappingURL=generate-token.js.map