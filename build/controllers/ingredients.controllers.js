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
const ingredient_1 = __importDefault(require("../models/ingredient"));
exports.getIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = yield ingredient_1.default.findAll();
        res.json(ingredients);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[getingredients] Error al crear una ingrediente'
        });
    }
});
exports.postIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const category = ingredient_1.default.build(body);
        yield category.save();
        res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postIngredient] Error al crear una ingrediente'
        });
    }
});
exports.getIngredient = (req, res) => {
    const { id } = req.params;
    const category = ingredient_1.default.findByPk(id);
    if (!category) {
        return res.status(404).json({
            msg: `No existe una ingrediente con el id ${id}`
        });
    }
    res.json(category);
};
exports.putIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const category = yield ingredient_1.default.findByPk(id);
        if (!category) {
            return res.status(404).json({
                msg: `No existe una ingrediente con el id ${id}`
            });
        }
        yield category.update(body);
        res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putIngredient] Error al actualizar un menu'
        });
    }
});
exports.deleteIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield ingredient_1.default.findByPk(id);
        if (!category) {
            return res.status(404).json({
                msg: `No existe una ingrediente con el id ${id}`
            });
        }
        yield category.update({ state: false });
        return res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[deleteIngredient] Error al eliminar una ingrediente'
        });
    }
});
//# sourceMappingURL=ingredients.controllers.js.map