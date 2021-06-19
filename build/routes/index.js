"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route_init = void 0;
const products_routes_1 = __importDefault(require("./products.routes"));
const categories_routes_1 = __importDefault(require("./categories.routes"));
const ingredients_routes_1 = __importDefault(require("./ingredients.routes"));
const characteristics_routes_1 = __importDefault(require("./characteristics.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const language_1 = __importDefault(require("../middlewares/language"));
const timezone_1 = __importDefault(require("../middlewares/timezone"));
const route_init = (app) => {
    app.use(language_1.default);
    app.use(timezone_1.default);
    app.use('/products', products_routes_1.default);
    app.use('/categories', categories_routes_1.default);
    app.use('/ingredients', ingredients_routes_1.default);
    app.use('/characteristics', characteristics_routes_1.default);
    app.use('/users', users_routes_1.default);
};
exports.route_init = route_init;
//# sourceMappingURL=index.js.map