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
exports.deleteIngredient = exports.putIngredient = exports.getIngredient = exports.postIngredient = exports.getIngredients = void 0;
const ingredient_1 = __importDefault(require("../models/ingredient"));
const getIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { search, start, limit, columnOrder, order } = req.query;
        const pipeline = [];
        if (search) {
            const searchQuery = { $iLike: `%${search}%` };
            pipeline.push({
                $or: [{ name: searchQuery }]
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
        console.log(pipeline.reduce((acc, el) => (Object.assign(Object.assign({}, acc), el)), {}));
        const ingredients = yield ingredient_1.default.findAll(pipeline.reduce((acc, el) => (Object.assign(Object.assign({}, acc), el)), {}));
        res.json(ingredients);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[getingredients] Error al crear una ingrediente'
        });
    }
});
exports.getIngredients = getIngredients;
const postIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const category = yield ingredient_1.default.create(Object.assign(Object.assign({}, body), { idCustomer: req['user'].idCustomer }));
        res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postIngredient] Error al crear una ingrediente'
        });
    }
});
exports.postIngredient = postIngredient;
const getIngredient = (req, res) => {
    const { id } = req.params;
    const category = ingredient_1.default.findByPk(id);
    if (!category) {
        return res.status(404).json({
            msg: `No existe una ingrediente con el id ${id}`
        });
    }
    res.json(category);
};
exports.getIngredient = getIngredient;
const putIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.putIngredient = putIngredient;
const deleteIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteIngredient = deleteIngredient;
//# sourceMappingURL=ingredients.controllers.js.map