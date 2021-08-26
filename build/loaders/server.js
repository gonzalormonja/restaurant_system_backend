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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const routes_1 = require("../routes");
class Server {
    constructor() {
        this.dbConnection = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                console.log(error);
                throw new Error('Error al conectar la base de datos');
            }
        });
        this.middlewares = () => {
            //CORS
            this.app.use(cors_1.default());
            //Lecuta del body
            this.app.use(express_1.default.json());
            //Carpeta publica(fotos), la carpeta se llama public
            // this.app.use(express.static('public'));
        };
        this.listen = () => {
            this.app.listen(this.port, () => {
                console.log(`
        ################################################
        🛡️  Server listening on port: ${this.port} 🛡️
        ################################################
      `);
            });
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        routes_1.route_init(this.app);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map