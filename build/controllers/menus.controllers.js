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
exports.findMenuByName = exports.deleteMenu = exports.patchMenu = exports.getMenu = exports.postMenu = exports.getMenus = void 0;
const category_1 = __importDefault(require("../models/category"));
const characteristic_1 = __importDefault(require("../models/characteristic"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const menu_1 = __importDefault(require("../models/menu"));
const menuCharacteristic_1 = __importDefault(require("../models/menuCharacteristic"));
const menuGarnish_1 = __importDefault(require("../models/menuGarnish"));
const menuIngredient_1 = __importDefault(require("../models/menuIngredient"));
const price_1 = __importDefault(require("../models/price"));
const getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            { model: menu_1.default, as: 'garnishes' },
            { model: menu_1.default, as: 'menusOfGarnish' },
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
    const menus = yield menu_1.default.findAll(pipeline.reduce((acc, el) => (Object.assign(Object.assign({}, acc), el)), {}));
    res.json(menus);
});
exports.getMenus = getMenus;
const postMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { body } = req;
        const menu = yield menu_1.default.create(Object.assign(Object.assign({}, body), { idCustomer: req['user'].idCustomer }));
        //* add ingredients
        (_a = body.ingredients) === null || _a === void 0 ? void 0 : _a.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
            const ingredientRecord = yield ingredient_1.default.findByPk(ingredient.id);
            if (ingredientRecord) {
                menuIngredient_1.default.create({
                    idIngredient: ingredientRecord.id,
                    idMenu: menu.id,
                    quantity: ingredient.quantity
                });
            }
        }));
        //* add characteristics
        (_b = body.idCharacteristics) === null || _b === void 0 ? void 0 : _b.map((idCharacteristic) => __awaiter(void 0, void 0, void 0, function* () {
            const characteristicRecord = yield characteristic_1.default.findByPk(idCharacteristic);
            if (characteristicRecord) {
                menuCharacteristic_1.default.create({
                    idCharacteristic: characteristicRecord.id,
                    idMenu: menu.id
                });
            }
        }));
        //* add garnishes
        (_c = body.garnishes) === null || _c === void 0 ? void 0 : _c.map((garnish) => __awaiter(void 0, void 0, void 0, function* () {
            const garnishRecord = yield menu_1.default.findByPk(garnish.id);
            if (garnishRecord) {
                if (!garnishRecord.isGarnish) {
                    throw new Error(`El menu ${garnishRecord.name} no es una guarnicion valida`);
                }
                menuGarnish_1.default.create({
                    idGarnish: garnishRecord.id,
                    idMenu: menu.id,
                    max_quantity: garnish.max_quantity
                });
            }
        }));
        //* add price
        yield price_1.default.create({ price: body.price ? body.price : 0, idMenu: menu.id });
        res.json(menu);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postMenu] Error al crear un menu'
        });
    }
});
exports.postMenu = postMenu;
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const menu = yield menu_1.default.findOne({
        where: {
            $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
        }
    });
    if (!menu) {
        return res.status(404).json({
            msg: `No existe un menu con el id ${id}`
        });
    }
    res.json(menu);
});
exports.getMenu = getMenu;
const patchMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const { id } = req.params;
    const { body } = req;
    try {
        const menu = yield menu_1.default.findOne({
            where: {
                $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
            }
        });
        if (!menu) {
            return res.status(404).json({
                msg: `No existe un menu con el id ${id}`
            });
        }
        yield menu.update(body);
        //* update ingredients
        if (body.ingredients) {
            //* delete previous ingredients
            menuIngredient_1.default.destroy({
                where: {
                    idMenu: id
                }
            });
            //*add ingredients
            (_d = body.ingredients) === null || _d === void 0 ? void 0 : _d.map((ingredient) => __awaiter(void 0, void 0, void 0, function* () {
                const ingredientRecord = yield ingredient_1.default.findByPk(ingredient.id);
                if (ingredientRecord) {
                    menuIngredient_1.default.create({
                        idIngredient: ingredientRecord.id,
                        idMenu: menu.id,
                        quantity: ingredient.quantity
                    });
                }
            }));
        }
        //* update characteristics
        if (body.idCharacteristics) {
            //* delete previous characteristics
            menuCharacteristic_1.default.destroy({
                where: {
                    idMenu: id
                }
            });
            //* add characteristics
            (_e = body.idCharacteristics) === null || _e === void 0 ? void 0 : _e.map((idCharacteristic) => __awaiter(void 0, void 0, void 0, function* () {
                const characteristicRecord = yield characteristic_1.default.findByPk(idCharacteristic);
                if (characteristicRecord) {
                    menuCharacteristic_1.default.create({
                        idCharacteristic: characteristicRecord.id,
                        idMenu: menu.id
                    });
                }
            }));
        }
        //* update granishes
        if (body.granishes) {
            //* delete previous granishes
            menuGarnish_1.default.destroy({
                where: {
                    idMenu: id
                }
            });
            //* add garnishes
            (_f = body.garnishes) === null || _f === void 0 ? void 0 : _f.map((garnish) => __awaiter(void 0, void 0, void 0, function* () {
                const garnishRecord = yield menu_1.default.findByPk(garnish.id);
                if (garnishRecord) {
                    if (!garnishRecord.isGarnish) {
                        throw new Error(`El menu ${garnishRecord.name} no es una guarnicion valida`);
                    }
                    menuGarnish_1.default.create({
                        idGarnish: garnishRecord.id,
                        idMenu: menu.id,
                        max_quantity: garnish.max_quantity
                    });
                }
            }));
        }
        if (body.price) {
            //* add price
            yield price_1.default.create({ price: body.price ? body.price : 0, idMenu: menu.id });
        }
        res.json(menu);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putMenu] Error al actualizar un menu'
        });
    }
});
exports.patchMenu = patchMenu;
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield menu_1.default.findOne({
            where: {
                $and: [{ id: id }, { idCustomer: req['user'].idCustomer }]
            }
        });
        if (!menu) {
            return res.status(404).json({
                msg: `No existe un menu con el id ${id}`
            });
        }
        yield menu.update({ state: false });
        return res.json(menu);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[deleteMenu] Error al eliminar un menu'
        });
    }
});
exports.deleteMenu = deleteMenu;
const findMenuByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const menus = yield menu_1.default.findAll({
            where: {
                $and: [
                    { $or: [{ $like: { name: name } }, { $like: { short_name: name } }] },
                    { idCustomer: req['user'].idCustomer }
                ]
            }
        });
        res.json(menus);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[findMenuByName] Error al buscar un menu'
        });
    }
});
exports.findMenuByName = findMenuByName;
//# sourceMappingURL=menus.controllers.js.map