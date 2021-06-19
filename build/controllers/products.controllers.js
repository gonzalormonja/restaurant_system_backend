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
exports.findProductByName = exports.deleteProduct = exports.patchProduct = exports.getProduct = exports.postProduct = exports.getProducts = void 0;
const category_1 = __importDefault(require("../models/category"));
const characteristic_1 = __importDefault(require("../models/characteristic"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const product_1 = __importDefault(require("../models/product"));
const productCharacteristic_1 = __importDefault(require("../models/productCharacteristic"));
const productGarnish_1 = __importDefault(require("../models/productGarnish"));
const productIngredient_1 = __importDefault(require("../models/productIngredient"));
const price_1 = __importDefault(require("../models/price"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { search, start, limit, columnOrder, order, idCategories } = req.query;
    const pipeline = [];
    if (search) {
        const searchQuery = { $iLike: `%${search}%` };
        pipeline.push({
            $or: [{ name: searchQuery }, { short_name: searchQuery }, { bar_code: searchQuery }]
        });
    }
    if (idCategories) {
        pipeline.push({
            idcategory: { $in: [idCategories] }
        });
    }
    if (start) {
        pipeline.push({
            offset: start
        });
    }
    if (limit) {
        pipeline.push({
            limit: Number(limit)
        });
    }
    if (!columnOrder) {
        columnOrder = 'id';
    }
    if (!order) {
        order = 'DESC';
    }
    pipeline.push({
        order: [[columnOrder, order]]
    });
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
    pipeline.push({
        where: {
            idCustomer: req['user'].idCustomer
        }
    });
    console.log(pipeline.reduce((acc, el) => (Object.assign(Object.assign({}, acc), el)), {}));
    const products = yield product_1.default.findAll(pipeline.reduce((acc, el) => (Object.assign(Object.assign({}, acc), el)), {}));
    res.json(products);
});
exports.getProducts = getProducts;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { body } = req;
        const product = yield product_1.default.create(Object.assign(Object.assign({}, body), { idCustomer: req['user'].idCustomer }));
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
        res.json(product);
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
    const product = yield product_1.default.findOne({
        where: {
            $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
        }
    });
    if (!product) {
        return res.status(404).json({
            msg: `No existe un product con el id ${id}`
        });
    }
    res.json(product);
});
exports.getProduct = getProduct;
const patchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const { id } = req.params;
    const { body } = req;
    try {
        const product = yield product_1.default.findOne({
            where: {
                $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
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
        res.json(product);
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
                $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
            }
        });
        if (!product) {
            return res.status(404).json({
                msg: `No existe un product con el id ${id}`
            });
        }
        yield product.update({ state: false });
        return res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[deleteProduct] Error al eliminar un product'
        });
    }
});
exports.deleteProduct = deleteProduct;
const findProductByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const products = yield product_1.default.findAll({
            where: {
                $and: [
                    { $or: [{ $like: { name: name } }, { $like: { short_name: name } }] },
                    { idCustomer: req['user'].idCustomer }
                ]
            }
        });
        res.json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[findProductByName] Error al buscar un product'
        });
    }
});
exports.findProductByName = findProductByName;
//# sourceMappingURL=products.controllers.js.map