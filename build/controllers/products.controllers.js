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
const characteristic_1 = __importDefault(require("../models/characteristic"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const product_1 = __importDefault(require("../models/product"));
const productCharacteristic_1 = __importDefault(require("../models/productCharacteristic"));
const productGarnish_1 = __importDefault(require("../models/productGarnish"));
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
            { model: product_1.default, as: 'garnishes' },
            { model: product_1.default, as: 'productsOfGarnish' },
            { model: characteristic_1.default },
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
        data: products.map((product) => (0, datetime_functions_1.changeTimezoneObject)(productService.add_last_price(product.toJSON()), req['tz']))
    });
});
exports.getProducts = getProducts;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
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
        //* add characteristics
        (_b = body.idCharacteristics) === null || _b === void 0 ? void 0 : _b.map((idCharacteristic) => __awaiter(void 0, void 0, void 0, function* () {
            const characteristicRecord = yield characteristic_1.default.findByPk(idCharacteristic);
            if (characteristicRecord) {
                productCharacteristic_1.default.create({
                    idCharacteristic: characteristicRecord.id,
                    idProduct: product.id
                });
            }
        }));
        //* add garnishes
        (_c = body.garnishes) === null || _c === void 0 ? void 0 : _c.map((garnish) => __awaiter(void 0, void 0, void 0, function* () {
            const garnishRecord = yield product_1.default.findByPk(garnish.id);
            if (garnishRecord) {
                if (!garnishRecord.isGarnish) {
                    throw new Error(`El product ${garnishRecord.name} no es una guarnicion valida`);
                }
                productGarnish_1.default.create({
                    idGarnish: garnishRecord.id,
                    idProduct: product.id,
                    max_quantity: garnish.max_quantity
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
    var _d, _e, _f;
    const { id } = req.params;
    const { body } = req;
    const productService = new products_services_1.default();
    try {
        let product = yield product_1.default.findOne({
            where: {
                [sequelize_1.Op.and]: [{ id: id }, { idCustomer: req['user'].idCustomer }]
            }
        });
        if (!product) {
            return res.status(404).json({
                msg: `No existe un product con el id ${id}`
            });
        }
        yield product.update(body);
        //* update ingredients
        if (body.ingredients) {
            //* delete previous ingredients
            productIngredient_1.default.destroy({
                where: {
                    idProduct: id
                }
            });
            //*add ingredients
            (_d = body.ingredients) === null || _d === void 0 ? void 0 : _d.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
                const ingredientRecord = yield ingredient_1.default.findByPk(ingredient.id);
                if (ingredientRecord) {
                    productIngredient_1.default.create({
                        idIngredient: ingredientRecord.id,
                        idProduct: product.id,
                        quantity: ingredient.quantity
                    });
                }
            }));
        }
        //* update characteristics
        if (body.idCharacteristics) {
            //* delete previous characteristics
            productCharacteristic_1.default.destroy({
                where: {
                    idProduct: id
                }
            });
            //* add characteristics
            (_e = body.idCharacteristics) === null || _e === void 0 ? void 0 : _e.map((idCharacteristic) => __awaiter(void 0, void 0, void 0, function* () {
                const characteristicRecord = yield characteristic_1.default.findByPk(idCharacteristic);
                if (characteristicRecord) {
                    productCharacteristic_1.default.create({
                        idCharacteristic: characteristicRecord.id,
                        idProduct: product.id
                    });
                }
            }));
        }
        //* update granishes
        if (body.granishes) {
            //* delete previous granishes
            productGarnish_1.default.destroy({
                where: {
                    idProduct: id
                }
            });
            //* add garnishes
            (_f = body.garnishes) === null || _f === void 0 ? void 0 : _f.map((garnish) => __awaiter(void 0, void 0, void 0, function* () {
                const garnishRecord = yield product_1.default.findByPk(garnish.id);
                if (garnishRecord) {
                    if (!garnishRecord.isGarnish) {
                        throw new Error(`El product ${garnishRecord.name} no es una guarnicion valida`);
                    }
                    productGarnish_1.default.create({
                        idGarnish: garnishRecord.id,
                        idProduct: product.id,
                        max_quantity: garnish.max_quantity
                    });
                }
            }));
        }
        if (body.price) {
            //* add price
            yield price_1.default.create({ price: body.price ? body.price : 0, idProduct: product.id });
        }
        product = yield productService.getProduct(id, req['user'].idCustomer);
        res.json((0, datetime_functions_1.changeTimezoneObject)(product, req['tz']));
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