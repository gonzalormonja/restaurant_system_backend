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
const sequelize_1 = require("sequelize");
const category_1 = __importDefault(require("../models/category"));
const characteristic_1 = __importDefault(require("../models/characteristic"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const price_1 = __importDefault(require("../models/price"));
const product_1 = __importDefault(require("../models/product"));
class ProductService {
    constructor() {
        this.join_object = () => {
            return {
                include: [
                    { model: category_1.default },
                    { model: price_1.default },
                    { model: product_1.default, as: 'garnishes' },
                    { model: product_1.default, as: 'productsOfGarnish' },
                    { model: characteristic_1.default },
                    { model: ingredient_1.default }
                ],
                order: [[price_1.default, 'createdAt', 'asc']]
            };
        };
        this.add_last_price = (product) => {
            return Object.assign(Object.assign({}, product), { price: product.prices[product.prices.length - 1].price });
        };
        this.getProduct = (id, idCustomer) => __awaiter(this, void 0, void 0, function* () {
            const product = yield product_1.default.findOne(Object.assign({ mapToModel: true, where: {
                    [sequelize_1.Op.and]: [{ id: id }, { idCustomer: idCustomer }, { state: 1 }]
                } }, this.join_object()));
            return this.add_last_price(product.toJSON());
        });
    }
}
exports.default = ProductService;
//# sourceMappingURL=products.services.js.map