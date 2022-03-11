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
exports.deleteProduct = exports.patchProduct = exports.getProduct = exports.postProduct = exports.getProducts = void 0;
const category_1 = __importDefault(require("../models/category"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const product_1 = __importDefault(require("../models/product"));
const productIngredient_1 = __importDefault(require("../models/productIngredient"));
const price_1 = __importDefault(require("../models/price"));
const datetime_functions_1 = require("../utils/datetime-functions");
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const products_services_1 = __importDefault(require("../services/products.services"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productService = new products_services_1.default();
    let { search, pageNumber, pageSize, columnOrder, order, idCategories } = req.query;
    const pipeline = [];
    if (search) {
        const searchQuery = { [sequelize_1.Op.like]: `%${search}%` };
        pipeline.push({
            where: {
                [sequelize_1.Op.and]: [
                    { [sequelize_1.Op.or]: [{ name: searchQuery }, { short_name: searchQuery }, { bar_code: searchQuery }] },
                    {
                        idCustomer: req['user'].idCustomer
                    },
                    { state: 1 }
                ]
            }
        });
    }
    else {
        pipeline.push({
            where: {
                state: 1
            }
        });
    }
    if (idCategories) {
        pipeline.push({
            idcategory: { [sequelize_1.Op.in]: [idCategories] }
        });
    }
    if (pageNumber && pageSize) {
        pipeline.push({
            offset: Number(pageNumber) * Number(pageSize)
        }, {
            limit: Number(pageSize)
        });
    }
    pipeline.push({
        include: [
            { model: category_1.default },
            { model: price_1.default },
            { model: product_1.default, as: 'productsOfGarnish' },
            { model: ingredient_1.default }
        ]
    });
    if (!columnOrder) {
        columnOrder = 'id';
    }
    if (!order) {
        order = 'desc';
    }
    pipeline.push({
        order: [
            [sequelize_2.Sequelize.literal(columnOrder), order],
            [price_1.default, 'createdAt', 'asc']
        ]
    });
    pipeline.push({
        attributes: ['createdAt', 'id', 'name', 'short_name', 'state']
    });
    const products = yield product_1.default.findAll(pipeline.reduce((acc, el) => (Object.assign(Object.assign({}, acc), el)), {}));
    let totalData = 0;
    if (search) {
        const searchQuery = { [sequelize_1.Op.like]: `%${search}%` };
        totalData = yield product_1.default.count({
            where: {
                [sequelize_1.Op.and]: [
                    { [sequelize_1.Op.or]: [{ name: searchQuery }, { short_name: searchQuery }, { bar_code: searchQuery }] },
                    {
                        idCustomer: req['user'].idCustomer
                    },
                    { state: 1 }
                ]
            }
        });
    }
    else {
        totalData = yield product_1.default.count({
            where: {
                state: 1
            }
        });
    }
    res.json({
        totalData: totalData,
        data: products.map((product) => {
            const prod = productService.add_last_price(product.toJSON());
            Reflect.deleteProperty(prod, 'prices');
            return (0, datetime_functions_1.changeTimezoneObject)(prod, req['tz']);
        })
    });
});
exports.getProducts = getProducts;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { body } = req;
        let product = yield product_1.default.create(Object.assign(Object.assign({}, body), { idCustomer: req['user'].idCustomer }));
        //* add ingredients
        (_a = body.ingredients) === null || _a === void 0 ? void 0 : _a.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
            const ingredientRecord = yield ingredient_1.default.findByPk(ingredient.id);
            if (ingredientRecord) {
                productIngredient_1.default.create({
                    idIngredient: ingredientRecord.id,
                    idProduct: product.id,
                    quantity: ingredient.quantity
                });
            }
        }));
        //* add price
        yield price_1.default.create({ price: body.price ? body.price : 0, idProduct: product.id });
        product = yield product_1.default.findByPk(product.id, { include: [category_1.default] });
        res.json((0, datetime_functions_1.changeTimezoneObject)(product.toJSON(), req['tz']));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postProduct] Error al crear un product'
        });
    }
});
exports.postProduct = postProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productService = new products_services_1.default();
    const product = yield productService.getProduct(id, req['user'].idCustomer);
    let categoryName = product.category.name;
    let categoryFather = yield category_1.default.findByPk(product.category.idCategory);
    while (categoryFather) {
        categoryName = `${categoryFather.name} -> ${categoryName}`;
        categoryFather = yield category_1.default.findByPk(categoryFather.idCategory);
    }
    product.category_name = categoryName;
    if (!product) {
        return res.status(404).json({
            msg: `No existe un product con el id ${id}`
        });
    }
    res.json((0, datetime_functions_1.changeTimezoneObject)(product, req['tz']));
});
exports.getProduct = getProduct;
const patchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const { body } = req;
    const productService = new products_services_1.default();
    try {
        const product = yield productService.getProduct(id, req['user'].idCustomer);
        let productObject = yield product_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [{ id: id }, { idCustomer: req['user'].idCustomer }]
            }
        });
        if (!productObject) {
            return res.status(404).json({
                msg: `No existe un product con el id ${id}`
            });
        }
        yield productObject.update(body);
        //* update ingredients
        if (body.ingredients) {
            //* delete previous ingredients
            productIngredient_1.default.destroy({
                where: {
                    idProduct: id
                }
            });
            //*add ingredients
            (_b = body.ingredients) === null || _b === void 0 ? void 0 : _b.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
                const ingredientRecord = yield ingredient_1.default.findByPk(ingredient.id);
                if (ingredientRecord) {
                    productIngredient_1.default.create({
                        idIngredient: ingredientRecord.id,
                        idProduct: productObject.id,
                        quantity: ingredient.quantity
                    });
                }
            }));
        }
        if (body.price && product.price != body.price) {
            //* add price
            yield price_1.default.create({ price: body.price ? body.price : 0, idProduct: productObject.id });
        }
        productObject = yield productService.getProduct(id, req['user'].idCustomer);
        res.json((0, datetime_functions_1.changeTimezoneObject)(productObject, req['tz']));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putProduct] Error al actualizar un product'
        });
    }
});
exports.patchProduct = patchProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [{ id: id }, { idCustomer: req['user'].idCustomer }]
            }
        });
        if (!product) {
            return res.status(404).json({
                msg: `No existe un product con el id ${id}`
            });
        }
        yield product.update({ state: false });
        return res.json((0, datetime_functions_1.changeTimezoneObject)(product.toJSON(), req['tz']));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[deleteProduct] Error al eliminar un product'
        });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.controllers.js.map