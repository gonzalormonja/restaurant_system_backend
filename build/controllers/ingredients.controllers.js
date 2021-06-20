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
const datetime_functions_1 = require("../utils/datetime-functions");
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
        pipeline.push({
            where: {
                idCustomer: req['user'].idCustomer
            }
        });
        const ingredients = yield ingredient_1.default.findAll(pipeline.reduce((acc, el) => (Object.assign(Object.assign({}, acc), el)), {}));
        res.json(ingredients.map((ingredient) => datetime_functions_1.changeTimezoneObject(ingredient.toJSON(), req['tz'])));
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
        const ingredient = yield ingredient_1.default.create(Object.assign(Object.assign({}, body), { idCustomer: req['user'].idCustomer }));
        res.json(datetime_functions_1.changeTimezoneObject(ingredient.toJSON(), req['tz']));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[postIngredient] Error al crear una ingrediente'
        });
    }
});
exports.postIngredient = postIngredient;
const getIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const ingredient = yield ingredient_1.default.findOne({
        where: {
            $and: [
                { id: id },
                {
                    idCustomer: req['user'].idCustomer
                }
            ]
        }
    });
    if (!ingredient) {
        return res.status(404).json({
            msg: `No existe una ingrediente con el id ${id}`
        });
    }
    res.json(datetime_functions_1.changeTimezoneObject(ingredient.toJSON(), req['tz']));
});
exports.getIngredient = getIngredient;
const putIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const ingredient = yield ingredient_1.default.findOne({
            where: {
                $and: [
                    { id: id },
                    {
                        idCustomer: req['user'].idCustomer
                    }
                ]
            }
        });
        if (!ingredient) {
            return res.status(404).json({
                msg: `No existe una ingrediente con el id ${id}`
            });
        }
        yield ingredient.update(body);
        res.json(datetime_functions_1.changeTimezoneObject(ingredient.toJSON(), req['tz']));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: '[putIngredient] Error al actualizar un product'
        });
    }
});
exports.putIngredient = putIngredient;
const deleteIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ingredient = yield ingredient_1.default.findOne({
            where: {
                $and: [
                    { id: id },
                    {
                        idCustomer: req['user'].idCustomer
                    }
                ]
            }
        });
        if (!ingredient) {
            return res.status(404).json({
                msg: `No existe una ingrediente con el id ${id}`
            });
        }
        yield ingredient.update({ state: false });
        return res.json(datetime_functions_1.changeTimezoneObject(ingredient.toJSON(), req['tz']));
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