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
const category_1 = __importDefault(require("../models/category"));
const characteristic_1 = __importDefault(require("../models/characteristic"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const menu_1 = __importDefault(require("../models/menu"));
const menuCharacteristic_1 = __importDefault(require("../models/menuCharacteristic"));
const menuGarnish_1 = __importDefault(require("../models/menuGarnish"));
const menuIngredient_1 = __importDefault(require("../models/menuIngredient"));
const price_1 = __importDefault(require("../models/price"));
exports.getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menus = yield menu_1.default.findAll({
        include: [
            { model: category_1.default },
            { model: price_1.default },
            { model: menu_1.default, as: 'garnishes' },
            { model: menu_1.default, as: 'menusOfGarnish' },
            { model: characteristic_1.default },
            { model: ingredient_1.default }
        ]
    });
    res.json(menus);
});
exports.postMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { body } = req;
        const menu = yield menu_1.default.create(body);
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
exports.getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const menu = yield menu_1.default.findByPk(id);
    if (!menu) {
        return res.status(404).json({
            msg: `No existe un menu con el id ${id}`
        });
    }
    res.json(menu);
});
exports.putMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const menu = yield menu_1.default.findByPk(id);
        if (!menu) {
            return res.status(404).json({
                msg: `No existe un menu con el id ${id}`
            });
        }
        yield menu.update(body);
        res.json(menu);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putMenu] Error al actualizar un menu'
        });
    }
});
exports.deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const menu = yield menu_1.default.findByPk(id);
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
exports.findMenuByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const menus = yield menu_1.default.findAll({
            where: {
                $or: [{ $like: { name: name } }, { $like: { short_name: name } }]
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
//# sourceMappingURL=menus.controllers.js.map