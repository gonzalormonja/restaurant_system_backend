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
const menu_1 = __importDefault(require("../models/menu"));
exports.getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.findAll({
            include: [
                { model: category_1.default },
                { model: menu_1.default }
            ]
        });
        res.json(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[getCategories] Error al crear una categoria'
        });
    }
});
exports.postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const category = category_1.default.build(body);
        yield category.save();
        res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postCategory] Error al crear una categoria'
        });
    }
});
exports.getCategory = (req, res) => {
    const { id } = req.params;
    const category = category_1.default.findByPk(id);
    if (!category) {
        return res.status(404).json({
            msg: `No existe una categoria con el id ${id}`
        });
    }
    res.json(category);
};
exports.putCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const category = yield category_1.default.findByPk(id);
        if (!category) {
            return res.status(404).json({
                msg: `No existe una categoria con el id ${id}`
            });
        }
        yield category.update(body);
        res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putCategory] Error al actualizar un menu'
        });
    }
});
exports.deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield category_1.default.findByPk(id);
        if (!category) {
            return res.status(404).json({
                msg: `No existe una categoria con el id ${id}`
            });
        }
        yield category.update({ state: false });
        return res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[deleteCategory] Error al eliminar una categoria'
        });
    }
});
//# sourceMappingURL=categories.controllers.js.map