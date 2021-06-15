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
exports.findMenuByName = exports.deleteMenu = exports.putMenu = exports.getMenu = exports.postMenu = exports.getMenus = void 0;
const category_1 = __importDefault(require("../models/category"));
const characteristic_1 = __importDefault(require("../models/characteristic"));
const ingredient_1 = __importDefault(require("../models/ingredient"));
const menu_1 = __importDefault(require("../models/menu"));
const price_1 = __importDefault(require("../models/price"));
const getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menus = yield menu_1.default.findAll({
        include: [
            { model: category_1.default },
            { model: price_1.default },
            { model: menu_1.default, as: 'garnishes' },
            { model: menu_1.default, as: 'menusOfGranish' },
            { model: characteristic_1.default },
            { model: ingredient_1.default }
        ]
    });
    res.json(menus);
});
exports.getMenus = getMenus;
const postMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const menu = menu_1.default.build(body);
        yield menu.save();
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
const getMenu = (req, res) => {
    const { id } = req.params;
    const menu = menu_1.default.findByPk(id);
    if (!menu) {
        return res.status(404).json({
            msg: `No existe un menu con el id ${id}`
        });
    }
    res.json(menu);
};
exports.getMenu = getMenu;
const putMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.putMenu = putMenu;
const deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteMenu = deleteMenu;
const findMenuByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.findMenuByName = findMenuByName;
//# sourceMappingURL=menus.controllers.js.map