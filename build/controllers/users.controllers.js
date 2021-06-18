"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_token_1 = require("../helpers/generate-token");
const types_1 = __importDefault(require("../models/types"));
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield users_1.default.findOne({
            where: {
                username: username
            },
            include: [types_1.default]
        });
        if (!user) {
            res.status(404).json({
                msg: '[SignIn] usuario no encontrado'
            });
        }
        else {
            if (!bcrypt_1.default.compareSync(password, user.password)) {
                res.status(404).json({
                    msg: '[SignIn] usuario no encontrado'
                });
            }
            const token = generate_token_1.generate_token(user);
            user.password = null;
            res.json({
                token: token,
                expires_in: process.env.EXPIRE_TIME_TOKEN,
                user: user
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[SignIn] Error al iniciar sesion'
        });
    }
});
exports.signIn = signIn;
//# sourceMappingURL=users.controllers.js.map