"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./loaders/server"));
//Cargar la configuracion de .env
dotenv_1.default.config();
// await require('./loaders').default({ expressApp: app });
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map